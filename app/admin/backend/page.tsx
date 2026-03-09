'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  Filter,
  MoreVertical,
  User,
  LogOut,
  Bell,
  ArrowUpRight,
  Briefcase,
  Theater,
  Lightbulb,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { format } from 'date-fns';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Loading from '@/app/loading';
import LoginPage from '@/components/admin/loginpage';
import { useSession } from 'next-auth/react';
import { StatCard } from '@/components/admin/statcard';
import { orpc } from '@/orpc/client';
import { ThemeModeToggle } from '@/components/theme-button';
import Link from 'next/link';

// --- Utility ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Mock Data ---
const MOCK_USER = {
  name: 'Alex Rivera',
  email: 'alex.rivera@example.com',
  role: 'Senior Product Designer',
  // avatar: 'https://picsum.photos/seed/alex/100/100',
};

type AppStatus = 'Accepted' | 'Rejected' | 'Pending';

interface Application {
  id: string;
  company: string;
  role: string;
  date: string;
  status: AppStatus;
  location: string;
  salary: string;
}

type PersonType = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  linkedin: string | null;
  createdAt: Date;
};

type StartupType = {
  id: number;
  personId: number;
  startupName: string;
  industry: string;
  stage: string;
  teamSize: number;
  website: string | null;
  status: 'pending' | 'accepted' | 'rejected';
};

type CorporateType = {
  id: number;
  personId: number;
  companyName: string;
  industry: string;
  size: number;
  website: string | null;
  status: 'pending' | 'accepted' | 'rejected';
};

type IndividualType = {
  id: number;
  personId: number;
  occupation: string | null;
  skills: string[] | null;
  status: 'pending' | 'accepted' | 'rejected';
};

type ApplicationData = {
  person: PersonType;
  startup: StartupType | null;
  corporate: CorporateType | null;
  individual: IndividualType | null;
};

const MOCK_APPLICATIONS: Application[] = [
  {
    id: '1',
    company: 'TechFlow',
    role: 'Frontend Engineer',
    date: '2024-02-15',
    status: 'Accepted',
    location: 'Remote',
    salary: '$140k',
  },
  {
    id: '2',
    company: 'CloudScale',
    role: 'UI/UX Designer',
    date: '2024-02-18',
    status: 'Rejected',
    location: 'New York',
    salary: '$130k',
  },
  {
    id: '3',
    company: 'DataPulse',
    role: 'Product Manager',
    date: '2024-02-20',
    status: 'Pending',
    location: 'San Francisco',
    salary: '$160k',
  },
  {
    id: '4',
    company: 'Nexus AI',
    role: 'Full Stack Developer',
    date: '2024-02-22',
    status: 'Accepted',
    location: 'Remote',
    salary: '$155k',
  },
  {
    id: '5',
    company: 'GreenOps',
    role: 'DevOps Engineer',
    date: '2024-02-25',
    status: 'Pending',
    location: 'Austin',
    salary: '$145k',
  },
  {
    id: '6',
    company: 'SwiftPay',
    role: 'Mobile Developer',
    date: '2024-02-28',
    status: 'Rejected',
    location: 'Chicago',
    salary: '$135k',
  },
  {
    id: '7',
    company: 'InnoLabs',
    role: 'Backend Developer',
    date: '2024-03-01',
    status: 'Pending',
    location: 'Remote',
    salary: '$150k',
  },
];

const COLORS = {
  Accepted: '#10b981', // emerald-500
  Rejected: '#ef4444', // red-500
  Pending: '#f59e0b', // amber-500
};

export default function Backend() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    <Loading />;
  }

  return (
    <div>
      {/* <div className="h-28" /> */}
      {status === 'loading' && <Loading />}
      {status === 'unauthenticated' && <LoginPage />}
      {status === 'authenticated' && <Dashboard />}
    </div>
  );
}

function Dashboard() {
  const { data: session, status } = useSession();

  const [applications, setApplications] = useState<ApplicationData[]>([]);

  useEffect(() => {
    async function getData() {
      const res = await orpc.select.response();

      setApplications(res);

      console.log(res);
    }

    getData();

    // console.log(applications);
  }, []);

  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<AppStatus | 'All'>('All');

  // const stats = useMemo(() => {
  //   const total = MOCK_APPLICATIONS.length;
  //   const accepted = MOCK_APPLICATIONS.filter(
  //     a => a.status === 'Accepted',
  //   ).length;
  //   const rejected = MOCK_APPLICATIONS.filter(
  //     a => a.status === 'Rejected',
  //   ).length;
  //   const pending = MOCK_APPLICATIONS.filter(
  //     a => a.status === 'Pending',
  //   ).length;
  //   return { total, accepted, rejected, pending };
  // }, []);

  const stats = useMemo(() => {
    const total = applications.length; // startup applications
    const accepted = applications.filter(
      a => a.startup?.status === 'accepted',
    ).length;
    const rejected = applications.filter(
      a => a.startup?.status === 'rejected',
    ).length;
    const pending = applications.filter(
      a => a.startup?.status === 'pending',
    ).length;

    return { total, accepted, rejected, pending };
  }, []);

  // the chart
  const chartData = useMemo(
    () => [
      { name: 'Accepted', value: stats.accepted },
      { name: 'Rejected', value: stats.rejected },
      { name: 'Pending', value: stats.pending },
    ],
    [stats],
  );

  const filteredApps = useMemo(() => {
    return applications.filter(app => {
      const matchesSearch =
        app.startup?.startupName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        app.startup?.industry.toLowerCase().includes(searchQuery.toLowerCase());

      // const matchesStatus =
      //   statusFilter === 'pending' || app.startup.status === statusFilter;
      // return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-64 bg-white dark:bg-neutral-900 border-r border-slate-200 dark:border-slate-900 flex-col p-6">
        <Link href={'/'} className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white">
            {/* <LayoutDashboard className="w-6 h-6" /> */}
            <Image src={'/vercel.ico'} width={100} height={100} alt="logo" />I
          </div>
          <span className="font-bold text-xl tracking-tight">
            Incuvera Dashboard
          </span>
        </Link>

        <nav className="flex-1 space-y-1">
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 bg-indigo-50 text-indigo-600 rounded-lg font-medium"
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
          >
            <Briefcase className="w-5 h-5" />
            Applications
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
          >
            <Bell className="w-5 h-5" />
            Notifications
          </a>
          <div className="flex flex-row h-15 gap-2 items-center justify-between">
            <p className="flex flex-row h-full items-center gap-2">
              <Lightbulb size={15} /> Toggle Theme
            </p>
            <ThemeModeToggle />
          </div>
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-600">
          {status === 'authenticated' && (
            <div className="flex items-center gap-3 px-2 mb-4">
              <div className="relative w-10 h-10">
                <Image
                  src={'/vercel.ico'}
                  alt={`${session.user.firstname}`}
                  fill
                  className="rounded-full border-2 border-slate-100 dark:border-slate-800 object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-semibold text-slate-900 truncate">
                  {session.user.firstname}
                </p>
                <p className="text-xs text-slate-500 truncate">
                  {session?.user.email}
                </p>
              </div>
            </div>
          )}
          <button
            onClick={() => router.push('/admin/backend')}
            className="w-full flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
          >
            <LogOut className="w-6 h-6 dark:text-white" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg">Incuvera</span>
          </div>
          <div className="relative w-8 h-8">
            {/* <Image
              src={MOCK_USER.avatar}
              alt={MOCK_USER.name}
              fill
              className="rounded-full object-cover"
              referrerPolicy="no-referrer"
            /> */}
          </div>
        </header>

        {/* Welcome Section */}
        <div className="mb-8">
          {status == 'authenticated' && (
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl font-bold text-slate-900 dark:text-slate-300 mb-2"
            >
              Welcome back, {session.user.name}!
            </motion.h1>
          )}
          <p className="text-slate-500">
            Here&apos;s what&apos;s happening with your job applications today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Applications"
            value={stats.total}
            icon={Briefcase}
            colorClass="bg-indigo-50 text-indigo-600"
            delay={0.1}
          />
          <StatCard
            title="Accepted"
            value={stats.accepted}
            icon={CheckCircle2}
            colorClass="bg-emerald-50 text-emerald-600"
            delay={0.2}
          />
          <StatCard
            title="Rejected"
            value={stats.rejected}
            icon={XCircle}
            colorClass="bg-red-50 text-red-600"
            delay={0.3}
          />
          <StatCard
            title="Pending"
            value={stats.pending}
            icon={Clock}
            colorClass="bg-amber-50 text-amber-600"
            delay={0.4}
          />
        </div>

        {/* Charts and Table Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Chart Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-neutral-800 xl:col-span-1"
          >
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-300 mb-6">
              Status Distribution
            </h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[entry.name as keyof typeof COLORS]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: '12px',
                      border: 'none',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {chartData.map(item => (
                <div
                  key={item.name}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor:
                          COLORS[item.name as keyof typeof COLORS],
                      }}
                    />
                    <span className="text-slate-600 dark:text-slate-100">
                      {item.name}
                    </span>
                  </div>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Table Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-white dark:bg-neutral-800 rounded-2xl shadow-sm border border-slate-100 dark:border-neutral-800 xl:col-span-2 overflow-hidden flex flex-col"
          >
            <div className="p-6 border-bottom border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h3 className="text-lg font-bold text-slate-900">
                Recent Applications
              </h3>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-2 bg-slate-50 dark:text-slate-900 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all w-full sm:w-48"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value as any)}
                  className="px-3 py-2 bg-slate-50 border dark:text-slate-900 border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                >
                  <option value="All">All Status</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider dark:text-slate-100">
                      Company
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider dark:text-slate-100">
                      Role
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider dark:text-slate-100">
                      Date
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider dark:text-slate-100">
                      Status
                    </th>
                    {/* <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider dark:text-slate-100">
                      Salary
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider dark:text-slate-100"></th> */}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <AnimatePresence mode="popLayout">
                    {filteredApps.map(app => (
                      <motion.tr
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        key={app.startup?.id}
                        className="hover:bg-slate-50/50 transition-colors group"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs">
                              {app.startup?.startupName.charAt(0)}
                            </div>
                            <div>
                              <p className="font-semibold text-slate-900">
                                {app.startup?.startupName}
                              </p>
                              <p className="text-xs text-slate-500">
                                {app.startup?.stage}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-medium text-slate-700">
                            {/* {app.role} */}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          {/* <p className="text-sm text-slate-500">
                            {format(
                              new Date(app.startup?.),
                              'MMM dd, yyyy',
                            )}
                          </p> */}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={cn(
                              'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                              app.startup?.status === 'accepted' &&
                                'bg-emerald-100 text-emerald-700',
                              app.startup?.status === 'rejected' &&
                                'bg-red-100 text-red-700',
                              app.startup?.status === 'pending' &&
                                'bg-amber-100 text-amber-700',
                            )}
                          >
                            {app.startup?.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-semibold text-slate-900">
                            {/* {app.salary} */}
                          </p>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="p-1 hover:bg-slate-200 rounded-md transition-colors text-slate-400 hover:text-slate-600">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                  {filteredApps.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-12 text-center text-slate-500"
                      >
                        No applications found matching your criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
