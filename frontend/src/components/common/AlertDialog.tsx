import { FormattedMessage } from "react-intl"
import { Trash2Icon } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export function AlertDialogDestructive({title, description, action, onClick, className}: {title: string, description: string, action: string, onClick: () => void, className: string}) {
  return (
    <AlertDialog>
 <AlertDialogTrigger asChild>
  <Button variant="destructive" className={className}>
    {title}
  </Button>
</AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
          {description}
          
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline" className={"cursor-pointer"}>
            <FormattedMessage id="dialog.cancel" />
          </AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={onClick} className={"cursor-pointer"}>{action}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
