'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, Bookmark, MoreHorizontal } from 'lucide-react';
import { useParams } from 'next/navigation';
import { orpc } from '@/orpc/client';
import { PostsType } from '@/types/next-auth';
import { format } from 'date-fns';
// import type { BlogPost } from '@/lib/mock-data';

export default function Blog() {
  const params = useParams<{ id: string }>();

  const [post, setPost] = useState<PostsType[]>([]);

  async function getPost() {
    const res = await orpc.select.get_viewed_post({ id: params.id });

    setPost(res);
  }

  useEffect(() => {
    getPost();
  }, []);

  function estimateReadingTime(content: string): number {
    // Count words by splitting on whitespace
    const words = content.trim().split(/\s+/).length;

    // Average reading speed (words per minute)
    const wordsPerMinute = 225;

    // Estimated time in minutes
    const minutes = Math.ceil(words / wordsPerMinute);

    return minutes;
  }

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-neutral-200">
      {/* Navigation */}

      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <button className="text-neutral-500 hover:text-neutral-900 transition-colors flex items-center gap-2 text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div className="flex items-center gap-4">
            <Bookmark className="w-5 h-5 text-neutral-400 hover:text-neutral-900 cursor-pointer transition-colors" />
            <MoreHorizontal className="w-5 h-5 text-neutral-400 hover:text-neutral-900 cursor-pointer transition-colors" />
          </div>
        </div>
      </nav>
      {post.length > 0 && (
        <main className="max-w-2xl mx-auto px-6 py-20">
          <header className="mb-16">
            <div className="flex items-center gap-2 text-neutral-500 text-sm mb-6">
              <span className="font-medium text-neutral-900">
                {post[0].slug}
              </span>
              <span>•</span>
              <span>{format(post[0].publishedAt!, 'MMM d, yyyy')}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-serif font-semibold leading-tight mb-6">
              {post[0].title}
            </h1>

            <p className="text-xl text-neutral-500 leading-relaxed mb-8">
              {post[0].excerpt}
            </p>

            <div className="flex items-center gap-4 border-y border-neutral-100 py-6">
              <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center">
                {/* <span className="text-xs font-bold">{post.author[0]}</span> */}
              </div>
              <div className="flex-1">
                {/* <div className="text-sm font-semibold">{post.author}</div> */}
                <div className="text-xs text-neutral-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  estimated {estimateReadingTime(post[0].content)}{' '}
                  {estimateReadingTime(post[0].content) > 1 ? 'mins' : 'min'}{' '}
                  read
                </div>
              </div>
            </div>
          </header>

          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-16 shadow-2xl shadow-neutral-200">
            <Image
              src={'/img_1.jpeg'}
              alt={post[0].title}
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <article className="markdown-body font-serif text-lg text-neutral-800 leading-relaxed">
            <ReactMarkdown>{post[0].content}</ReactMarkdown>
          </article>

          {/* <CommentSection comments={post.comments} designVariant="minimalist" /> */}
        </main>
      )}
    </div>
  );
}
