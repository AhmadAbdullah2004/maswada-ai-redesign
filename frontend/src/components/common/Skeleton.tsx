import { GlassCard } from "@/components/common/GlassCard"
import { LoaderSkeleton } from "@/components/ui/loader-skeleton"

export default function Skeleton() {
  return (
    <GlassCard className="flex min-h-[70vh] min-w-0 flex-col gap-6 px-4 py-6 sm:px-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex w-full min-w-0 flex-col items-start gap-4 sm:gap-5">
          <LoaderSkeleton width={96} height={36} borderRadius={9999} />
          <div className="flex w-full flex-wrap items-center gap-2">
            <LoaderSkeleton width={112} height={32} borderRadius={8} />
            <LoaderSkeleton width={112} height={32} borderRadius={8} />
            <LoaderSkeleton width={88} height={32} borderRadius={8} />
          </div>
        </div>
        <LoaderSkeleton width={120} height={36} borderRadius={9999} />
      </div>
      <LoaderSkeleton height={56} borderRadius={0} />
      <LoaderSkeleton className="min-h-[40vh] w-full flex-1 sm:min-h-[48vh]" style={{ height: "auto" }} borderRadius={0} />
    </GlassCard>
  )
}
