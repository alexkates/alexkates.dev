import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fadeIn = "motion-safe:animate-in motion-safe:fade-in motion-safe:duration-700 motion-safe:fill-mode-both";
