import { z } from 'zod';

const locationSchema = z.object({
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zip: z.string().min(5, 'ZIP code is required'),
});

const inventoryItemSchema = z.object({
  name: z.string().min(1, 'Item name is required'),
  category: z.string().min(1, 'Category is required'),
  quantity: z.number().int().positive(),
  description: z.string().optional(),
  specialHandling: z.string().optional(),
  photos: z.array(z.string().url()).optional(),
});

export const createMoveSchema = z.object({
  body: z.object({
    pickupLocation: locationSchema,
    dropoffLocation: locationSchema,
    pickupDate: z.string().datetime(),
    flexibleDate: z.boolean(),
    inventory: z.array(inventoryItemSchema),
  }),
});