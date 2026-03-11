'use clients';

import {
  CircleFadingPlus,
  Instagram,
  Linkedin,
  MessageCircleMore,
  MessageSquareQuote,
  Phone,
  Twitter,
} from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import React from 'react';

export default function Socials() {
  const whatsappNumber = '1234567890'; // Replace with your actual number
  const message = encodeURIComponent(
    "Hello! I'm interested in learning more about TrustHub.",
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  const socialLinks = [
    {
      name: 'WhatsApp',
      icon: Phone,
      url: whatsappUrl,
      color: 'hover:bg-green-500 hover:text-white',
      description: 'Chat with us directly',
    },
    {
      name: 'Instagram',
      icon: CircleFadingPlus,
      url: '#',
      color: 'hover:bg-pink-500 hover:text-white',
      description: 'Follow our journey',
    },
    // {
    //   name: 'Twitter',
    //   icon: MessageCircleMore,
    //   url: '#',
    //   color: 'hover:bg-blue-400 hover:text-white',
    //   description: 'Latest updates',
    // },
    {
      name: 'Facebook',
      icon: MessageSquareQuote,
      url: 'https://www.facebook.com/share/1AQohmS88w/',
      color: 'hover:bg-blue-700 hover:text-white',
      description: 'Professional network',
    },
  ];

  return (
    <section
      id="socials"
      className="py-24 bg-stone-50 dark:bg-neutral-900 flex justify-center items-center"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
            Connect With Us
          </h2>
          <p className="mt-4 text-lg text-stone-600">
            Have questions? Reach out on your favorite platform.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {socialLinks.map(social => (
            <div
              key={social.name}
              //   whileHover={{ scale: 1.02 }}
              //   whileTap={{ scale: 0.98 }}
              className={`flex flex-col items-center rounded-2xl bg-white dark:bg-neutral-800  p-8 shadow-sm ring-1 ring-stone-200 dark:ring-stone-900 transition-all ${social.color}`}
            >
              <Link href={social.url} target="_blank" rel="noopener noreferrer">
                <social.icon size={32} className="mb-4" />
                <h3 className="text-lg font-semibold">{social.name}</h3>
                <p className="mt-2 text-sm opacity-80">{social.description}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// const FloatingWhatsApp = () => {
//   const whatsappNumber = '0843116547'; // Replace with your actual number
//   const message = encodeURIComponent(
//     'Hi there! I have a question about Incuvera.',
//   );
//   const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

//   return (
//     <motion.a
//       href={whatsappUrl}
//       target="_blank"
//       rel="noopener noreferrer"
//       initial={{ scale: 0, opacity: 0 }}
//       animate={{ scale: 1, opacity: 1 }}
//       whileHover={{ scale: 1.1 }}
//       whileTap={{ scale: 0.9 }}
//       className="fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition-colors"
//     >
//       <Phone size={24} />
//       <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold">
//         1
//       </span>
//     </motion.a>
//   );
// }
