import { useContext } from "react";
import LangContext from "@/i18n/LangProvider";


export default function useLang() { // custom hook to use the language context in any component
    const context = useContext(LangContext);   
    if (!context) {
        throw new Error("useLang must be used within a LangProvider");  
    }
    return context;
}





