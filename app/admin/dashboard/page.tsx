'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';
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
  Plus,
  ChevronLeft,
  ChevronRight,
  Calendar,
  EyeOff,
  Eye,
  Edit2,
  Trash2,
  FileText,
  Clock4,
  BarChart3,
  ArrowRight,
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
import { format, isAfter, isBefore, parseISO } from 'date-fns';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Loading from '@/app/loading';
import LoginPage from '@/components/admin/loginpage';
import { useSession } from 'next-auth/react';
// import { StatCard } from '@/components/admin/statcard';
import { orpc } from '@/orpc/client';
import { ThemeModeToggle } from '@/components/theme-button';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PostsType, UsersType } from '@/types/next-auth';
import PostForm from '@/components/admin/postform';
import { toast } from 'sonner';
import { postSchema } from '@/db/validationschemas';
import z from 'zod';

// --- Utility ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

const COLORS = {
  Accepted: '#10b981', // emerald-500
  Rejected: '#ef4444', // red-500
  Pending: '#f59e0b', // amber-500
};

export type PostReturnType = z.infer<typeof postSchema>;

type BlogPostT = PostsType & {
  author: UsersType;
};

export default function Admindashboard() {
  const { data: session, status } = useSession();

  const [posts, setPosts] = useState<BlogPostT[]>([]);
  const [editingPost, setEditingPost] = useState<Partial<PostsType> | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const POSTS_PER_PAGE = 3;

  // const [isLoading, setIsLoading] = useState(true);
  const fetchPosts = async () => {
    setIsLoading(true);
    const res = await orpc.select.posts();

    const blogPosts: BlogPostT[] = res.map(row => ({
      ...row.posts,
      excerpt: row.posts.excerpt ?? null,
      coverImageUrl: row.posts.coverImageUrl ?? null,
      published: row.posts.published ?? false,
      publishedAt: row.posts.publishedAt
        ? new Date(row.posts.publishedAt)
        : null,
      updatedAt: row.posts.updatedAt
        ? new Date(row.posts.updatedAt)
        : new Date(),
      author: row.users,
    }));

    setPosts(blogPosts); // ✅ now matches flattened BlogPostT[]

    // console.log(res);

    setIsLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSave = async (data: any) => {
    console.log(data);

    const message = await orpc.admin.create({
      authorId: `${session?.user.id}`,
      title: data.title,
      slug: data.slug,
      content: data.content,
      published: data.published === 'false' ? false : true,
      excerpt: data.excerpt,
      coverImageUrl: '',
      publishedAt: data.publishedAt,
      endDate: data.endDate,
      updatedAt: data.updatedAt,
    });

    if (message.error) {
      // display error
      toast(`${message.message} | ${message.error} - ${message.code}`, {
        position: 'top-center',
      });
    } else {
      // display message
      toast(`${message.message}`, {
        position: 'top-center',
      });
    }

    // after 3 seconds → set true
    setTimeout(() => {
      setIsLoading(true);

      // after another 3 seconds → set false
      setTimeout(() => {
        fetchPosts();
        setIsLoading(false);
      }, 3000);
    }, 1000);
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    const res = await orpc.admin.delete({ slug: slug });

    if (res.error) {
      toast(`${res.message} | ${res.error} - ${res.code}`, {
        position: 'top-center',
      });
    } else {
      toast(`${res.message}`, {
        position: 'top-center',
      });
    }

    // after 3 seconds → set true
    setTimeout(() => {
      setIsLoading(true);

      // after another 3 seconds → set false
      setTimeout(() => {
        fetchPosts();
        setIsLoading(false);
      }, 3000);
    }, 1000);
  };

  const isPubliclyVisible = (post: BlogPostT) => {
    if (post.published !== true) return false;
    const now = new Date();
    const publishAt = parseISO(`${post.publishedAt}`);
    const removeAt = post.updatedAt ? parseISO(`${post.updatedAt}`) : null;

    if (isBefore(now, publishAt)) return false;
    if (removeAt && isAfter(now, removeAt)) return false;
    return true;
  };

  const filteredPosts = posts
    .filter(
      post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.slug.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort(
      (a, b) =>
        parseISO(`${b?.publishedAt}`).getTime() -
        parseISO(`${a?.publishedAt}`).getTime(),
    );

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  );

  // Stats computation
  const totalPosts = posts.length;
  const publishedPosts = posts.filter(p => p.published === true).length;
  const draftPosts = posts.filter(p => p.published === false).length;
  const activePosts = posts.filter(isPubliclyVisible).length;
  const scheduledPosts = posts.filter(
    p =>
      p.published === true && isAfter(parseISO(`${p.publishedAt}`), new Date()),
  ).length;

  const chartData = [
    { name: 'Total', count: totalPosts, color: '#18181b' },
    { name: 'Published', count: publishedPosts, color: '#10b981' },
    { name: 'Drafts', count: draftPosts, color: '#71717a' },
    { name: 'Active', count: activePosts, color: '#3b82f6' },
  ];

  const recentPosts = [...posts]
    .sort(
      (a, b) =>
        parseISO(`${b.publishedAt}`).getTime() -
        parseISO(`${a.publishedAt}`).getTime(),
    )
    .slice(0, 3);

  if (status === 'loading') {
    <Loading />;
  }

  if (status === 'unauthenticated' || session?.user.id == '') {
    redirect('/admin/login');
  }
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-neutral-900 font-sans text-zinc-900">
      <nav className="border-b border-zinc-200 dark:border-zinc-900 bg-white dark:bg-neutral-800 px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-zinc-500 hover:text-zinc-900">
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-xl font-semibold tracking-tight">
              Admin Dashboard
            </h1>
          </div>
          <button
            onClick={() =>
              setEditingPost({
                title: '',
                slug: '',
                content: '',
                excerpt: '',
                published: false,
                publishedAt: new Date(),
              })
            }
            className="flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
          >
            <Plus className="h-4 w-4" />
            New Post
          </button>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl p-6">
        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-900 border-t-transparent" />
          </div>
        ) : (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                icon={<FileText className="h-5 w-5" />}
                label="Total Posts"
                value={totalPosts}
              />
              <StatCard
                icon={<CheckCircle2 className="h-5 w-5 text-emerald-500" />}
                label="Published"
                value={publishedPosts}
              />
              <StatCard
                icon={<Clock4 className="h-5 w-5 text-amber-500" />}
                label="Scheduled"
                value={scheduledPosts}
              />
              <StatCard
                icon={<Eye className="h-5 w-5 text-blue-500" />}
                label="Live Now"
                value={activePosts}
              />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-neutral-800 p-6 lg:col-span-2">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="flex items-center gap-2 font-semibold dark:text-white">
                    <BarChart3 className="h-5 w-5" />
                    Content Overview
                  </h2>
                </div>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#f4f4f5"
                      />
                      <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#71717a', fontSize: 12 }}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#71717a', fontSize: 12 }}
                      />
                      <Tooltip
                        cursor={{ fill: '#f4f4f5' }}
                        contentStyle={{
                          borderRadius: '12px',
                          border: 'none',
                          boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                        }}
                      />
                      <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="flex flex-col justify-center rounded-2xl border border-zinc-200 dark:border-zinc-800 dark:bg-neutral-800 bg-zinc-900 p-8 text-white">
                <LayoutDashboard className="mb-4 h-12 w-12 text-zinc-400" />
                <h3 className="text-2xl font-bold">Welcome back</h3>
                <p className="mt-2 text-zinc-400">
                  Your blog currently has{' '}
                  <span className="text-white font-semibold">{totalPosts}</span>{' '}
                  posts.
                  {activePosts > 0
                    ? ` ${activePosts} are live and visible to the public.`
                    : ' None are currently live.'}
                </p>
                <button
                  onClick={() =>
                    setEditingPost({
                      title: '',
                      slug: '',
                      content: '',
                      excerpt: '',
                      published: false,
                      publishedAt: new Date(),
                    })
                  }
                  className="mt-8 flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-zinc-900 transition-transform hover:scale-105"
                >
                  <Plus className="h-4 w-4" />
                  Create New Post
                </button>
              </div>
            </div>

            {/* Recent Posts Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold tracking-tight">
                  Recent Activity
                </h2>
                <Link
                  href="/admin/allposts"
                  className="flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-zinc-900"
                >
                  View All Posts
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {recentPosts.length === 0 ? (
                  <div className="col-span-full flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-200 bg-white py-12 text-center">
                    <p className="text-zinc-500 italic">
                      No posts yet. Start by creating one!
                    </p>
                  </div>
                ) : (
                  recentPosts.map(post => (
                    <div
                      key={post.id}
                      className="group relative flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white dark:bg-neutral-800 dark:border-zinc-800 p-6 transition-all hover:shadow-lg"
                    >
                      <div>
                        <div className="mb-4 flex items-center justify-between">
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                              post.published === true
                                ? 'bg-emerald-50 text-emerald-700'
                                : 'bg-zinc-100 text-zinc-600'
                            }`}
                          >
                            {post.published}
                          </span>
                          <div className="flex gap-1">
                            <button
                              onClick={() => setEditingPost(post)}
                              className="text-zinc-400 dark:text-white hover:text-zinc-900"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(post.id)}
                              className="text-zinc-400 hover:text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <h3 className="font-bold text-zinc-900 dark:text-white  line-clamp-1">
                          {post.title}
                        </h3>
                        <p className="mt-2 text-sm text-zinc-500 line-clamp-2">
                          {post.excerpt}
                        </p>
                      </div>
                      <div className="mt-6 flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {post.published == false
                            ? format(post.publishedAt!, 'MMM d, yyyy')
                            : format(post.updatedAt!, 'MMM d, yyyy')}
                        </span>
                        {isPubliclyVisible(post) ? (
                          <span className="flex items-center gap-1 text-emerald-600">
                            <Eye className="h-3 w-3" />
                            Live
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-zinc-400">
                            <EyeOff className="h-3 w-3" />
                            Hidden
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      <AnimatePresence>
        {editingPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/40 p-4 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="h-full max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl"
            >
              <PostForm
                initialData={editingPost}
                onSave={handleSave}
                onCancel={() => setEditingPost(null)}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-neutral-800 p-6 transition-all hover:shadow-md">
      <div className="flex items-center gap-3 text-zinc-500 dark:text-white">
        {icon}
        <span className="text-xs font-bold uppercase tracking-widest">
          {label}
        </span>
      </div>
      <div className="mt-4 text-3xl font-bold tracking-tight dark:text-white">
        {value}
      </div>
    </div>
  );
}

// function Dashboard() {
//   const { data: session, status } = useSession();
//   const [posts, setPosts] = useState<BlogPost[]>([]);
//   const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(
//     null,
//   );
//   const [isLoading, setIsLoading] = useState(true);
//   const fetchPosts = async () => {
//     const res = await orpc.select.posts();
//     setPosts(res);
//   };

//   // useEffect(() => {
//   //   const loadPosts = async () => {
//   //     setIsLoading(true);
//   //     try {
//   //       const res = await orpc.select.posts();
//   //       setPosts(res);

//   //       console.log(res, session?.user.id);
//   //       setIsLoading(false);
//   //     } catch (error) {
//   //       console.error('Failed to fetch posts:', error);
//   //       setIsLoading(false);
//   //     }
//   //   };
//   //   loadPosts();
//   // }, []);

//   useEffect(() => {
//     async function newPost() {
//       await orpc.admin.create({
//         authorId: `${session?.user.id}`,
//         title: 'newTitle',
//         slug: 'string',
//         content: 'string',
//         published: false,
//         excerpt: 'no man at all',
//         coverImageUrl: '',
//         publishedAt: new Date(),
//         updatedAt: new Date(),
//       });
//     }

//     newPost();
//   }, []);

//   const [applications, setApplications] = useState<ApplicationData[]>([]);

//   useEffect(() => {
//     async function getData() {
//       const res = await orpc.select.response();

//       setApplications(res);
//     }

//     getData();

//     // console.log(applications);
//   }, []);

//   const router = useRouter();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [statusFilter, setStatusFilter] = useState<AppStatus | 'All'>('All');

//   const stats = useMemo(() => {
//     const total = applications.length; // startup applications
//     const accepted = applications.filter(
//       a => a.startup?.status === 'accepted',
//     ).length;
//     const rejected = applications.filter(
//       a => a.startup?.status === 'rejected',
//     ).length;
//     const pending = applications.filter(
//       a => a.startup?.status === 'pending',
//     ).length;

//     return { total, accepted, rejected, pending };
//   }, []);

//   // the chart
//   const chartData = useMemo(
//     () => [
//       { name: 'Accepted', value: stats.accepted },
//       { name: 'Rejected', value: stats.rejected },
//       { name: 'Pending', value: stats.pending },
//     ],
//     [stats],
//   );

//   const filteredApps = useMemo(() => {
//     return applications.filter(app => {
//       const matchesSearch =
//         app.startup?.startupName
//           .toLowerCase()
//           .includes(searchQuery.toLowerCase()) ||
//         app.startup?.industry.toLowerCase().includes(searchQuery.toLowerCase());
//     });
//   }, [searchQuery, statusFilter]);

//   return (
//     <div className="min-h-screen flex flex-col lg:flex-row">
//       {/* Sidebar - Desktop */}

//       <aside className="hidden lg:flex w-64 bg-white dark:bg-neutral-900 border-r border-slate-200 dark:border-slate-900 flex-col p-6">
//         <Link href={'/'} className="flex items-center gap-3 mb-10 px-2">
//           <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white">
//             {/* <LayoutDashboard className="w-6 h-6" /> */}
//             <Image src={'/vercel.ico'} width={100} height={100} alt="logo" />I
//           </div>
//           <span className="font-bold text-xl tracking-tight">
//             Incuvera Dashboard
//           </span>
//         </Link>

//         <nav className="flex-1 space-y-1">
//           <a
//             href="#"
//             className="flex items-center gap-3 px-3 py-2 bg-indigo-50 text-indigo-600 rounded-lg font-medium"
//           >
//             <LayoutDashboard className="w-5 h-5" />
//             Dashboard
//           </a>
//           <a
//             href="#"
//             className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
//           >
//             <Briefcase className="w-5 h-5" />
//             Applications
//           </a>
//           <a
//             href="#"
//             className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
//           >
//             <Bell className="w-5 h-5" />
//             Notifications
//           </a>
//           <div className="flex flex-row h-15 gap-2 items-center justify-between">
//             <p className="flex flex-row h-full items-center gap-2">
//               <Lightbulb size={15} /> Toggle Theme
//             </p>
//             <ThemeModeToggle />
//           </div>
//         </nav>

//         <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-600">
//           {status === 'authenticated' && (
//             <div className="flex items-center gap-3 px-2 mb-4">
//               <div className="relative w-10 h-10">
//                 <Image
//                   src={'/vercel.ico'}
//                   alt={`${session.user.firstname}`}
//                   fill
//                   className="rounded-full border-2 border-slate-100 dark:border-slate-800 object-cover"
//                   referrerPolicy="no-referrer"
//                 />
//               </div>
//               <div className="overflow-hidden">
//                 <p className="text-sm font-semibold text-slate-900 truncate">
//                   {session.user.firstname}
//                 </p>
//                 <p className="text-xs text-slate-500 truncate">
//                   {session?.user.email}
//                 </p>
//               </div>
//             </div>
//           )}
//           <button
//             onClick={() => router.push('/admin/backend')}
//             className="w-full flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
//           >
//             <LogOut className="w-6 h-6 dark:text-white" />
//             Sign Out
//           </button>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
//         {/* Mobile Header */}

//         <header className="lg:hidden flex items-center justify-between mb-8">
//           <div className="flex items-center gap-2">
//             <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
//               <Image src={'/vercel.ico'} width={20} height={20} alt="logo" />I
//             </div>

//             <span className="font-bold text-lg">Incuvera</span>
//           </div>

//           <div className="relative w-8 h-8">
//             {/* <Image
//               src={MOCK_USER.avatar}
//               alt={MOCK_USER.name}
//               fill
//               className="rounded-full object-cover"
//               referrerPolicy="no-referrer"
//             /> */}
//           </div>
//         </header>

//         {/* Welcome Section */}
//         <div className="mb-8">
//           {status == 'authenticated' && (
//             <motion.h1
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               className="text-3xl font-bold text-slate-900 dark:text-slate-300 mb-2"
//             >
//               Welcome back, {session.user.name}!
//             </motion.h1>
//           )}
//           <p className="text-slate-500">
//             Here&apos;s what&apos;s happening with your job applications today.
//           </p>
//         </div>

//         <div className="h-30 w-full md:h-50 bg-white dark:bg-neutral-800 rounded-2xl mb-7 flex flex-row items-center">
//           <div>You have zero active posts</div>
//           <h1>Create new blog</h1>
//           <Button>Create new Blog</Button>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
//           <StatCard
//             title="Total Applications"
//             value={stats.total}
//             icon={Briefcase}
//             colorClass="bg-indigo-50 text-indigo-600"
//             delay={0.1}
//           />
//           <StatCard
//             title="Accepted"
//             value={stats.accepted}
//             icon={CheckCircle2}
//             colorClass="bg-emerald-50 text-emerald-600"
//             delay={0.2}
//           />
//           <StatCard
//             title="Rejected"
//             value={stats.rejected}
//             icon={XCircle}
//             colorClass="bg-red-50 text-red-600"
//             delay={0.3}
//           />
//           <StatCard
//             title="Pending"
//             value={stats.pending}
//             icon={Clock}
//             colorClass="bg-amber-50 text-amber-600"
//             delay={0.4}
//           />
//         </div>

//         {/* Charts and Table Section */}
//         <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
//           {/* Chart Card */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 0.5 }}
//             className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-neutral-800 xl:col-span-1"
//           >
//             <h3 className="text-lg font-bold text-slate-900 dark:text-slate-300 mb-6">
//               Status Distribution
//             </h3>
//             <div className="h-64 w-full">
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={chartData}
//                     cx="50%"
//                     cy="50%"
//                     innerRadius={60}
//                     outerRadius={80}
//                     paddingAngle={5}
//                     dataKey="value"
//                   >
//                     {chartData.map((entry, index) => (
//                       <Cell
//                         key={`cell-${index}`}
//                         fill={COLORS[entry.name as keyof typeof COLORS]}
//                       />
//                     ))}
//                   </Pie>
//                   <Tooltip
//                     contentStyle={{
//                       borderRadius: '12px',
//                       border: 'none',
//                       boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//                     }}
//                   />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//             <div className="mt-4 space-y-2">
//               {chartData.map(item => (
//                 <div
//                   key={item.name}
//                   className="flex items-center justify-between text-sm"
//                 >
//                   <div className="flex items-center gap-2">
//                     <div
//                       className="w-3 h-3 rounded-full"
//                       style={{
//                         backgroundColor:
//                           COLORS[item.name as keyof typeof COLORS],
//                       }}
//                     />
//                     <span className="text-slate-600 dark:text-slate-100">
//                       {item.name}
//                     </span>
//                   </div>
//                   <span className="font-semibold text-slate-900 dark:text-slate-100">
//                     {item.value}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </motion.div>

//           {/* Table Card */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 0.6 }}
//             className="bg-white dark:bg-neutral-800 rounded-2xl shadow-sm border border-slate-100 dark:border-neutral-800 xl:col-span-2 overflow-hidden flex flex-col"
//           >
//             <div className="p-6 border-bottom border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//               <h3 className="text-lg font-bold text-slate-900">
//                 Recent Applications
//               </h3>
//               <div className="flex items-center gap-3">
//                 <div className="relative">
//                   <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
//                   <input
//                     type="text"
//                     placeholder="Search..."
//                     value={searchQuery}
//                     onChange={e => setSearchQuery(e.target.value)}
//                     className="pl-9 pr-4 py-2 bg-slate-50 dark:text-slate-900 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all w-full sm:w-48"
//                   />
//                 </div>
//                 <select
//                   value={statusFilter}
//                   onChange={e => setStatusFilter(e.target.value as any)}
//                   className="px-3 py-2 bg-slate-50 border dark:text-slate-900 border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
//                 >
//                   <option value="All">All Status</option>
//                   <option value="Accepted">Accepted</option>
//                   <option value="Rejected">Rejected</option>
//                   <option value="Pending">Pending</option>
//                 </select>
//               </div>
//             </div>

//             <div className="overflow-x-auto">
//               <table className="w-full text-left border-collapse">
//                 <thead>
//                   <tr className="bg-slate-50/50">
//                     <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider dark:text-slate-100">
//                       Company
//                     </th>
//                     <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider dark:text-slate-100">
//                       Role
//                     </th>
//                     <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider dark:text-slate-100">
//                       Date
//                     </th>
//                     <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider dark:text-slate-100">
//                       Status
//                     </th>
//                     {/* <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider dark:text-slate-100">
//                       Salary
//                     </th>
//                     <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider dark:text-slate-100"></th> */}
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-slate-100">
//                   <AnimatePresence mode="popLayout">
//                     {filteredApps.map(app => (
//                       <motion.tr
//                         layout
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         key={app.startup?.id}
//                         className="hover:bg-slate-50/50 transition-colors group"
//                       >
//                         <td className="px-6 py-4">
//                           <div className="flex items-center gap-3">
//                             <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs">
//                               {app.startup?.startupName.charAt(0)}
//                             </div>
//                             <div>
//                               <p className="font-semibold text-slate-900">
//                                 {app.startup?.startupName}
//                               </p>
//                               <p className="text-xs text-slate-500">
//                                 {app.startup?.stage}
//                               </p>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4">
//                           <p className="text-sm font-medium text-slate-700">
//                             {/* {app.role} */}
//                           </p>
//                         </td>
//                         <td className="px-6 py-4">
//                           {/* <p className="text-sm text-slate-500">
//                             {format(
//                               new Date(app.startup?.),
//                               'MMM dd, yyyy',
//                             )}
//                           </p> */}
//                         </td>
//                         <td className="px-6 py-4">
//                           <span
//                             className={cn(
//                               'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
//                               app.startup?.status === 'accepted' &&
//                                 'bg-emerald-100 text-emerald-700',
//                               app.startup?.status === 'rejected' &&
//                                 'bg-red-100 text-red-700',
//                               app.startup?.status === 'pending' &&
//                                 'bg-amber-100 text-amber-700',
//                             )}
//                           >
//                             {app.startup?.status}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4">
//                           <p className="text-sm font-semibold text-slate-900">
//                             {/* {app.salary} */}
//                           </p>
//                         </td>
//                         <td className="px-6 py-4 text-right">
//                           <button className="p-1 hover:bg-slate-200 rounded-md transition-colors text-slate-400 hover:text-slate-600">
//                             <MoreVertical className="w-4 h-4" />
//                           </button>
//                         </td>
//                       </motion.tr>
//                     ))}
//                   </AnimatePresence>
//                   {filteredApps.length === 0 && (
//                     <tr>
//                       <td
//                         colSpan={6}
//                         className="px-6 py-12 text-center text-slate-500"
//                       >
//                         No applications found matching your criteria.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </motion.div>
//         </div>
//       </main>
//     </div>
//   );
// }
