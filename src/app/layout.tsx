import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/context/CartProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'TableTop Touch',
  description: 'QR-Based Restaurant Ordering',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn('min-h-screen font-body antialiased', inter.variable)}>
        <CartProvider>
          <main>{children}</main>
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
