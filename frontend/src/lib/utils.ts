/**
 * Utility functions for the application.
 */

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function detectTextDirection(text: string): "ltr" | "rtl" {
  if (!text) return "ltr";

  // Arabic Unicode range: U+0600 to U+06FF
  // Regex pattern checks if the text contains Arabic characters.
  const arabicPattern = /[\u0600-\u06FF]/;

  return arabicPattern.test(text) ? "rtl" : "ltr";
}