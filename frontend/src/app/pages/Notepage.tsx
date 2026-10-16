import { ArrowLeft, Briefcase, ChevronDown, Languages, Laugh, MessageCircle, Sparkles } from "lucide-react"
import { DropdownMenu } from "radix-ui"

import { GlassCard } from "@/components/common/GlassCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import useApiNotes from "@/hooks/useApiNotes"
import type { autosavestatus, Note } from "../types"
import { toast } from "sonner"
import { useAuth } from "@clerk/react"
import AutoSaveIndicator from "@/components/note/AutoSaveIndeicator"
import type { rewriteMode } from "../types"
import { AlertDialogDestructive } from "@/components/common/AlertDialog"
import { useHandleMode, useHandleSummarize, useHandleTranslate } from "@/hooks/UseApiFeatures"
import { detectTextDirection } from "@/lib/utils"
import { FormattedMessage, useIntl } from "react-intl"
import Skeleton from "@/components/common/Skeleton"
const noRing =
  "focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-transparent"

const aiToolClass = `cursor-pointer h-10 rounded-lg border-black/10 bg-white px-3 text-muted-foreground shadow-none hover:border-primary/50 hover:bg-cream hover:text-foreground sm:h-8 ${noRing}`

const successToastStyle = {
  background: "#FFFFFF",
  color: "#18181B",
  border: "1px solid #E4E4E7",
  borderRadius: "14px",
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06)",
  padding: "16px",
}

export function Notepage() {
  const intl = useIntl()
  const { id } = useParams()
  const location = useLocation()
  const justCreated = Boolean((location.state as { justCreated?: boolean } | null)?.justCreated)
  const [isfetching, setIsfetching] = useState(false)
  const { getNoteById, updateNote, deleteNote } = useApiNotes()
  const { isLoaded } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [note, setNotes] = useState<Note | null>(null)
  const [useredit, setUseredit] = useState(false)
  const [autosaveStatus, setAutosaveStatus] = useState<autosavestatus>("initial")

  const { summarize } = useHandleSummarize()
  const { translate } = useHandleTranslate()
  const { rewriteModeText } = useHandleMode()
  const handleBack = () => {
    navigate("/")
  }


  useEffect(() => {
    let cancelled = false

    const fetchNotes = async () => {
      if (!isLoaded || !id) {
        return
      }
      const minLoading = justCreated
        ? new Promise((resolve) => setTimeout(resolve, 3000))
        : Promise.resolve()
      const fetchedNotes = await getNoteById(id);
      if (cancelled) return
      if (!fetchedNotes) {
        toast.error(intl.formatMessage({ id: "note.notFound" }))
        navigate("/")
        return
      }
      await minLoading
      if (cancelled) return
      setNotes(fetchedNotes);
      setLoading(false)
    };

    fetchNotes();
    return () => {
      cancelled = true
    }
  }, [getNoteById, id, intl, isLoaded, justCreated, navigate]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotes(prev => prev ? { ...prev, title: e.target.value } : null) // if note is not null, update the title if note is null, return null
    setIsfetching(true)
    setUseredit(true)
    setAutosaveStatus("unsaved")
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(prev => prev ? { ...prev, content: e.target.value } : null) // if note is not null, update the content if note is null, return null
    setUseredit(true)
    setAutosaveStatus("unsaved")
  }

  const handleSave = async () => {
    if (!id || !note) return

    setAutosaveStatus("saving...")

    await updateNote(note.id, {
      title: note.title,
      content: note.content,
    })

    setUseredit(false)
    setAutosaveStatus("saved")
  }

  // Auto save every 2 seconds

  useEffect(() => {
    if (!useredit) { return }
    setTimeout(() => { handleSave() }, 2000)

  }, [note?.title, note?.content, useredit, handleSave])

  // Loading state
  if (loading || !note) {
    return <Skeleton />
  }


  const handleSummarize = async () => {
    if (!id || isfetching) return;

    setIsfetching(true);

    try {
      const summary = await summarize({ noteId: note.id });

      if (!summary) {
        toast.error(intl.formatMessage({ id: "note.summarizeFailed" }), {
          description: intl.formatMessage({ id: "note.tryAgain" }),
          duration: 2000,
        });
        return;
      }

      setNotes((prev) =>
        prev ? { ...prev, content: summary } : null
      );

      setUseredit(true);
      setAutosaveStatus("unsaved");

      toast.success(intl.formatMessage({ id: "note.summarizeSuccess" }), {
        description: intl.formatMessage({ id: "note.summarizeSuccessDescription" }),
        duration: 2000,
        style: successToastStyle,
      });
    } catch {
      toast.error(intl.formatMessage({ id: "note.somethingWrong" }), {
        description: intl.formatMessage({ id: "note.summarizeErrorDescription" }),
        duration: 2000,
      });
    } finally {
      setIsfetching(false);
    }
  };

  const handleTranslate = async () => {
    if (!id || isfetching) return;

    setIsfetching(true);

    try {
      const translation = await translate({ noteId: note.id });

      if (!translation) {
        toast.error(intl.formatMessage({ id: "note.translateFailed" }), {
          description: intl.formatMessage({ id: "note.tryAgain" }),
          duration: 3000,
        });
        return;
      }

      setNotes((prev) =>
        prev ? { ...prev, content: translation } : null
      );

      setUseredit(true);
      setAutosaveStatus("unsaved");

      toast.success(intl.formatMessage({ id: "note.translateSuccess" }), {
        description: intl.formatMessage({ id: "note.translateSuccessDescription" }),
        duration: 3000,
        style: successToastStyle,
      });
    } catch {
      toast.error(intl.formatMessage({ id: "note.somethingWrong" }), {
        description: intl.formatMessage({ id: "note.translateErrorDescription" }),
        duration: 2000,
      });
    } finally {
      setIsfetching(false);
    }
  };


  const handleMode = async (mode: rewriteMode) => {
    if (!id || isfetching) return;

    setIsfetching(true);

    try {
      const modeResult = await rewriteModeText({ noteId: note.id, mode });

      if (!modeResult) {
        toast.error(intl.formatMessage({ id: "note.modeFailed" }), {
          description: intl.formatMessage({ id: "note.tryAgain" }),
          duration: 2000,
        });
        return;
      }

      setNotes((prev) =>
        prev ? { ...prev, content: modeResult } : null
      );

      setUseredit(true);
      setAutosaveStatus("unsaved");

      toast.success(intl.formatMessage({ id: "note.modeSuccess" }), {
        description: intl.formatMessage({ id: "note.modeSuccessDescription" }),
        duration: 3000,
        style: successToastStyle,
      });
    } catch {
      toast.error(intl.formatMessage({ id: "note.somethingWrong" }), {
        description: intl.formatMessage({ id: "note.modeErrorDescription" }),
        duration: 2000,
      });
    } finally {
      setIsfetching(false);
    }
  };





  const isRTL = detectTextDirection(note.content) === "rtl"










  const handleDeleteNote = async () => {
    if (!id) return
    const success = await deleteNote(id)
    if (success) {
      navigate("/")
      toast.success(intl.formatMessage({ id: "note.deleteSuccess" }), {
        description: intl.formatMessage({ id: "note.deleteSuccessDescription" }),
        duration: 3000,
        style: successToastStyle,
      });

    }
  }
















  return (
    <GlassCard className="flex min-h-[70vh] min-w-0 flex-col gap-6 px-4 py-6 sm:px-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 flex-col items-start gap-4 sm:gap-5">
          <Button
            type="button"
            variant="default"
            className={`w-fit rounded-full cursor-pointer ${noRing}`}
            onClick={handleBack}
          >
            <ArrowLeft className="size-4 rtl:scale-x-[-1]" />
            <FormattedMessage id="note.back" />
          </Button>
          <div className="flex w-full flex-wrap items-center gap-2">
            <Button type="button" variant="outline" size="sm" className={aiToolClass} onClick={handleSummarize} disabled={isfetching}>
              <Sparkles className="size-3.5" />
              <FormattedMessage id="note.summarize" />
            </Button>
            <Button type="button" variant="outline" size="sm" className={aiToolClass} onClick={handleTranslate} disabled={isfetching}>
              <Languages className="size-3.5" />
              <FormattedMessage id="note.translate" />
            </Button>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <Button type="button" variant="outline" size="sm" className={aiToolClass} disabled={isfetching}>
                  <FormattedMessage id="note.mode" />
                  <ChevronDown className="size-3.5" />
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  align="start"
                  sideOffset={8}
                  className="z-50 max-h-[70vh] min-w-40 max-w-[calc(100vw-2rem)] overflow-y-auto rounded-xl border border-black/10 bg-white p-1 shadow-lg"
                >
                  <DropdownMenu.Item onClick={() => handleMode('comedy')} className="flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-muted-foreground outline-none data-[highlighted]:bg-cream data-[highlighted]:text-foreground">
                    <Laugh className="size-3.5" />
                    <FormattedMessage id="note.comedy" />
                  </DropdownMenu.Item>
                  <DropdownMenu.Item onClick={() => handleMode('formal')} className="flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-muted-foreground outline-none data-[highlighted]:bg-cream data-[highlighted]:text-foreground">
                    <Briefcase className="size-3.5" />
                    <FormattedMessage id="note.formal" />
                  </DropdownMenu.Item>
                  <DropdownMenu.Item onClick={() => handleMode('casual')} className="flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-muted-foreground outline-none data-[highlighted]:bg-cream data-[highlighted]:text-foreground">
                    <MessageCircle className="size-3.5" />
                    <FormattedMessage id="note.casual" />
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
        </div>
        <div className="flex w-full flex-wrap items-center justify-between gap-2 sm:w-auto sm:justify-end">
          <AutoSaveIndicator autosaveStatus={autosaveStatus} />
          <AlertDialogDestructive title={intl.formatMessage({ id: "note.deleteTitle" })} description={intl.formatMessage({ id: "note.deleteDescription" })} action={intl.formatMessage({ id: "note.deleteAction" })} onClick={handleDeleteNote} className={`w-fit rounded-full cursor-pointer`} />
        </div>
      </div>
      <Input
        placeholder={intl.formatMessage({ id: "note.titlePlaceholder" })}
        value={note.title}
        className={`h-auto w-full min-w-0 rounded-none border-0 border-b border-black/5 bg-transparent! px-0 py-3 text-xl font-semibold text-primary shadow-none hover:bg-transparent sm:text-2xl md:text-2xl ${noRing}`}
        onChange={handleTitleChange}
      />

      <Textarea
        dir={isRTL ? "rtl" : "ltr"}
        placeholder={intl.formatMessage({ id: "note.contentPlaceholder" })}
        value={note.content}
        className={`min-h-[40vh] w-full min-w-0 flex-1 resize-none rounded-none border-0 bg-transparent! px-0 py-2 font-normal shadow-none hover:bg-transparent sm:min-h-[48vh] ${noRing}`}
        onChange={handleContentChange}
      />



    </GlassCard>
  )
}
