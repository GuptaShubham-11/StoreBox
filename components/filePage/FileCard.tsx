import { FileActions } from './FileAction';

type FileCardProps = {
    fileName: string;
    fileSize: string;
    fileType: string;
    uploadDate: string;
    onDownload: () => void;
    onDelete: () => void;
    onCopyLink: () => void;
};

export function FileCard({
    fileName,
    fileSize,
    fileType,
    uploadDate,
    onDownload,
    onDelete,
    onCopyLink,
}: FileCardProps) {
    const getFileIcon = (type: string) => {
        if (type.includes('image')) return '🖼️';
        if (type.includes('pdf')) return '📄';
        if (type.includes('zip')) return '🗜️';
        if (type.includes('video')) return '🎞️';
        return '📁';
    };

    return (
        <div className="bg-gray-800 text-white border border-gray-700 rounded-xl p-4 shadow hover:shadow-md transition">
            <div className="flex items-start justify-between">
                <div className="text-3xl">{getFileIcon(fileType)}</div>
                <FileActions onDownload={onDownload} onDelete={onDelete} onCopyLink={onCopyLink} />
            </div>

            <div className="mt-4 space-y-1">
                <h3 className="font-semibold text-sm truncate">{fileName}</h3>
                <p className="text-gray-400 text-xs">{fileSize} • {fileType}</p>
                <p className="text-gray-500 text-xs">Uploaded: {uploadDate}</p>
            </div>
        </div>
    );
}
