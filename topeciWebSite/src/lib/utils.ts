import type { ClassValue } from "clsx";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Fonction utilitaire pour fusionner proprement des classes Tailwind.
 * - Combine clsx() pour conditionner les classes
 * - Utilise twMerge() pour éviter les conflits (par ex. deux bg-*)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
