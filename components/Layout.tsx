'use client';

import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="flex h-screen overflow-hidden text-white bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-y-auto">
                <Topbar />
                <main className="flex-1 p-6">{children}</main>
            </div>
        </div>
    );
}
