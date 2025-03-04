import { z } from 'zod';

export const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' })
    .max(50, { message: 'Name cannot exceed 50 characters' }),

  email: z
    .string()
    .email({ message: 'Please enter a valid email address' })
    .min(2)
    .max(50),

  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .max(50, { message: 'Password cannot exceed 50 characters' }),
});

export const addUserSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' })
    .max(50, { message: 'Name cannot exceed 50 characters' }),

  email: z
    .string()
    .email({ message: 'Please enter a valid email address' })
    .min(2)
    .max(50),

  phoneNumber: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .max(15, { message: 'Password cannot exceed 50 characters' }),
});

export const addDetailsSchema = z
  .object({
    fName: z
      .string()
      .min(2, { message: 'Name must be at least 2 characters long' })
      .max(50, { message: 'Name cannot exceed 50 characters' }),

    lName: z
      .string()
      .min(2, { message: 'Name must be at least 2 characters long' })
      .max(50, { message: 'Name cannot exceed 50 characters' }),

    location: z.string().min(2).max(50),

    newPassword: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .max(15, { message: 'Password cannot exceed 15 characters' }),

    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'], // Attach error to confirmPassword field
  });

export const signInFormSchema = formSchema.pick({
  email: true,
  password: true,
});
