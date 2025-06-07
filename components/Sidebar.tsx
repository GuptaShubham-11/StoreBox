'use client';

import { Home, Folder, Settings, StarIcon, Trash2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const navItems = [
    { name: 'Dashboard', icon: Home, href: '/dashboard' },
    { name: 'My Files', icon: Folder, href: '/dashboard/files' },
    { name: 'Starred', icon: StarIcon, className: 'text-yellow-400 fill-yellow-400', href: '/dashboard/starred' },
    { name: 'Trash', icon: Trash2, className: 'text-red-500 fill-red-500', href: '/dashboard/trash' },
    { name: 'Settings', icon: Settings, href: '/dashboard/settings' },
];

export default function Sidebar() {
    return (
        <aside className="hidden md:flex flex-col w-48 bg-[#1f1b3a] p-6 border-r border-purple-700">
            <div className="mb-6">
                <Link href="/dashboard" className="flex items-center gap-2">
                    <Image src="/logo.svg" alt="StoreBox" width={28} height={28} />
                    <span className="text-xl font-bold tracking-wide text-yellow-400">StoreBox</span>
                </Link>
            </div>

            <nav className="flex flex-col gap-3">
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center gap-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-purple-700/20 px-3 py-2 rounded transition"
                    >
                        <item.icon className={`w-5 h-5 ${item?.className}`} />
                        {item.name}
                    </Link>
                ))}
            </nav>

            <div className="mt-auto pt-4 text-center border-t border-purple-700">
                <p className="text-sm text-gray-400">© StoreBox.in</p>
            </div>
        </aside>
    );
}
