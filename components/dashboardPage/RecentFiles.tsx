'use client';

import { File, Image, Video, MoreVertical } from 'lucide-react';

const recentFiles = [
    { name: 'ProjectPlan.pdf', type: 'document', size: '2.1MB', uploaded: '2 days ago' },
    { name: 'ProfilePic.png', type: 'image', size: '580KB', uploaded: '5 hours ago' },
    { name: 'DemoVideo.mp4', type: 'video', size: '14.2MB', uploaded: '1 day ago' },
    { name: 'Invoice2025.pdf', type: 'document', size: '1.2MB', uploaded: '3 days ago' },
];

const getFileIcon = (type: string) => {
    switch (type) {
        case 'image':
            return <Image size={20} />;
        case 'video':
            return <Video size={20} />;
        case 'document':
        default:
            return <File size={20} />;
    }
};

const RecentFiles = () => {
    return (
        <div className="bg-[#1e1b31] text-white rounded-xl p-6 shadow-lg w-full">
            <h2 className="text-xl font-semibold mb-4">📂 Recent Files</h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {recentFiles.map((file, idx) => (
                    <div
                        key={idx}
                        className="bg-[#2a2744] rounded-lg p-4 flex justify-between items-start hover:bg-[#3a3756] transition"
                    >
                        <div className="flex gap-3">
                            <div className="mt-1 text-purple-400">{getFileIcon(file.type)}</div>
                            <div>
                                <p className="font-medium">{file.name}</p>
                                <p className="text-sm text-gray-400">{file.size} · {file.uploaded}</p>
                            </div>
                        </div>
                        <MoreVertical className="text-gray-400 hover:text-white cursor-pointer" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentFiles;
