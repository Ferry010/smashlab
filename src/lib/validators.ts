import { z } from 'zod';

export const usernameSchema = z
  .string()
  .min(3, 'Minimaal 3 tekens')
  .max(20, 'Maximaal 20 tekens')
  .regex(/^[a-zA-Z0-9_]+$/, 'Alleen letters, cijfers en underscores');

export const passwordSchema = z
  .string()
  .min(8, 'Minimaal 8 tekens')
  .regex(/[A-Z]/, 'Minimaal 1 hoofdletter')
  .regex(/[0-9]/, 'Minimaal 1 cijfer');

export const registerSchema = z.object({
  displayName: z.string().min(1, 'Naam is verplicht').max(100),
  username: usernameSchema,
  email: z.string().email('Ongeldig e-mailadres'),
  password: passwordSchema,
  city: z.string().max(100).optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Ongeldig e-mailadres'),
  password: z.string().min(1, 'Wachtwoord is verplicht'),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;

export function getPasswordStrength(password: string): number {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;
  return score;
}
