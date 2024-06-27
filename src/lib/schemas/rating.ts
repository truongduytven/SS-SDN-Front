import { z } from 'zod'

export const RatingSchema = z.object({
    content: z.string().min(1, 'Content must be at least 1 character'),
    rating: z.number()
})