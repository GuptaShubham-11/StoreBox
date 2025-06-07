'use client';

import { useState } from 'react';

type FileActionsProps = {
    onDownload: () => void;
    onDelete: () => void;
    onCopyLink: () => void;
};

export function FileActions({ onDownload, onDelete, onCopyLink }: FileActionsProps) {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={() => setOpen(!open)}
                className="p-1 rounded hover:bg-gray-700"
            >
                ⋮
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-40 bg-gray-800 text-sm text-white shadow-lg rounded z-10 border border-gray-700">
                    <button onClick={() => { onCopyLink(); setOpen(false); }} className="block w-full text-left px-4 py-2 hover:bg-gray-700">🔗 Copy link</button>
                    <button onClick={() => { onDownload(); setOpen(false); }} className="block w-full text-left px-4 py-2 hover:bg-gray-700">⬇️ Download</button>
                    <button onClick={() => { onDelete(); setOpen(false); }} className="block w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700">🗑 Delete</button>
                </div>
            )}
        </div>
    );
}
