export type help = {
  supportTel: string;
};

import { z } from 'zod';

export const helpForm = z.object({
  supportTel: z.string().min(1, 'Sender phone number is required'),
});
