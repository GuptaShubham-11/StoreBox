'use client';

import { ContextMenu } from '@/components/filePage/ContextMenu';
import { FileCard } from '@/components/filePage/FileCard';
import { NamePromptModal } from '@/components/filePage/NamePromptModal';
import { UploadBox } from '@/components/filePage/UploadBox';
import Layout from '@/components/Layout';
import { useRef, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';

export default function MyFilesSection() {
    const { user } = useUser();

    const [menuVisible, setMenuVisible] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState<'file' | 'folder' | null>(null);
    const [createdFileName, setCreatedFileName] = useState<string | null>(null);
    const [pendingUpload, setPendingUpload] = useState<boolean>(false);

    const longPressTimer = useRef<NodeJS.Timeout | null>(null);

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        setMenuPosition({ x: e.clientX, y: e.clientY });
        setMenuVisible(true);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        longPressTimer.current = setTimeout(() => {
            const touch = e.touches[0];
            setMenuPosition({ x: touch.clientX, y: touch.clientY });
            setMenuVisible(true);
        }, 600);
    };

    const handleTouchEnd = () => {
        if (longPressTimer.current) clearTimeout(longPressTimer.current);
    };

    const handleCreate = async (name: string) => {
        if (!user) return;

        if (modalType === 'folder') {

            try {
                const res = await axios.post('/api/folders/create', {
                    name,
                    userId: user.id,
                    parentId: null,
                });
                console.log('Folder created:', res.data);
                // Optional: refresh folder list
            } catch (error) {
                console.error('Error creating folder:', error);
            }
        }

        if (modalType === 'file') {
            setCreatedFileName(name);
            setPendingUpload(true); // Show UploadBox
        }

        setModalOpen(false);
        setModalType(null);
    };

    const openFolderModal = () => {
        setModalType('folder');
        setModalOpen(true);
        setMenuVisible(false);
    };

    const openFileModal = () => {
        setModalType('file');
        setModalOpen(true);
        setMenuVisible(false);
    };

    const handleFileUpload = (files: File[]) => {
        if (createdFileName && files.length) {
            const renamedFile = new File([files[0]], createdFileName, { type: files[0].type });
            console.log('Uploading file as:', renamedFile.name);
            // You can upload `renamedFile` to backend here.
        }
        setCreatedFileName(null);
        setPendingUpload(false);
    };

    const files = [
        {
            name: 'Project_Plan.pdf',
            size: '1.2 MB',
            type: 'application/pdf',
            date: 'June 1, 2025',
        },
        {
            name: 'Vacation.png',
            size: '3.1 MB',
            type: 'image/png',
            date: 'June 2, 2025',
        },
        {
            name: 'Backup.zip',
            size: '25 MB',
            type: 'application/zip',
            date: 'June 3, 2025',
        },
    ];

    return (
        <Layout>
            <section
                className="px-6 py-8 h-screen"
                onContextMenu={handleContextMenu}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onTouchCancel={handleTouchEnd}
            >
                <h2 className="text-xl font-bold text-white mb-6">📁 My Files</h2>

                {pendingUpload && createdFileName && (
                    <div className="mb-6">
                        <UploadBox onUpload={handleFileUpload} />
                        <p className="mt-2 text-sm text-gray-400 text-center">
                            Upload file for <span className="text-yellow-400 font-medium">{createdFileName}</span>
                        </p>
                    </div>
                )}

                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                    {files.map((file, i) => (
                        <FileCard
                            key={i}
                            fileName={file.name}
                            fileSize={file.size}
                            fileType={file.type}
                            uploadDate={file.date}
                            onDownload={() => alert(`Download ${file.name}`)}
                            onDelete={() => alert(`Delete ${file.name}`)}
                            onCopyLink={() => alert(`Link copied for ${file.name}`)}
                        />
                    ))}
                </div>

                {menuVisible && (
                    <ContextMenu
                        position={menuPosition}
                        onClose={() => setMenuVisible(false)}
                        onCreateFile={openFileModal}
                        onCreateFolder={openFolderModal}
                    />
                )}

                <NamePromptModal
                    isOpen={modalOpen}
                    title={`Create ${modalType === 'file' ? 'File' : 'Folder'}`}
                    onClose={() => setModalOpen(false)}
                    onSubmit={handleCreate}
                />
            </section>
        </Layout>
    );
}