import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "@/app/App"
import { ClerkProvider } from '@clerk/react'
import { LangProvider } from "./i18n/LangProvider"

import { IntlWrapper } from "./components/common/IntelWrapper"
// Import your Publishable Key
const PUBLISHABLE_KEY =
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* Wrap the app in the LangProvider, so that the app can use the language context,if there is no LangProvider, the context will throw an error */}
    <LangProvider> 
      <IntlWrapper>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <App />
   

    </ClerkProvider>
    </IntlWrapper>
    </LangProvider>
  </StrictMode>
)
