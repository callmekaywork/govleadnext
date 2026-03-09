'use client';

import Header from '@/components/header/header';
import StartupFormApplication from '@/components/information/startupformapplication';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

import React, { useState } from 'react';
import { motion } from 'motion/react';

export default function Apply() {
  const [isType, setIsType] = useState('startup');

  // check for saved state

  return (
    <div className="bg-gray-100 dark:bg-neutral-900">
      <Header />

      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="w-full flex flex-row justify-center items-center h-30 md:h-40 gap-5"
      >
        <Button
          onClick={() => setIsType('startup')}
          className={cn(
            'relative cursor-pointer h-20 md:h-30 w-25 md:w-70 bg-gray-200 rounded-2xl shadow-md shadow-gray-300 border',
            isType === 'startup' && 'bg-slate-400',
          )}
        >
          <div
            className={cn(
              'absolute top-3 left-3 h-3 w-3 md:h-5 md:w-5 border-4 border-red-400 rounded-full',
              isType === 'startup' && 'bg-red-400',
            )}
          />

          <h1
            className={cn(
              'text-sm md:text-2xl text-black dark:text-white',
              isType === 'startup' && 'text-white',
            )}
          >
            Start up
          </h1>
        </Button>

        <Button
          onClick={() => {
            toast('Corporate section not available at the moment', {
              position: 'top-center',
            });
            //  setIsType('corporate')
          }}
          className={cn(
            'relative cursor-pointer h-20 md:h-30 w-25 md:w-70 bg-gray-100 rounded-2xl shadow-md shadow-gray-300 border',
          )}
        >
          <div
            className={cn(
              'absolute top-3 left-3 h-3 w-3 md:h-5 md:w-5 border-4 border-green-400 rounded-full',
              isType === 'corporate' && 'bg-red-400',
            )}
          />

          <h1 className="text-sm md:text-2xl text-black dark:text-white">
            Corporate
          </h1>
        </Button>
        <Button
          onClick={() => {
            toast('Individual section not available at the moment', {
              position: 'top-center',
            });
            //  setIsType('individual')
          }}
          className={cn(
            'relative cursor-pointer h-20 md:h-30 w-25 md:w-70 bg-gray-100 rounded-2xl shadow-md shadow-gray-300 border',
          )}
        >
          <div
            className={cn(
              'absolute top-3 left-3 h-3 w-3 md:h-5 md:w-5 border-4 border-pink-400 rounded-full',
              isType === 'individual' && 'bg-red-400',
            )}
          />

          <h1 className="text-sm md:text-2xl text-black dark:text-white">
            Individual
          </h1>
        </Button>
      </motion.div>

      {isType === 'corporate' ? (
        <>
          <p>Corporate</p>
        </>
      ) : (
        <StartupFormApplication />
      )}
    </div>
  );
}
