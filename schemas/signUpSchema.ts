import * as z from 'zod';

export const signUpSchema = z
    .object({
        email: z
            .string()
            .email('Invalid email address')
            .min(1, 'Email is required'),
        password: z
            .string()
            .min(5, 'Password must be at least 5 characters long')
            .max(8, 'Password must not exceed 8 characters')
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,8}$/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
        passwordConfirmation: z
            .string()
            .min(1, 'Password confirmation is required'),

    })
    .refine((data) => data.password === data.passwordConfirmation, {
        message: 'Passwords do not match',
        path: ['passwordConfirmation'],
    });