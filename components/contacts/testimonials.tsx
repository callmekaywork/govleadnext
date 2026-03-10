'use client';

import { Quote, Star } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';

import React from 'react';

export default function Testimonials() {
  return (
    <div>
      <TestimonialsList />
    </div>
  );
}

const TestimonialCard = ({ name, role, content, rating, image }: any) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="flex flex-col justify-between rounded-2xl bg-white dark:bg-neutral-100 p-8 shadow-sm ring-1 ring-stone-200"
  >
    <div>
      <div className="flex gap-1 text-stone-900 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={16} fill={i < rating ? 'currentColor' : 'none'} />
        ))}
      </div>
      <Quote className="text-stone-200 dark:text-neutral-900 mb-4" size={32} />
      <p className="text-stone-600 dark:text-emerald-900 leading-relaxed italic">
        &ldquo;{content}&rdquo;
      </p>
    </div>
    <div className="mt-8 flex items-center gap-4">
      <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-stone-100">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      <div>
        <h4 className="font-semibold text-stone-900 dark:text-neutral-900">
          {name}
        </h4>
        <p className="text-sm text-stone-500 dark:text-neutral-900">{role}</p>
      </div>
    </div>
  </motion.div>
);

const TestimonialsList = () => {
  const reviews = [
    {
      name: 'Kabelo Mbona',
      role: 'Baker',
      content:
        'TrustHub transformed how we handle customer feedback. Our conversion rate jumped by 15% in the first month of using their testimonial widgets.',
      rating: 5,
      image: '/img_2.jpeg',
    },
    {
      name: 'Themba Sipho Ncunu',
      role: 'Product Designer',
      content:
        'The interface is so clean and the integration was seamless. It&apos;s rare to find a tool that is both powerful and beautiful to look at.',
      rating: 5,
      image: '/img_3.jpeg',
    },
    {
      name: 'Lebohang Maroba',
      role: 'Owns a spaza-shop',
      content:
        'Authenticity is key for us. TrustHub makes it easy to verify and display real reviews that our customers actually trust.',
      rating: 4,
      image: '/img_1.jpeg',
    },
  ];

  return (
    <section
      id="testimonials"
      className="py-24 bg-stone-100 dark:bg-neutral-900"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-stone-900 dark:text-white sm:text-4xl">
            What our clients say
          </h2>
          <p className="mt-4 text-lg text-stone-600">
            Don&apos;t just take our word for it. Hear from the people who use
            TrustHub every day.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <TestimonialCard key={index} {...review} />
          ))}
        </div>
      </div>
    </section>
  );
};
