
import { FormattedMessage, useIntl } from "react-intl";
import { GlassCard } from "@/components/common/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Notebook, Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import type { Note } from "@/app/types";
import useGetAllNotes from "@/hooks/useApiNotes";
import { useNavigate } from "react-router-dom";


export function HomePage() {
  const intl = useIntl()
  const [notes, setNotes] = useState<Note[]>([]);
  const { getAllUserNote, createnote } = useGetAllNotes()
  const navigate = useNavigate()
  
  
  useEffect(() => {
    const fetchNotes = async () => {
      const fetchedNotes = await getAllUserNote();
      setNotes(Array.isArray(fetchedNotes) ? fetchedNotes : []);
    };

    fetchNotes();
  }, [getAllUserNote]);

  const handleCreateNote = async () => {
    const created = await createnote({
      title: intl.formatMessage({ id: "home.newNoteTitle" }),
      content: intl.formatMessage({ id: "home.newNoteContent" }),
    })

    if (!created?.id) {
      return
    }
    navigate(`/notes/${created.id}`, { state: { justCreated: true } })
  }

  const isEmpty = notes.length < 1

  return (
    <GlassCard className="flex min-w-0 flex-col gap-6 px-4 py-8 sm:gap-8 sm:px-10 sm:py-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-semibold tracking-wide text-primary sm:text-2xl">
          <FormattedMessage id="home.title" />
        </h1>

        {!isEmpty && (
          <Button
            className="w-full cursor-pointer rounded-full px-5 sm:w-fit"
            onClick={handleCreateNote}
          >
            <Plus className="size-4" />
            <FormattedMessage id="home.createNote" />
          </Button>
        )}
      </div>

      {!isEmpty && (
        <div className="relative w-full">
          <Search className="absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={intl.formatMessage({ id: "home.searchPlaceholder" })}
            className="w-full rounded-full border border-black/5 bg-white ps-10 shadow-none"
          />
        </div>
      )}

      {isEmpty ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-black/10 bg-white px-4 py-10 text-center sm:px-6 sm:py-16">
          <div className="mb-5 flex size-14 items-center justify-center rounded-full bg-cream">
            <Notebook className="size-6 text-primary" />
          </div>
          <h2 className="text-xl font-semibold tracking-wide">
            <FormattedMessage id="home.emptyTitle" />
          </h2>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
            <FormattedMessage id="home.emptyDescription" />
          </p>
          <Button
            className="mt-6 w-full cursor-pointer rounded-full px-6 sm:w-fit"
            onClick={handleCreateNote}
          >
            <Plus className="size-4" />
            <FormattedMessage id="home.createNote" />
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {notes.map((note) => (
            <GlassCard
              key={note.id}
              className="w-full min-w-0 cursor-pointer border-black/5 bg-white px-4 py-5 transition hover:border-primary/50 sm:px-6"
              onClick={() => navigate(`/notes/${note.id}`)}
            >
              <h2 className="break-words font-semibold text-primary">{note.title}</h2>
            </GlassCard>
          ))}
        </div>
      )}
    </GlassCard>
  );
}
