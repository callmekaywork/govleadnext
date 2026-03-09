import { z } from 'zod';

export const applicationFormSchema = z.object({
  personName: z.string().min(3).max(255),
  personSurname: z.string().min(3).max(255),

  businessName: z.string().min(3).max(255),
});

export const StartupFormSchema = z.object({
  // Personal Info
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.email('Invalid email address'),
  role: z.string().min(2, 'Role is required'),
  linkedin: z.string('Invalid LinkedIn URL').optional(),

  // Startup Info
  startupName: z.string().min(2, 'Startup name is required'),
  industry: z.string().min(2, 'Industry is required'),
  stage: z.enum(['Idea', 'MVP', 'Early Traction', 'Scaling', 'Established']),
  teamSize: z.coerce.number().min(1, 'Team size must be at least 1'),
  website: z.string('Invalid website URL').optional(),

  // Business Details
  description: z.string().min(10, 'Description must be at least 10 characters'),
  currentChallenges: z.string().min(10, 'Please describe your challenges'),
  revenueModel: z.string().min(2, 'Revenue model is required'),

  // Mentorship Goals
  goals: z.string().min(10, 'Please describe your goals'),
  preferredExpertise: z
    .array(z.string())
    .min(1, 'Select at least one area of expertise'),
  commitmentLevel: z.string().min(2, 'Commitment level is required').optional(),
});

export const CorporateFormSchema = z.object({
  // Personal Info
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  role: z.string().min(2, 'Role is required'),
  linkedin: z.string('Invalid LinkedIn URL').optional(),

  // Corporate Info
  companyName: z.string().min(2, 'Company name is required'),
  industry: z.string().min(2, 'Industry is required'),
  size: z.coerce.number().min(1, 'Company size must be at least 1'),
  website: z.string('Invalid website URL').optional(),

  // Business Details
  description: z.string().min(10, 'Description must be at least 10 characters'),
  currentChallenges: z.string().min(10, 'Please describe your challenges'),
  revenueModel: z.string().min(2, 'Revenue model is required'),

  // Mentorship Goals
  goals: z.string().min(10, 'Please describe your goals'),
  preferredExpertise: z
    .array(z.string())
    .min(1, 'Select at least one area of expertise'),
  commitmentLevel: z.string().min(2, 'Commitment level is required').optional(),
});

export const personSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  role: z.string().min(2, 'Role is required'),
  linkedin: z.string().url('Invalid LinkedIn URL').or(z.string().length(0)),
});

export const startupSchema = z.object({
  id: z.number().int().optional(),
  personId: z.number().int(), // FK to person
  startupName: z.string().max(150),
  industry: z.string().max(100),
  stage: z.string().max(50),
  teamSize: z.number().int(),
  website: z.string().url().max(255).optional(),
});

export const corporateSchema = z.object({
  id: z.number().int().optional(),
  personId: z.number().int(), // FK to person
  companyName: z.string().max(150),
  industry: z.string().max(100),
  size: z.number().int(),
  website: z.string().url().max(255).optional(),
});

export const individualSchema = z.object({
  id: z.number().int().optional(),
  personId: z.number().int(), // FK to person
  occupation: z.string().max(100).optional(),
  skills: z.array(z.string()).optional(),
});
