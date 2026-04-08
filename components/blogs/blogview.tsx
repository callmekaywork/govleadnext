'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import {
  Layout,
  Type,
  Terminal as TerminalIcon,
  ArrowRight,
} from 'lucide-react';
import { orpc } from '@/orpc/client';
import { PostsType } from '@/types/next-auth';
import { format } from 'date-fns';
import Link from 'next/link';

export default function Blogview() {
  const [displayedPosts, setDisplayedPosts] = useState<PostsType[]>([]);

  async function getPosts() {
    const res = await orpc.select.latest_posts();

    setDisplayedPosts(res);
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <main className="max-w-4xl mx-auto my-10">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-2xl font-display font-bold uppercase tracking-widest text-neutral-400">
          Latest Blogs
        </h2>

        {/* {!showAll && MOCK_POSTS.length > 3 && (
          <button
            onClick={() => setShowAll(true)}
            className="text-sm font-bold uppercase tracking-widest text-neutral-900 hover:text-neutral-500 transition-colors flex items-center gap-2 group"
          >
            View All{' '}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        )} */}
        {/* {showAll && (
          <button
            onClick={() => setShowAll(false)}
            className="text-sm font-bold uppercase tracking-widest text-neutral-900 hover:text-neutral-500 transition-colors"
          >
            Show Less
          </button>
        )} */}
      </div>

      <div className="grid grid-cols-1 gap-6">
        <AnimatePresence mode="popLayout">
          {displayedPosts.map((post, index) => (
            <motion.div
              key={post.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.05 }}
              //   onClick={() => handlePostClick(post)}
              className="group cursor-pointer bg-white border border-neutral-100 rounded-2xl p-4 flex items-center gap-6 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <Link
                href={`/blogs/${post.id}`}
                className="group cursor-pointer bg-white border border-neutral-100 rounded-2xl p-4 flex items-center gap-6 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden shadow-inner">
                  <Image
                    src={
                      post.coverImageUrl !== ''
                        ? post.coverImageUrl!
                        : '/img_2.jpeg'
                    }
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 text-[10px] text-neutral-400 mb-1 uppercase tracking-widest font-bold">
                    <span className="text-neutral-900">{post.id}</span>
                    <span>•</span>
                    {/* <span>{post.readTime}</span> */}
                  </div>
                  <h3 className="text-lg font-display font-bold text-neutral-900 group-hover:text-neutral-600 transition-colors truncate">
                    {post.title}
                  </h3>
                  {/* <p className="text-sm text-neutral-500 line-clamp-1">
                  {post.subtitle}
                </p> */}
                </div>

                <div className="hidden md:flex flex-col items-end text-right gap-1">
                  {/* <span className="text-xs font-semibold text-neutral-900">
                  {post.author}
                </span> */}
                  <span className="text-[10px] text-neutral-400 uppercase tracking-widest">
                    {format(post.publishedAt!, 'MMM d, yyyy')}
                  </span>
                </div>

                <ArrowRight className="w-5 h-5 text-neutral-200 group-hover:text-neutral-900 group-hover:translate-x-1 transition-all flex-shrink-0" />
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </main>
  );
}
