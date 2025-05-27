"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <div className="flex min-h-screen bg-gray-900">
            {/* Side Navigation */}
            <AdminSidebar />

            {/* Main Content */}
            <div className="flex-1 p-8">
                {children}
            </div>
        </div>
    );
} 