import { FormattedMessage } from "react-intl"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import useLang from "@/hooks/useLang";
import { UserButton } from "@clerk/react";
export function Header() {
  const { toggleLang } = useLang();
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto w-full max-w-6xl px-4 pt-4 sm:px-6 lg:px-8">
        <div className="glass-card flex items-center justify-between gap-2 rounded-2xl bg-white px-3 py-3 sm:gap-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <Link
              to="/"
              className="truncate text-sm font-semibold tracking-wide text-primary no-underline hover:text-primary"
            >
              <FormattedMessage id="header.brand" />
            </Link>
            <span className="hidden min-w-0 truncate text-xs text-muted-foreground md:inline">
              <FormattedMessage id="header.tagline" />
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Button variant="outline" size="sm" className="cursor-pointer bg-white text-primary hover:bg-white hover:text-primary sm:h-9 sm:px-4" onClick={toggleLang}>
              <FormattedMessage id="header.language" />
            </Button>
            <UserButton
              appearance={{
                variables: {
                  colorPrimary: "#FF5B32",
                  colorPrimaryForeground: "#FFFFFF",
                  colorBackground: "#FFFFFF",
                  colorForeground: "#18181B",
                  colorMutedForeground: "#71717A",
                  colorInput: "#FFFFFF",
                  colorInputForeground: "#18181B",
                  colorBorder: "#E4E4E7",
                  colorRing: "#FF5B32",
                },
              }}
            />
          </div>
        </div>
      </div>
    </header>
  )
}
