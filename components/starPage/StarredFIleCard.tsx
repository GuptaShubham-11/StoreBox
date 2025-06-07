type StarredFileCardProps = {
    fileName: string;
    fileType: string;
    fileSize: string;
    uploadDate: string;
    onDownload: () => void;
    onUnstar: () => void;
    onCopyLink: () => void;
};

export function StarredFileCard({
    fileName,
    fileType,
    fileSize,
    uploadDate,
    onDownload,
    onUnstar,
    onCopyLink,
}: StarredFileCardProps) {
    const getFileIcon = (type: string) => {
        if (type.includes('image')) return '🖼️';
        if (type.includes('pdf')) return '📄';
        if (type.includes('zip')) return '🗜️';
        if (type.includes('video')) return '🎞️';
        return '📁';
    };

    return (
        <div className="relative bg-[#1e1b2e] border border-yellow-500/40 rounded-xl p-4 shadow-lg hover:shadow-xl transition">
            <div className="absolute top-2 right-2">
                <button
                    onClick={onUnstar}
                    title="Unstar"
                    className="text-yellow-400 text-lg hover:text-yellow-300"
                >
                    ★
                </button>
            </div>

            <div className="flex items-start justify-between">
                <div className="text-3xl">{getFileIcon(fileType)}</div>
            </div>

            <div className="mt-4 space-y-1">
                <h3 className="font-semibold text-sm text-yellow-300 truncate">{fileName}</h3>
                <p className="text-gray-400 text-xs">{fileSize} • {fileType}</p>
                <p className="text-gray-500 text-xs">Uploaded: {uploadDate}</p>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
                <button onClick={onCopyLink} className="hover:text-yellow-300">🔗 Copy</button>
                <button onClick={onDownload} className="hover:text-yellow-300">⬇️ Download</button>
            </div>
        </div>
    );
}
