import { z } from 'zod';

export const createBidSchema = z.object({
  body: z.object({
    moveId: z.string().uuid(),
    amount: z.number().positive(),
    estimatedDuration: z.string().min(1),
    message: z.string().optional(),
  }),
});