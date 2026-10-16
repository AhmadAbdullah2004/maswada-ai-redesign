import { createContext, useEffect, useState } from "react";
import { defaultLocale, type Locale ,} from "./index";
import type { LangContextType } from "@/Context/LangContextType";


export const LangContext = createContext<LangContextType | undefined>(undefined);
// ! when we create a context, we need to provide a default value for the context
export const LangProvider = ({ children }: { children: React.ReactNode }) => {
    const [locale, setLocale] = useState<Locale>(defaultLocale);
    const RTL=locale === "ar";
    const toggleLang = () => {
        setLocale(locale === "en" ? "ar" : "en");
    }


    useEffect(() => {
        document.documentElement.dir = RTL ? "rtl" : "ltr";
        document.documentElement.lang = RTL ? "ar" : "en";
      }, [locale]);


    return( 
    <LangContext.Provider value={{ locale, setLocale, RTL, toggleLang }}>
    {children}  
     </LangContext.Provider>
    )
}


export default LangContext;