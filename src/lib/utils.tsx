import { Comment } from '@/types'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

interface AverageStarProps {
  data: Comment[];
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function averageStar({ data } : AverageStarProps) {
  if (!data || data.length === 0) return 0; 
  const totalRating = data.reduce((acc, curr) => acc + curr.rating, 0)
  const averageRating = totalRating / data.length
  return customRound(averageRating)
}

function customRound(value: number): number {
  return value % 1 >= 0.5 ? Math.ceil(value) : Math.floor(value)
}