'use client';

import { useRef, useState } from 'react';

type UploadBoxProps = {
    onUpload: (files: File[]) => void;
    fileNameOverride?: string; // Optional name override (e.g., when creating a file)
};

export function UploadBox({ onUpload, fileNameOverride }: UploadBoxProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    const handleFiles = (files: FileList | null) => {
        if (!files || files.length === 0) return;

        let fileArray = Array.from(files);

        // If a file name override is provided, rename the first file
        if (fileNameOverride) {
            const file = fileArray[0];
            const renamedFile = new File([file], fileNameOverride, { type: file.type });
            fileArray = [renamedFile];
        }

        setSelectedFiles(fileArray);
        onUpload(fileArray);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        handleFiles(e.dataTransfer.files);
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleFiles(e.target.files);
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-6 bg-gray-900 border-2 border-dashed border-gray-600 rounded-xl">
            <div
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="cursor-pointer flex flex-col items-center justify-center py-16 text-center text-gray-400 hover:bg-gray-800 transition rounded-xl"
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple={!fileNameOverride} // Only allow 1 file if overriding name
                    hidden
                    onChange={handleFileInputChange}
                />
                <span className="text-4xl mb-2">📁</span>
                <p className="font-medium text-white">Drag & Drop files here or click to browse</p>
                <p className="text-xs text-gray-500 mt-1">
                    Accepted: All file types, max 100MB
                </p>
            </div>

            {selectedFiles.length > 0 && (
                <div className="mt-6 space-y-2 text-sm text-gray-300">
                    <p className="text-yellow-400 font-semibold">Files Selected:</p>
                    <ul className="list-disc list-inside space-y-1">
                        {selectedFiles.map((file, i) => (
                            <li key={i}>
                                {file.name}{' '}
                                <span className="text-gray-500 text-xs">
                                    ({(file.size / 1024 / 1024).toFixed(2)} MB)
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
