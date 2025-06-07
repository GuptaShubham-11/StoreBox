'use client';

import React, { useState } from 'react';

interface NamePromptModalProps {
    isOpen: boolean;
    title: string;
    onClose: () => void;
    onSubmit: (name: string) => void;
}

export const NamePromptModal: React.FC<NamePromptModalProps> = ({
    isOpen,
    title,
    onClose,
    onSubmit,
}) => {
    const [name, setName] = useState('');

    const handleSubmit = () => {
        if (name.trim()) {
            onSubmit(name.trim());
            setName('');
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-purple-300 p-6 rounded shadow-md w-[90%] max-w-sm">
                <h3 className="text-lg font-semibold mb-4 text-black">{title}</h3>
                <input
                    className="w-full px-3 py-2 border-2 rounded mb-4 text-gray-800 outline-none "
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                    autoFocus
                />
                <div className="flex justify-end space-x-2">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-600 rounded">
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
};
