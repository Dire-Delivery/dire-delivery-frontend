export type help = {
  item: {
    email: string;
    phone: string;
    location: string;
  };
};

import { z } from 'zod';

export const helpForm = z.object({
  item: z.object({
    email: z.string().min(1, 'email is required'),
    phone: z.string().min(1, 'Sender phone number is required'),
    location: z.string().min(1, 'Sender address is required'),
  }),
});
