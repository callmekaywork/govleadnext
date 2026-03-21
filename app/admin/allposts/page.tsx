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
  Plus,
  ChevronLeft,
  ChevronRight,
  Calendar,
  EyeOff,
  Eye,
  Edit2,
  Trash2,
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
import { StatCard } from '@/components/admin/statcard';
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

export type PostReturnType = z.infer<typeof postSchema>;

type BlogPostT = PostsType & {
  author: UsersType;
};

export default function Newpost() {
  const { data: session, status } = useSession();
  if (status === 'loading') {
    <Loading />;
  }
  const [posts, setPosts] = useState<BlogPostT[]>([]);
  const [editingPost, setEditingPost] = useState<Partial<PostsType> | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const POSTS_PER_PAGE = 10;

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
    const message = await orpc.admin.create({
      authorId: `${session?.user.id}`,
      title: data.title,
      slug: data.slug,
      content: data.content,
      published: data.published === 'false' ? false : true,
      excerpt: data.excerpt,
      coverImageUrl: '',
      publishedAt: new Date(data.publishedAt),
      endDate: new Date(data.endDate),
      updatedAt: new Date(),
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

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-neutral-900 font-sans text-zinc-900">
      <nav className="border-b border-zinc-200 bg-white dark:bg-neutral-900 px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-zinc-500 hover:text-zinc-900">
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-xl dark:text-white font-semibold tracking-tight">
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
            className="flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-emerald-700 transition-colors hover:bg-zinc-800"
          >
            <Plus className="h-4 w-4" />
            New Post
          </button>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl p-6">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-xl border border-zinc-200 bg-white dark:bg-neutral-700 dark:text-white dark:placeholder:text-white py-2 pl-10 pr-4 focus:border-zinc-900 focus:outline-none"
            />
          </div>
          <div className="text-sm text-zinc-500">
            Showing {paginatedPosts.length} of {filteredPosts.length} posts
          </div>
        </div>

        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-900 border-t-transparent" />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:bg-neutral-900">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-zinc-100 bg-zinc-50/50 dark:bg-zinc-800 text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-200">
                    <th className="px-6 py-4">Post</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Dates</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {paginatedPosts.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-6 py-20 text-center text-zinc-500 dark:text-zinc-100 italic"
                      >
                        No posts found matching your search.
                      </td>
                    </tr>
                  ) : (
                    paginatedPosts.map(post => (
                      <tr
                        key={post.id}
                        className="group hover:bg-zinc-50/50 dark:hover:bg-zinc-700"
                      >
                        <td className="px-6 py-4">
                          <div className="font-bold text-zinc-900 dark:text-zinc-100">
                            {post.title}
                          </div>
                          <div className="text-xs text-zinc-400 dark:text-zinc-100">
                            {post.slug}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span
                              className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                                post.published === true
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : 'bg-zinc-100 text-zinc-600 '
                              }`}
                            >
                              {post.published ? 'Published' : 'Not Published'}
                            </span>
                            {isPubliclyVisible(post) ? (
                              <Eye className="h-3 w-3 text-emerald-600 dark:text-zinc-100" />
                            ) : (
                              <EyeOff className="h-3 w-3 text-zinc-300 dark:text-zinc-100" />
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1 text-xs text-zinc-500 dark:text-zinc-100">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Starts {format(post.publishedAt!, 'MMM d, yyyy')}
                            </span>
                            {post.updatedAt && (
                              <span className="flex items-center gap-1 text-amber-600">
                                <Clock className="h-3 w-3" />
                                Ends{' '}
                                {post.published == false
                                  ? format(post.publishedAt!, 'MMM d, yyyy')
                                  : format(post.updatedAt!, 'MMM d, yyyy')}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => setEditingPost(post)}
                              className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(post.slug)}
                              className="rounded-lg p-2 text-zinc-400 hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 py-8">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => p - 1)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-500 transition-colors hover:border-zinc-900 hover:text-zinc-900 disabled:opacity-50"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`h-10 w-10 rounded-xl border text-sm font-bold transition-all ${
                          currentPage === page
                            ? 'border-zinc-900 bg-zinc-900 text-white'
                            : 'border-zinc-200 bg-white text-zinc-500 hover:border-zinc-900 hover:text-zinc-900'
                        }`}
                      >
                        {page}
                      </button>
                    ),
                  )}
                </div>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(p => p + 1)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-500 transition-colors hover:border-zinc-900 hover:text-zinc-900 disabled:opacity-50"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
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
