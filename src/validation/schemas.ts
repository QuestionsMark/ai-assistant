import { z } from "zod";

export const RegisterSchema = z.object({
    email: z.string().email('Your email is probably wrong.'),
    password: z.string()
        .min(8, 'Password should contains at least 8 characters.')
        .max(30, 'Password should not be longer than 30 characters.'),
    confirmPassword: z.string(),
    username: z.string()
        .min(1, 'Username cannot be empty.')
        .max(30, 'Username should not be longer than 30 characters.')
});

export const LoginSchema = z.object({
    email: z.string().email('Your email is probably wrong.'),
    password: z.string()
        .min(1, 'Password should not be empty.')
        .max(30, 'Password should not be empty.'),
});