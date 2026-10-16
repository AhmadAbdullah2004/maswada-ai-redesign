import { GlassCard } from '@/components/common/GlassCard'
import { SignIn } from '@clerk/react'

export function SignInPage() {
  return (
    <div className="flex min-h-dvh w-full items-center justify-center overflow-x-clip px-4 py-8">
      <GlassCard className="flex w-full max-w-md items-center justify-center px-4 py-8 sm:px-8">
        <SignIn
          appearance={{
            variables: {
              colorPrimary: "#FF5B32",
              colorPrimaryForeground: "#FFFFFF",
              colorBackground: "#FFFFFF",
              colorForeground: "#18181B",
              colorMutedForeground: "#71717A",
              colorMuted: "#F4F4F5",
              colorInput: "#FFFFFF",
              colorInputForeground: "#18181B",
              colorNeutral: "#18181B",
              colorBorder: "#E4E4E7",
              colorRing: "#FF5B32",
              borderRadius: "0.75rem",
            },
            elements: {
              rootBox: "w-full",
              cardBox: "w-full",
              card: "w-full bg-transparent shadow-none",
              headerTitle: { color: "#FF5B32", fontWeight: 600 },
              footerActionLink: "text-[#FF5B32]",
            },
          }}
        />
      </GlassCard>
    </div>
  )
}
