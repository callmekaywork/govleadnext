'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { format, parseISO } from 'date-fns';
import { Save, X, Clock, EyeOff } from 'lucide-react';
import { PostsType } from '@/types/next-auth';
import { postSchema } from '@/db/validationschemas';

interface PostFormProps {
  initialData?: Partial<PostsType>;
  onSave: (data: any) => Promise<void>;
  onCancel: () => void;
}

const LOCAL_STORAGE_KEY = 'blog_post_draft';

export type FormData = z.infer<typeof postSchema>;

export default function PostForm({
  initialData,
  onSave,
  onCancel,
}: PostFormProps) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    // resolver: zodResolver(postSchema),
    defaultValues: {
      title: initialData?.title || '',
      slug: initialData?.slug || '',
      //   status: initialData?.status || 'draft',
      publishedAt: initialData?.publishedAt!,

      updatedAt: initialData?.updatedAt!,
      excerpt: initialData?.excerpt || '',
      content: initialData?.content || '',
    },
  });

  // Load draft from localStorage if it's a NEW post
  useEffect(() => {
    if (!initialData?.id) {
      const savedDraft = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedDraft) {
        try {
          const draft = JSON.parse(savedDraft);
          Object.keys(draft).forEach(key => {
            setValue(key as keyof FormData, draft[key]);
          });
        } catch (e) {
          console.error('Error loading draft:', e);
        }
      }
    }
  }, [initialData, setValue]);

  // Auto-save draft to localStorage for NEW posts
  const watchedValues = watch();
  useEffect(() => {
    if (!initialData?.id) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(watchedValues));
    }
  }, [watchedValues, initialData]);

  const onSubmit = async (data: FormData) => {
    // console.log(data);

    data.updatedAt = new Date();
    data.publishedAt = new Date(data.publishedAt!);
    data.endDate = new Date(data.endDate!);

    await onSave(data);
    onCancel();
    if (!initialData?.id) {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex h-full flex-col">
      <header className="flex items-center justify-between border-b border-zinc-100  px-6 py-4">
        <h2 className="text-lg font-semibold">
          {initialData?.id ? 'Edit Post' : 'New Post'}
        </h2>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {isSubmitting ? 'Saving...' : 'Save Post'}
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid gap-6">
          <div className="grid gap-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Title
            </label>
            <input
              {...register('title')}
              className={`w-full rounded-lg border px-4 py-2 focus:border-zinc-900 focus:outline-none ${
                errors.title ? 'border-red-500' : 'border-zinc-200'
              }`}
              placeholder="Enter post title..."
            />
            {errors.title && (
              <span className="text-xs text-red-500">
                {errors.title.message}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Slug
              </label>
              <input
                {...register('slug')}
                onChange={e => {
                  const val = e.target.value.toLowerCase().replace(/\s+/g, '-');
                  setValue('slug', val);
                }}
                className={`w-full rounded-lg border px-4 py-2 focus:border-zinc-900 focus:outline-none ${
                  errors.slug ? 'border-red-500' : 'border-zinc-200'
                }`}
                placeholder="post-slug-here"
              />
              {errors.slug && (
                <span className="text-xs text-red-500">
                  {errors.slug.message}
                </span>
              )}
            </div>
            <div className="grid gap-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Status
              </label>
              <select
                {...register('published')}
                className="w-full rounded-lg border border-zinc-200 px-4 py-2 focus:border-zinc-900 focus:outline-none"
              >
                <option value="false">Draft</option>
                <option value="true">Published</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                <Clock className="h-3 w-3" />
                Publish Date
              </label>
              <input
                type="datetime-local"
                {...register('publishedAt')}
                className={`w-full rounded-lg border px-4 py-2 focus:border-zinc-900 focus:outline-none ${
                  errors.publishedAt ? 'border-red-500' : 'border-zinc-200'
                }`}
              />
              {errors.publishedAt && (
                <span className="text-xs text-red-500">
                  {errors.publishedAt.message}
                </span>
              )}
            </div>
            <div className="grid gap-2">
              <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                <EyeOff className="h-3 w-3" />
                Remove Date (Optional)
              </label>
              <input
                type="datetime-local"
                {...register('endDate')}
                className="w-full rounded-lg border border-zinc-200 px-4 py-2 focus:border-zinc-900 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Excerpt
            </label>
            <textarea
              {...register('excerpt')}
              className="w-full rounded-lg border border-zinc-200 px-4 py-2 focus:border-zinc-900 focus:outline-none"
              rows={2}
              placeholder="Brief summary of the post..."
            />
          </div>

          <div className="grid gap-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Content (Markdown)
            </label>
            <textarea
              {...register('content')}
              className={`min-h-[300px] w-full rounded-lg border px-4 py-2 font-mono text-sm focus:border-zinc-900 focus:outline-none ${
                errors.content ? 'border-red-500' : 'border-zinc-200'
              }`}
              placeholder="Write your post content here..."
            />
            {errors.content && (
              <span className="text-xs text-red-500">
                {errors.content.message}
              </span>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
// function zodResolver(
//   postSchema: z.ZodObject<
//     {
//       title: z.ZodString;
//       slug: z.ZodString;
//       status: z.ZodEnum<{ draft: 'draft'; published: 'published' }>;
//       removeAt: z.ZodOptional<z.ZodString>;
//       excerpt: z.ZodOptional<z.ZodString>;
//       content: z.ZodString;
//     },
//     z.core.$strip
//   >,
// ):
//   | import('react-hook-form').Resolver<
//       {
//         title: string;
//         slug: string;
//         status: 'draft' | 'published';
//         publishedAt: string;
//         content: string;
//         endDate?: string | undefined;
//         excerpt?: string | undefined;
//       },
//       any,
//       {
//         title: string;
//         slug: string;
//         status: 'draft' | 'published';
//         publishedAt: string;
//         content: string;
//         removeAt?: string | undefined;
//         excerpt?: string | undefined;
//       }
//     >
//   | undefined {
//   throw new Error('Function not implemented.');
// }
