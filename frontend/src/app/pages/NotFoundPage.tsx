import { FormattedMessage } from "react-intl"
import { Link } from "react-router-dom"

import { GlassCard } from "@/components/common/GlassCard"

export function NotFoundPage() {
  return (
    <GlassCard className="px-4 py-10 text-center sm:px-10 sm:py-12">
      <h1 className="text-2xl font-semibold text-primary">
        <FormattedMessage id="notFound.title" />
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        <FormattedMessage id="notFound.description" />
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-medium text-white no-underline shadow-sm transition hover:bg-primary-hover"
      >
        <FormattedMessage id="notFound.backHome" />
      </Link>
    </GlassCard>
  )
}
