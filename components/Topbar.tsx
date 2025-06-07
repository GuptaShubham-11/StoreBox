'use client';

import { Bell, Upload, UserCircle, ArrowLeft } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { UploadBox } from './filePage/UploadBox';

export default function Topbar() {
    const pathname = usePathname();
    const [isUpload, setIsUpload] = useState(false);

    const getNameFromPath = (path: string) => {
        const parts = path
            .split('/')
            .filter(Boolean)
            .map(part => part.charAt(0).toUpperCase() + part.slice(1));

        return parts.join(' / ');
    };

    const NavigatingSection = getNameFromPath(pathname);

    return (
        <>
            <header className="flex items-center justify-between p-4 bg-[#1f1b3a] border-b border-purple-700">
                <h2 className="text-xl font-semibold text-white">{NavigatingSection}</h2>

                <div className="flex items-center gap-4">
                    <Bell className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer" />
                    <UserCircle className="w-8 h-8 text-white cursor-pointer" />
                </div>
            </header>

            {isUpload && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="relative w-full max-w-3xl p-6 bg-[#1f1b3a] border border-purple-700 rounded-xl shadow-xl">
                        <button
                            onClick={() => setIsUpload(false)}
                            className="absolute top-4 left-2 text-gray-300 hover:text-white"
                            aria-label="Close upload modal"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </button>

                        <UploadBox onUpload={() => setIsUpload(false)} />
                    </div>
                </div>
            )}
        </>
    );
}
