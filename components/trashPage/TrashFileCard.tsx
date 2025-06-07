type TrashedFileCardProps = {
    fileName: string;
    fileType: string;
    fileSize: string;
    deletedAt: string;
    onRestore: () => void;
    onDelete: () => void;
};

export function TrashedFileCard({
    fileName,
    fileType,
    fileSize,
    deletedAt,
    onRestore,
    onDelete,
}: TrashedFileCardProps) {
    const getFileIcon = (type: string) => {
        if (type.includes('image')) return '🖼️';
        if (type.includes('pdf')) return '📄';
        if (type.includes('zip')) return '🗜️';
        if (type.includes('video')) return '🎞️';
        return '📁';
    };

    return (
        <div className="bg-[#2a2a2a] border border-red-500/30 rounded-xl p-4 relative shadow-inner hover:shadow-lg transition">
            <div className="text-3xl opacity-50">{getFileIcon(fileType)}</div>

            <div className="mt-4 space-y-1">
                <h3 className="text-sm font-medium text-red-300 truncate">{fileName}</h3>
                <p className="text-xs text-gray-500">{fileSize} • {fileType}</p>
                <p className="text-xs text-gray-600">Deleted: {deletedAt}</p>
            </div>

            <div className="mt-4 flex justify-between text-xs">
                <button
                    onClick={onRestore}
                    className="text-green-400 hover:text-green-300 font-medium"
                >
                    ♻️ Restore
                </button>
                <button
                    onClick={onDelete}
                    className="text-red-400 hover:text-red-300 font-medium"
                >
                    ❌ Delete
                </button>
            </div>
        </div>
    );
}
