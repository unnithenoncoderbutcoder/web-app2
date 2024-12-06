'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';

export function Navbar() {
  const { user, signOut } = useAuth();

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-blue-600">
              Gaming Platform
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/tournaments">
              <Button variant="secondary">Tournaments</Button>
            </Link>
            <Link href="/matches">
              <Button variant="secondary">Matches</Button>
            </Link>
            {user ? (
              <Button onClick={() => signOut()} variant="primary">Sign Out</Button>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/auth/login">
                  <Button variant="secondary">Sign In</Button>
                </Link>
                <Link href="/auth/register">
                  <Button variant="primary">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}