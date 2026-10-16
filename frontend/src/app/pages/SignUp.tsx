import { SignUp } from '@clerk/react'

export function SignUpPage() {
  return (
    <div className="flex min-h-dvh w-full items-center justify-center overflow-x-clip px-4 py-8">
      <SignUp
        appearance={{
          variables: {
            colorPrimary: "#FF5B32",
            colorPrimaryForeground: "#FFFFFF",
            colorBackground: "#FFFFFF",
            colorForeground: "#18181B",
            colorMutedForeground: "#71717A",
            colorMuted: "#FFFFFF",
            colorInput: "#FFFFFF",
            colorInputForeground: "#18181B",
            colorNeutral: "#18181B",
            colorBorder: "#E4E4E7",
            colorRing: "#FF5B32",
            borderRadius: "0.75rem",
          },
          elements: {
            rootBox: "w-full max-w-md",
            cardBox: "w-full overflow-hidden bg-white",
            card: {
              width: "100%",
              boxShadow: "none",
              backgroundColor: "#FFFFFF",
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            },
            footer: { backgroundColor: "#FFFFFF", boxShadow: "none" },
            headerTitle: { color: "#FF5B32", fontWeight: 600 },
            footerActionLink: "text-[#FF5B32]",
          },
        }}
      />
    </div>
  )
}
