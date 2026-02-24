import { z } from 'zod';

export const applicationFormSchema = z.object({
  personName: z.string().min(3).max(255),
  personSurname: z.string().min(3).max(255),

  businessName: z.string().min(3).max(255),
});
