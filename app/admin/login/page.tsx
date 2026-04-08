'use client';

import React from 'react';
import { redirect, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { motion } from 'motion/react';
import { ArrowLeft, Lock, Mail, Loader2 } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { orpc } from '@/orpc/client';
import { useSession } from 'next-auth/react';

// --- Utility ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Schema ---
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const { status } = useSession();

  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    // Simulate API call
    // console.log('Logging in with:', data);

    // if (loggedin) {
    //   setIsLoading(false);
    //   router.push('/admin/backend');
    // }

    try {
      const res = await orpc.admin.auth(data);

      if (res.id != '') {
        redirect('/admin/dashboard');
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }

    // await new Promise(resolve => setTimeout(resolve, 1500));
  };

  if (status === 'authenticated') {
    redirect('/admin/dashboard');
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-900 flex flex-col relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neutral-100/50 dark:bg-neutral-950/50 rounded-full blur-3xl pointer-events-none" />

      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-neutral-100/50 dark:bg-neutral-950/50 rounded-full blur-3xl pointer-events-none" />

      {/* Top Left: Go Back Button */}
      <div className="p-6 z-10">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-white rounded-xl transition-all shadow-sm border border-transparent hover:border-slate-200 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="font-medium">Go Back</span>
        </button>
      </div>

      {/* Center: Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-indigo-200">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Welcome Back</h1>
            <p className="text-slate-500 mt-2">
              Enter your credentials to access your dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  {...register('email')}
                  type="email"
                  placeholder="name@example.com"
                  className={cn(
                    'w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl text-slate-900 focus:outline-none focus:ring-2 transition-all',
                    errors.email
                      ? 'border-red-300 focus:ring-red-500/20'
                      : 'border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500',
                  )}
                />
              </div>
              {errors.email && (
                <p className="text-xs font-medium text-red-500 ml-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <label className="text-sm font-semibold text-slate-700">
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs font-medium text-indigo-600 hover:text-indigo-700"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  {...register('password')}
                  type="password"
                  placeholder="••••••••"
                  className={cn(
                    'w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl text-slate-900 focus:outline-none focus:ring-2 transition-all',
                    errors.password
                      ? 'border-red-300 focus:ring-red-500/20'
                      : 'border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500',
                  )}
                />
              </div>
              {errors.password && (
                <p className="text-xs font-medium text-red-500 ml-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 group"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Login
                  <ArrowLeft className="w-4 h-4 rotate-180 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          {/* <div className="mt-8 text-center pt-6 border-t border-slate-100">
            <p className="text-sm text-slate-500">
              Don&apos;t have an account?{' '}
              <button className="font-bold text-indigo-600 hover:text-indigo-700">
                Create Account
              </button>
            </p>
          </div> */}
        </motion.div>
      </div>
    </div>
  );
}
