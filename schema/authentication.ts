import z from "zod";

export const authentication = z.object({
    email: z.string()
        .email()
        .min(1)
        .max(50)
        .nonempty(),
    password: z.string()
        .min(7)
        .max(20)
        .nonempty()
        .regex(/^(?=.*[A-Z])/) // One uppercase
        .regex(/^(?=.*[a-z])/) // One lowercase
        .regex(/^(?=.*[0-9])/) // One number
        .regex(/^(?=.*[!@#$%^&*])/) // One special
});

export type Authentication = z.infer<typeof authentication>;