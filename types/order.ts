import { z } from 'zod';

export const addFormSchema = z.object({
  senderName: z.string().min(1, 'Sender name is required'),
  reciverName: z.string().min(1, 'Receiver name is required'),
  description: z.string().min(1, 'Description is required'),
  senderAddress: z.string().min(1, 'Sender address is required'),
  reciverAddress: z.string().min(1, 'Receiver address is required'),
  paymentMethod: z.enum(['Now', 'On Delivery']),
  senderPhoneNumber: z.string().min(1, 'Sender phone number is required'),
  reciverPhoneNumber: z.string().min(1, 'Receiver phone number is required'),
  senderEmail: z.string().email('Invalid email address'),
  reciverEmail: z.string().email('Invalid email address'),
  weight: z.number().min(0.1, 'Weight must be greater than 0'),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
});
// export type addFormSchema = z.infer<typeof formSchema>;
