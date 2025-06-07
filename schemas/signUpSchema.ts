import * as z from 'zod';

export const signUpSchema = z
    .object({
        email: z
            .string()
            .email('Invalid email address')
            .min(1, 'Email is required'),
        password: z
            .string()
            .min(8, 'Password must be at least 8 characters long')
            .max(10, 'Password must not exceed 10 characters'),
        passwordConfirmation: z
            .string()
            .min(1, 'Password confirmation is required'),

    })
    .refine((data) => data.password === data.passwordConfirmation, {
        message: 'Passwords do not match',
        path: ['passwordConfirmation'],
    });