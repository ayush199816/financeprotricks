'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold">
                Finance Pro Tricks
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push('/login')}
              className="px-6 py-2 rounded-md bg-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 border-2 border-black hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
} 