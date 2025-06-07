'use client';

import React from 'react';
import { FileText, FileImage, FileVideo, Trash2 } from 'lucide-react';

const storageUsed = 7.8; // in GB
const storageTotal = 15; // in GB
const usagePercent = (storageUsed / storageTotal) * 100;

const StorageSummary = () => {
    return (
        <div className="bg-gradient-to-br from-[#302b63] to-[#24243e] text-white rounded-xl p-6 shadow-lg w-full">
            <h2 className="text-xl font-semibold mb-4">📦 Storage Summary</h2>

            <div className="mb-4">
                <div className="flex items-center justify-between">
                    <span className="text-sm">Used: {storageUsed} GB</span>
                    <span className="text-sm">Total: {storageTotal} GB</span>
                </div>
                <div className="w-full h-3 bg-gray-700 rounded-full mt-2 overflow-hidden">
                    <div
                        className="h-full bg-purple-500 transition-all"
                        style={{ width: `${usagePercent}%` }}
                    />
                </div>
                <p className="mt-2 text-sm text-yellow-400">
                    {usagePercent.toFixed(1)}% of your storage used
                </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 text-sm">
                <div className="flex flex-col items-center gap-2">
                    <FileText size={24} />
                    <p>Documents</p>
                    <span className="text-yellow-300">24</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <FileImage size={24} />
                    <p>Images</p>
                    <span className="text-yellow-300">15</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <FileVideo size={24} />
                    <p>Videos</p>
                    <span className="text-yellow-300">8</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <Trash2 size={24} />
                    <p>Trash</p>
                    <span className="text-yellow-300">2</span>
                </div>
            </div>
        </div>
    );
};

export default StorageSummary;
