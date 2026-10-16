import { Github } from "lucide-react"
import { FormattedMessage, useIntl } from "react-intl"
const GITHUB_URL = "https://github.com/AhmadAbdullah2004"

export function Footer() {
  const intl = useIntl()

  return (
    <footer className="mt-8 border-t border-black/5">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-3 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <span className="max-w-full leading-relaxed">
          <FormattedMessage id="footer.copyright" values={{ year: new Date().getFullYear() }} />
        </span>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-muted-foreground no-underline hover:text-foreground"
          aria-label={intl.formatMessage({ id: "footer.githubProfile" })}
        >
          <span>
            <FormattedMessage id="footer.designedBy" />
          </span>
          <Github className="size-4" />
        </a>
      </div>
    </footer>
  )
}
