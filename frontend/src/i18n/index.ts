import en from "./en.json";
import ar from "./ar.json";

export const messages = {
  ar,
  en,
};

export const defaultLocale = "en";
export const supportedLocales = ["en", "ar"];

export type Locale = keyof typeof messages;
// ? Automatically creates a type from the supported language keys (e.g., "en" | "ar").
