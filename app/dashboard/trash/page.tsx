'use client';

import Layout from '@/components/Layout';
import { TrashedFileCard } from '@/components/trashPage/TrashFileCard';

export default function TrashSection() {
    const trashedFiles = [
        {
            name: 'old-project.zip',
            size: '5.3 MB',
            type: 'application/zip',
            deletedAt: 'June 2, 2025',
        },
        {
            name: 'invoice.pdf',
            size: '250 KB',
            type: 'application/pdf',
            deletedAt: 'June 1, 2025',
        },
    ];

    return (
        <Layout>
            <section className="px-6 py-8">
                <h2 className="text-xl font-bold text-red-400 mb-6">🗑️ Trash</h2>

                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                    {trashedFiles.map((file, i) => (
                        <TrashedFileCard
                            key={i}
                            fileName={file.name}
                            fileSize={file.size}
                            fileType={file.type}
                            deletedAt={file.deletedAt}
                            onRestore={() => alert(`Restored ${file.name}`)}
                            onDelete={() => alert(`Permanently deleted ${file.name}`)}
                        />
                    ))}
                </div>
            </section>
        </Layout>
    );
}
