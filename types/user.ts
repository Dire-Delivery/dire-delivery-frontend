import { z } from 'zod';

export type userType = {
  id: string;
  email: string;
  createdAt: string;
  image: string | null;
  isActive: number;
  isDeleted: number;
  location: string;
  name: string;
  password: string;
  role: string;
  updatedAt: string;
  phone?: string;
  joinedAt?: string;
};

export type updateProfileType = {
  name: string;
  location: string;
  phone: string;
  password: string;
};

export const updateProfileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  location: z.string().min(1, 'Location is required'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const changePasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Must contain at least one number'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type ChangePasswordType = z.infer<typeof changePasswordSchema>;
