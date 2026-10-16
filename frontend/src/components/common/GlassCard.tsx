import type { HTMLAttributes } from "react"

export type GlassCardProps = HTMLAttributes<HTMLDivElement>

/**
 * Glass card component - for content cards with rounded corners.
 * White glass card with a soft shadow.
 */
export function GlassCard({ className = "", ...props }: GlassCardProps) {
  return <div className={`glass-card ${className}`} {...props} />
}
