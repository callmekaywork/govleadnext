'use client';

import LoginPage from '@/components/admin/loginpage';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === 'unauthenticated') {
    // log in page
    <LoginPage />;
  }

  if (status === 'loading') {
    // loading page
  }

  return (
    <div className="h-screen dark:bg-neutral-900">
      <h1 className="dark:text-white text-white text-2xl">Dashboard</h1>
    </div>
  );
}
