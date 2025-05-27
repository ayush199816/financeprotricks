'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const adminMenuItems = [
  { name: 'Dashboard', href: '/admin' },
  { name: 'Banner', href: '/admin/banner' },
  { name: 'Article', href: '/admin/articles' },
  { name: 'Testimonials', href: '/admin/testimonials' },
  { name: 'Courses', href: '/admin/courses' },
  { name: 'Users', href: '/admin/users' },
  { name: 'Sales', href: '/admin/sales' },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-black text-white flex flex-col">
      <div className="p-4 text-2xl font-bold text-center border-b border-gray-700">
        Admin Panel
      </div>
      <nav className="flex flex-col flex-grow p-4">
        {
          adminMenuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`px-4 py-2 mt-2 rounded hover:bg-gray-700 ${pathname === item.href ? 'bg-gray-700' : ''} lava-text-gradient`}
            >
              {item.name}
            </Link>
          ))
        }
      </nav>
    </div>
  );
} 