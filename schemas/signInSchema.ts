import * as z from 'zod';

export const signInSchema = z.object({
    identifier: z
        .string()
        .email('Invalid email address')
        .min(1, 'Email is required'),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters long')
        .max(10, 'Password must not exceed 10 characters')
});
