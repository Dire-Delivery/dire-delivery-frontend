import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { Toasterr } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Dire Delivery',
  description: 'Your Delivery Companion',
  icons: {
    icon: '/Icons/plane.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-general vsc-initialized`}>
        {children}
        <Toaster />
        <Toasterr />
      </body>
    </html>
  );
}
