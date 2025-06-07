'use client';

import Layout from '@/components/Layout';
import { StarredFileCard } from '@/components/starPage/StarredFIleCard';

export default function StarredSection() {
    const starredFiles = [
        {
            name: 'Resume.pdf',
            size: '300 KB',
            type: 'application/pdf',
            date: 'May 28, 2025',
        },
        {
            name: 'LogoDesign.png',
            size: '2.3 MB',
            type: 'image/png',
            date: 'May 30, 2025',
        },
    ];

    return (
        <Layout>
            <section className="px-6 py-8">
                <h2 className="text-xl font-bold text-yellow-400 mb-6">⭐ Starred Files</h2>

                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                    {starredFiles.map((file, i) => (
                        <StarredFileCard
                            key={i}
                            fileName={file.name}
                            fileSize={file.size}
                            fileType={file.type}
                            uploadDate={file.date}
                            onDownload={() => alert(`Download ${file.name}`)}
                            onUnstar={() => alert(`Unstarred ${file.name}`)}
                            onCopyLink={() => alert(`Link copied for ${file.name}`)}
                        />
                    ))}
                </div>
            </section>
        </Layout>
    );
}
