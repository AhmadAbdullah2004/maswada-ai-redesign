
import {
    CheckCircle2,
    CircleAlert,
    LoaderCircle,
  } from "lucide-react"
  
  import { FormattedMessage } from "react-intl"
  import type { autosavestatus } from "@/app/types"
  import { Badge } from "@/components/ui/badge"
  
  export default function AutoSaveIndicator({ autosaveStatus,}: {autosaveStatus: autosavestatus }) {
    switch (autosaveStatus) {
      case "unsaved":
        return (
          <Badge
            variant="outline"
            className="gap-1.5 border-transparent bg-transparent px-0 text-primary-ink shadow-none"
          >
            <CircleAlert className="size-3.5" />
            <FormattedMessage id="autosave.unsaved" />
          </Badge>
        )
  
      case "saving...":
        return (
          <Badge
            variant="outline"
            className="gap-1.5 border-transparent bg-transparent px-0 text-blue-600 shadow-none dark:text-blue-400"
          >
            <LoaderCircle className="size-3.5 animate-spin" />
            <FormattedMessage id="autosave.saving" />
          </Badge>
        )
  
      case "saved":
        return (
          <Badge
            variant="outline"
            className="gap-1.5 border-transparent bg-transparent px-0 text-green-600 shadow-none dark:text-green-400"
          >
            <CheckCircle2 className="size-3.5" />
            <FormattedMessage id="autosave.saved" />
          </Badge>
        )
  
      case "initial":
        return null
    }
  }
  