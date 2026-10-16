import type { Locale } from "@/i18n";

export type LangContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  RTL: boolean;
  toggleLang: () => void; // on the button click, it will toggle the language
}; 
