import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { Providers } from './providers';

// Load fonts with CSS variable support
const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'StoreBox - A Cloud Storage',
  description: 'Created by Gupta Shubham',
  metadataBase: new URL('https://storebox.vercel.app'), // if deployed
  openGraph: {
    title: 'StoreBox - A Cloud Storage',
    description: 'Securely upload, store, and access files in the cloud.',
    type: 'website',
    url: 'https://storebox.vercel.app',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'StoreBox by Gupta Shubham',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
        <body className="antialiased bg-background text-foreground font-sans transition-colors duration-200">
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
