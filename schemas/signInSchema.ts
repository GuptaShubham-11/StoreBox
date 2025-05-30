import * as z from 'zod';
import { email } from 'zod/v4';

export const signInSchema = z.object({
    identifier: z
        .string()
        .email('Invalid email address')
        .min(1, 'Email is required'),
    password: z
        .string()
        .min(5, 'Password must be at least 5 characters long')
        .max(8, 'Password must not exceed 8 characters')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,8}$/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
});
