import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';
import Header from '@/components/header/header';
import { ThemeProvider } from '@/components/theme-provider';
import Footer from '@/components/footer/footer';
import CustomCursor from '@/components/custom-cursor';
import { SessionProvider } from 'next-auth/react';

const dmSans = DM_Sans({
  weight: ['400', '500'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'IncuVera Pty',
  description: 'made by Khotso Nyokong',
};

// ${roboto.className}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={` ${dmSans.className} antialiased`}>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <CustomCursor />

            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
