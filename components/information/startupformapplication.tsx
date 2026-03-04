'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useForm, Controller, UseFormReturn, FieldPath } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
import {
  User,
  Target,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Save,
  Building2,
  Globe,
  Linkedin,
  Users,
  Lightbulb,
  AlertCircle,
} from 'lucide-react';
// import { FormData, INITIAL_DATA, StartupStage, FormSchema } from './types';

import { z } from 'zod';
import { StartupFormSchema } from '@/db/validationschemas';
import { orpc } from '@/orpc/client';
import { redirect } from 'next/navigation';

export type StartupStage =
  | 'Idea'
  | 'MVP'
  | 'Early Traction'
  | 'Scaling'
  | 'Established';

export type FormData = z.infer<typeof StartupFormSchema>;

export const INITIAL_DATA: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  role: '',
  linkedin: '',
  startupName: '',
  industry: '',
  stage: 'Idea',
  teamSize: 1,
  website: '',
  description: '',
  currentChallenges: '',
  revenueModel: '',
  goals: '',
  preferredExpertise: [],
  commitmentLevel: '',
};

const STORAGE_KEY = 'mentorship_application_draft';

export default function StartupFormApplication() {
  const [step, setStep] = useState(1);
  const [isSaved, setIsSaved] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [isReviewed, setReviewed] = useState(false);

  const form = useForm<any>({
    // resolver: zodResolver(FormSchema),
    defaultValues: INITIAL_DATA,
    mode: 'onChange',
  });

  const {
    handleSubmit,
    watch,
    reset,
    trigger,
    formState: { isValid },
  } = form;
  const watchedData = watch();

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        reset(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved data', e);
      }
    }
  }, [reset]);

  // Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(watchedData));
    setIsSaved(true);
    const timer = setTimeout(() => setIsSaved(false), 10000);
    return () => clearTimeout(timer);
  }, [watchedData]);

  const nextStep = async () => {
    // Validate current step fields before proceeding
    const fieldsToValidate = getFieldsForStep(step);
    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      setStep(s => Math.min(s + 1, 5));
    }
  };

  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const onSubmit = async (data: FormData) => {
    // console.log('Form Submitted:', data);
    // const startupSubmit = await orpc.applications.startup({
    //   firstName: data.firstName,
    //   lastName: data.lastName,
    //   email: data.email,
    //   role: data.role,
    //   linkedin: data.linkedin,
    // });

    // // Startup Info
    // startupName: data.startupName,
    // industry: data.industry,
    // stage: data.stage,
    // teamSize: data.teamSize,
    // website: data.website,

    // // Business Details
    // description: data.description,
    // currentChallenges: data.currentChallenges,
    // revenueModel: data.revenueModel,

    // // Mentorship Goals
    // goals: data.goals,
    // preferredExpertise: data.preferredExpertise,
    // commitmentLevel: data.commitmentLevel,
    // });

    // const startupSubmit = await orpc.applications.startup(data);

    const startupSubmit = await orpc.applications.startup(data);

    if (startupSubmit) {
      setIsSubmitted(true);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const getFieldsForStep = (currentStep: number): FieldPath<FormData>[] => {
    switch (currentStep) {
      case 1:
        return ['firstName', 'lastName', 'email', 'role', 'linkedin'];
      case 2:
        return ['startupName', 'industry', 'stage', 'teamSize', 'website'];
      case 3:
        return ['description', 'currentChallenges', 'revenueModel'];
      case 4:
        return ['goals', 'preferredExpertise', 'commitmentLevel'];
      default:
        return [];
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4 font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-3xl shadow-sm border border-neutral-200 p-12 text-center"
        >
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-3xl font-semibold text-neutral-900 mb-4">
            Application Sent!
          </h2>
          <p className="text-neutral-500 mb-8">
            Thank you for applying to our mentorship program. Our team will
            review your startup details and get back to you within 5-7 business
            days.
          </p>
          <button
            onClick={() => redirect('/')}
            className="w-full py-4 bg-neutral-900 text-white rounded-2xl font-medium hover:bg-neutral-800 transition-colors"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Mentorship Application
            </h1>
            <p className="text-neutral-500 text-sm">
              Empowering the next generation of founders.
            </p>
          </div>
          <div className="flex items-center gap-2 text-neutral-400 text-xs font-medium uppercase tracking-wider">
            <AnimatePresence mode="wait">
              {isSaved && (
                <motion.span
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="flex items-center gap-1 text-emerald-600"
                >
                  <Save size={14} /> Draft Saved
                </motion.span>
              )}
            </AnimatePresence>
            <span>Step {step} of 5</span>
          </div>
        </header>

        {/* Progress Bar */}
        <div className="mb-12 relative">
          <div className="h-1 w-full bg-neutral-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-neutral-900"
              initial={{ width: '0%' }}
              animate={{ width: `${(step / 5) * 100}%` }}
              transition={{ duration: 0.5, ease: 'circOut' }}
            />
          </div>
          <div className="flex justify-between mt-4">
            {[
              { icon: User, label: 'Profile' },
              { icon: Building2, label: 'Startup' },
              { icon: Lightbulb, label: 'Vision' },
              { icon: Target, label: 'Goals' },
              { icon: CheckCircle2, label: 'Review' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${step > i + 1 ? 'bg-emerald-100 text-emerald-600' : step === i + 1 ? 'bg-neutral-900 text-white' : 'bg-white border border-neutral-200 text-neutral-400'}`}
                >
                  {step > i + 1 ? (
                    <CheckCircle2 size={16} />
                  ) : (
                    <item.icon size={16} />
                  )}
                </div>
                <span
                  className={`text-[10px] font-semibold uppercase tracking-widest ${step === i + 1 ? 'text-neutral-900' : 'text-neutral-400'}`}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-3xl shadow-sm border border-neutral-200 overflow-hidden min-h-[500px] flex flex-col"
        >
          <div className="p-8 md:p-12 flex-grow">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                {step === 1 && <PersonalInfo form={form} />}
                {step === 2 && <StartupInfo form={form} />}
                {step === 3 && <BusinessVision form={form} />}
                {step === 4 && <MentorshipGoals form={form} />}
                {step === 5 && <Review formData={watchedData} />}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer Actions */}
          <footer className="p-6 bg-neutral-50 border-t border-neutral-200 flex justify-between items-center">
            <button
              type="button"
              onClick={prevStep}
              disabled={step === 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-neutral-600 hover:bg-neutral-200'}`}
            >
              <ChevronLeft size={20} /> Back
            </button>

            {step < 5 ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center gap-2 px-8 py-3 bg-neutral-900 text-white rounded-xl font-medium hover:bg-neutral-800 transition-all shadow-sm"
              >
                Continue <ChevronRight size={20} />
              </button>
            ) : (
              <>
                {isReviewed ? (
                  <button
                    type="submit"
                    disabled={!isValid}
                    className={`flex items-center gap-2 px-8 py-3 text-white rounded-xl font-medium transition-all shadow-sm ${isValid ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-neutral-300 cursor-not-allowed'}`}
                  >
                    Submit Application <CheckCircle2 size={20} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setReviewed(true);
                    }}
                    className={`flex items-center gap-2 px-8 py-3 text-white rounded-xl font-medium transition-all shadow-sm ${isValid ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-neutral-300 cursor-not-allowed'}`}
                  >
                    Yes i accept
                  </button>
                )}
              </>
            )}
          </footer>
        </form>

        <p className="text-center mt-8 text-neutral-400 text-xs">
          Your progress is automatically saved to your browser.
        </p>
      </div>
    </div>
  );
}

// --- Step Components ---

function PersonalInfo({ form }: { form: UseFormReturn<any> }) {
  const {
    register,
    formState: { errors },
  } = form;
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Tell us about yourself</h2>
        <p className="text-neutral-500">
          We want to know the person behind the vision.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputGroup
          label="First Name"
          {...register('firstName')}
          error={errors.firstName?.message as string}
          placeholder="Jane"
        />
        <InputGroup
          label="Last Name"
          {...register('lastName')}
          error={errors.lastName?.message as string}
          placeholder="Doe"
        />
        <InputGroup
          label="Email Address"
          type="email"
          {...register('email')}
          error={errors.email?.message as string}
          placeholder="jane@startup.com"
        />
        <InputGroup
          label="Role in Startup"
          {...register('role')}
          error={errors.role?.message as string}
          placeholder="CEO / Founder"
        />
        <div className="md:col-span-2">
          <InputGroup
            label="LinkedIn Profile URL"
            {...register('linkedin')}
            error={errors.linkedin?.message as string}
            placeholder="https://linkedin.com/in/username"
            icon={<Linkedin size={16} />}
          />
        </div>
      </div>
    </div>
  );
}

function StartupInfo({ form }: { form: UseFormReturn<any> }) {
  const {
    register,
    control,
    formState: { errors },
  } = form;
  const stages: StartupStage[] = [
    'Idea',
    'MVP',
    'Early Traction',
    'Scaling',
    'Established',
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Startup Details</h2>
        <p className="text-neutral-500">
          Tell us about your business or project.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputGroup
          label="Startup Name"
          {...register('startupName')}
          error={errors.startupName?.message as string}
          placeholder="Acme Corp"
        />
        <InputGroup
          label="Industry"
          {...register('industry')}
          error={errors.industry?.message as string}
          placeholder="Fintech, Healthtech, etc."
        />
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">
            Current Stage
          </label>
          <Controller
            name="stage"
            control={control}
            render={({ field }) => (
              <div className="flex flex-wrap gap-2">
                {stages.map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => field.onChange(s)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${field.value === s ? 'bg-neutral-900 text-white border-neutral-900' : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          />
          {errors.stage && (
            <p className="text-xs text-red-500">
              {errors.stage.message as string}
            </p>
          )}
        </div>
        <InputGroup
          label="Team Size"
          type="number"
          {...register('teamSize')}
          error={errors.teamSize?.message as string}
          placeholder="1"
          icon={<Users size={16} />}
        />
        <div className="md:col-span-2">
          <InputGroup
            label="Website URL"
            {...register('website')}
            error={errors.website?.message as string}
            placeholder="https://yourstartup.com"
            icon={<Globe size={16} />}
          />
        </div>
      </div>
    </div>
  );
}

function BusinessVision({ form }: { form: UseFormReturn<any> }) {
  const {
    register,
    formState: { errors },
  } = form;
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Vision & Challenges</h2>
        <p className="text-neutral-500">
          What are you building and what's standing in your way?
        </p>
      </div>
      <div className="space-y-6">
        <TextAreaGroup
          label="Elevator Pitch"
          description="Describe your startup in 2-3 sentences."
          {...register('description')}
          error={errors.description?.message as string}
          placeholder="We are building a platform that..."
        />
        <TextAreaGroup
          label="Biggest Challenges"
          description="What are the top 3 things you need help with right now?"
          {...register('currentChallenges')}
          error={errors.currentChallenges?.message as string}
          placeholder="1. Fundraising\n2. Product-market fit\n3. Hiring"
        />
        <InputGroup
          label="Revenue Model"
          {...register('revenueModel')}
          error={errors.revenueModel?.message as string}
          placeholder="SaaS, Marketplace, Transactional, etc."
        />
      </div>
    </div>
  );
}

function MentorshipGoals({ form }: { form: UseFormReturn<any> }) {
  const {
    register,
    control,
    formState: { errors },
  } = form;
  const expertiseOptions = [
    'Fundraising',
    'Product Strategy',
    'Marketing',
    'Sales',
    'Engineering',
    'Operations',
    'Legal',
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Mentorship Goals</h2>
        <p className="text-neutral-500">How can we help you succeed?</p>
      </div>
      <div className="space-y-6">
        <TextAreaGroup
          label="What do you hope to achieve?"
          {...register('goals')}
          error={errors.goals?.message as string}
          placeholder="In 6 months, I want to have..."
        />
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">
            Preferred Mentor Expertise
          </label>
          <Controller
            name="preferredExpertise"
            control={control}
            render={({ field }) => (
              <div className="flex flex-wrap gap-2">
                {expertiseOptions.map(opt => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      const current = field.value || [];
                      const next = current.includes(opt)
                        ? current.filter((i: string) => i !== opt)
                        : [...current, opt];
                      field.onChange(next);
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${field.value?.includes(opt) ? 'bg-neutral-900 text-white border-neutral-900' : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          />
          {errors.preferredExpertise && (
            <p className="text-xs text-red-500">
              {errors.preferredExpertise.message as string}
            </p>
          )}
        </div>
        <InputGroup
          label="Commitment Level"
          {...register('commitmentLevel')}
          error={errors.commitmentLevel?.message as string}
          placeholder="e.g., 2 hours per week"
        />
      </div>
    </div>
  );
}

function Review({ formData }: { formData: FormData }) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Review Application</h2>
        <p className="text-neutral-500">
          Double check your details before submitting.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ReviewSection title="Personal" icon={<User size={16} />}>
          <ReviewItem
            label="Name"
            value={`${formData.firstName} ${formData.lastName}`}
          />
          <ReviewItem label="Email" value={formData.email} />
          <ReviewItem label="Role" value={formData.role} />
        </ReviewSection>

        <ReviewSection title="Startup" icon={<Building2 size={16} />}>
          <ReviewItem label="Name" value={formData.startupName} />
          <ReviewItem label="Stage" value={formData.stage} />
          <ReviewItem label="Team Size" value={formData.teamSize.toString()} />
        </ReviewSection>

        <ReviewSection
          title="Vision"
          icon={<Lightbulb size={16} />}
          className="md:col-span-2"
        >
          <ReviewItem label="Pitch" value={formData.description} />
          <ReviewItem label="Challenges" value={formData.currentChallenges} />
        </ReviewSection>

        <ReviewSection
          title="Goals"
          icon={<Target size={16} />}
          className="md:col-span-2"
        >
          <ReviewItem label="Mentorship Goals" value={formData.goals} />
          <ReviewItem
            label="Expertise Needed"
            value={formData.preferredExpertise.join(', ')}
          />
        </ReviewSection>
      </div>

      <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex gap-3 items-start">
        <AlertCircle className="text-amber-600 shrink-0 mt-0.5" size={18} />
        <p className="text-sm text-amber-800">
          By submitting, you agree to share this information with our network of
          mentors. You can withdraw your application at any time.
        </p>
      </div>
    </div>
  );
}

// --- UI Components ---

interface InputGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

const InputGroup = React.forwardRef<HTMLInputElement, InputGroupProps>(
  ({ label, error, icon, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">
          {label}
        </label>
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            {...props}
            className={`w-full bg-neutral-50 border rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-neutral-900/5 focus:border-neutral-900 transition-all ${error ? 'border-red-500' : 'border-neutral-200'} ${icon ? 'pl-11' : ''}`}
          />
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  },
);

interface TextAreaGroupProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  description?: string;
  error?: string;
}

const TextAreaGroup = React.forwardRef<HTMLTextAreaElement, TextAreaGroupProps>(
  ({ label, description, error, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <div className="flex flex-col">
          <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">
            {label}
          </label>
          {description && (
            <span className="text-xs text-neutral-400 mt-0.5">
              {description}
            </span>
          )}
        </div>
        <textarea
          ref={ref}
          {...props}
          rows={4}
          className={`w-full bg-neutral-50 border rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-neutral-900/5 focus:border-neutral-900 transition-all resize-none ${error ? 'border-red-500' : 'border-neutral-200'}`}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  },
);

function ReviewSection({
  title,
  icon,
  children,
  className = '',
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center gap-2 pb-2 border-bottom border-neutral-100">
        <div className="text-neutral-400">{icon}</div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400">
          {title}
        </h3>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function ReviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-neutral-400 mb-1">{label}</dt>
      <dd className="text-sm font-medium text-neutral-800">
        {value || <span className="text-neutral-300 italic">Not provided</span>}
      </dd>
    </div>
  );
}
