import { z } from 'zod/v4';

export const fullNameSchema = z
  .string()
  .trim()
  .min(2, 'Name must be at least 2 characters');

export const emailSchema = z.string().trim().email('Invalid email address');

export const phoneSchema = z
  .string()
  .trim()
  .min(10, 'Phone number must be at least 10 digits');

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters');

export const signupStep1Schema = z
  .object({
    fullName: fullNameSchema,
    email: emailSchema,
    phoneNumber: phoneSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const signupStep2Schema = z.object({
  businessName: z.string().trim().min(1, 'Business name is required'),
  informalName: z.string().trim().min(1, 'Informal name is required'),
  streetAddress: z.string().trim().min(1, 'Street address is required'),
  city: z.string().trim().min(1, 'City is required'),
  state: z.string().trim().min(1, 'State is required'),
  zipcode: z.string().trim().min(5, 'Zipcode must be at least 5 digits'),
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});

export const resetPasswordSchema = z
  .object({
    newPassword: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
