import { z } from 'zod'

export const LoginSchema = z.object({
    membername: z.string().min(1, 'Membername must be at least 1 character'),
    password: z.string().min(6, 'Password must be at least 6 character'),
})

export const RegisterSchema = z.object({
    membername: z.string().min(1, 'Membername must be at least 1 character'),
    name: z.string().min(1, 'Name must be at least 1 character'),
    yob: z.number().min(1, 'Yob must be at least 1 character'),
    password: z.string().min(6, 'Password must be at least 6 character'),
})