import type { CSSProperties } from "react"
import { cn } from "@/lib/utils"

export interface LoaderSkeletonProps extends React.ComponentProps<"div"> {
  width?: string | number
  height?: string | number
  borderRadius?: number
  baseColor?: string
  highlightColor?: string
  duration?: number
}

export function LoaderSkeleton({
  className,
  width = "100%",
  height = 20,
  borderRadius = 4,
  baseColor,
  highlightColor,
  duration = 1.5,
  style,
  ...props
}: LoaderSkeletonProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-zinc-200",
        className,
      )}
      style={{
        width,
        height,
        borderRadius,
        ...(baseColor ? { backgroundColor: baseColor } : {}),
        ...style,
      }}
      {...props}
    >
      <div
        className="absolute inset-0 animate-[loader-skeleton-shimmer_1.5s_ease-in-out_infinite]"
        style={{
          background: `linear-gradient(90deg, transparent, ${
            highlightColor || "rgba(255, 255, 255, 0.65)"
          }, transparent)`,
          animationDuration: `${duration}s`,
        } satisfies CSSProperties}
      />
    </div>
  )
}

export default LoaderSkeleton
