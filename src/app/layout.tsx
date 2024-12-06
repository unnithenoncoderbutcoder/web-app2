import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { Navbar } from '@/components/layout/navbar';
import { AuthProvider } from '@/providers/auth-provider';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Gaming Platform',
  description: 'Competitive gaming platform for tournaments and matches',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <main className="min-h-[calc(100vh-4rem)]">{children}</main>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}