'use client';

import { FileImageIcon, FolderSymlink } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

type ContextMenuProps = {
    position: { x: number; y: number };
    onClose: () => void;
    onCreateFile: () => void;
    onCreateFolder: () => void;
};

export const ContextMenu: React.FC<ContextMenuProps> = ({
    position,
    onClose,
    onCreateFile,
    onCreateFolder,
}) => {
    const menuRef = useRef<HTMLDivElement>(null);
    const [adjustedPosition, setAdjustedPosition] = useState(position);

    useEffect(() => {
        const menuWidth = 200; // Estimated width
        const menuHeight = 100; // Estimated height
        const padding = 8;

        const { innerWidth, innerHeight } = window;

        let x = position.x;
        let y = position.y;

        if (x + menuWidth + padding > innerWidth) {
            x = innerWidth - menuWidth - padding;
        }
        if (y + menuHeight + padding > innerHeight) {
            y = innerHeight - menuHeight - padding;
        }

        setAdjustedPosition({ x, y });
    }, [position]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                onClose();
            }
        };

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [onClose]);

    return (
        <div
            ref={menuRef}
            className="absolute z-50 w-48 bg-[#2b225d] border border-purple-700 rounded-md shadow-lg text-white"
            style={{
                left: `${adjustedPosition.x}px`,
                top: `${adjustedPosition.y}px`,
            }}
        >
            <button
                onClick={() => {
                    onCreateFile();
                    onClose();
                }}
                className="w-full text-left px-4 py-2 hover:bg-purple-600 flex items-center gap-2"
            >
                <FileImageIcon className="w-5 h-5" /> Create File
            </button>
            <button
                onClick={() => {
                    onCreateFolder();
                    onClose();
                }}
                className="w-full text-left px-4 py-2 hover:bg-purple-600 flex items-center gap-2"
            >
                <FolderSymlink className="w-5 h-5" /> Create Folder
            </button>
        </div>
    );
};
