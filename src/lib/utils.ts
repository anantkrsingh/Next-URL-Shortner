import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function generateShortCode(length: number = 6): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export function isValidUrl(string: string): boolean {
  try {
    new URL(string)
    return true
  } catch {
    return false
  }
}
