import z from 'zod';

export const loginSchema = z.object({
    email: z.string().min(1, 'Email is required'),
    password: z.string().min(1, 'Password is required')
                .min(6, 'Password must be at least 6 characters long'),
});

export const registerSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().min(1, 'Email is required')
            .email('Invalid email format'),
    password: z.string().min(1, 'Password is required')
                .min(6, 'Password must be at least 6 characters long'),
    password_confirmation: z.string().min(1, 'Password confirmation is required')
}).refine((data) => data.password === data.password_confirmation, {
    message: 'Passwords do not match',
    path: ['password_confirmation'],
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;