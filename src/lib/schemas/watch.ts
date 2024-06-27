import { z } from "zod";

export const watchSchema = z.object({
    watchName: z.string().min(1, 'Watch name is required'),
    image: z.string().url('Invalid URL'),
    price: z.number().min(1, 'Price must be a positive number'),
    Automatic: z.boolean(),
    watchDescription: z.string(),
    brand: z.string().min(1, 'Brand is required'),
  })