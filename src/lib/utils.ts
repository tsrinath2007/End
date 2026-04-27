import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDownloadCount(count: number): string {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`
  return count.toString()
}

export function branchColor(branch: string): string {
  const map: Record<string, string> = {
    CSE: 'bg-teal-100 text-teal-800 border-teal-200',
    ECE: 'bg-blue-100 text-blue-800 border-blue-200',
    MECH: 'bg-orange-100 text-orange-800 border-orange-200',
    CIVIL: 'bg-green-100 text-green-800 border-green-200',
    EEE: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    IT: 'bg-violet-100 text-violet-800 border-violet-200',
  }
  return map[branch] ?? 'bg-gray-100 text-gray-800 border-gray-200'
}

export function examTypeBadge(type: string): string {
  return type === 'End-Sem'
    ? 'bg-rose-100 text-rose-800 border-rose-200'
    : 'bg-amber-100 text-amber-800 border-amber-200'
}
