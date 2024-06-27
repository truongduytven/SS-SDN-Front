import { z } from "zod";

export const profileSchema = z.object({
    membername: z.string().min(1, 'Membername is required'),
    name: z.string().min(1, 'Name is required'),
    yob: z.number().min(1, 'Year of birth is required'),
    password: z.string(),
    newPassword: z.string(),
    confirmPassword: z.string(),
  })