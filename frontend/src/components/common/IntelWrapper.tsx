import { IntlProvider } from "react-intl"
import { messages } from "@/i18n"
import useLang from "@/hooks/useLang"


export const IntlWrapper = ({ children }: { children: React.ReactNode }) => {
    const { locale } = useLang()
    return( 
    <IntlProvider locale={locale} messages={messages[locale]}>
        {children}
        </IntlProvider>
)}
