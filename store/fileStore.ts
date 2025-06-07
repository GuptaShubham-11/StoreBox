import { create } from 'zustand';

interface File {
    id: string,
    name: string,
    path: string,
    size: number,
    type: string,
    fileUrl: string,
    thumbnailUrl: string,
    userId: string,
    parentId: string, // Root level by default
    isFolder: boolean,
    isStarred: boolean,
    isTrash: boolean
};

interface FileStoreState {
    files: File[];
    addFile: (file: File) => void;
    removeFile: (fileId: string) => void;
}

const useFileStore = create<FileStoreState>()((set) => ({
    files: [],
    addFile: (file) => {
        set((state) => ({
            files: [file, ...state.files]
        }))
    },
    removeFile: (fileId) => {
        set((state) => ({
            files: state.files.filter((f) => f.id !== fileId)
        }))
    },
    setFiles: (files: File[]) => set({ files }),
}));

export default useFileStore;