import { z } from 'zod';

export const todoSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
    completed: z.boolean().optional(),
});

export type TodoFormData = z.infer<typeof todoSchema>;
