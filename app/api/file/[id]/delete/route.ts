import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { and, eq, inArray } from "drizzle-orm";
import ImageKit from "imagekit";
import { NextRequest, NextResponse } from "next/server";

if (!process.env.NEXT_IMAGEKIT_PUBLIC_KEY || !process.env.NEXT_IMAGEKIT_PRIVATE_KEY || !process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT) {
    throw new Error("ImageKit environment variables are not set");
}

const imagekit = new ImageKit({
    publicKey: process.env.NEXT_IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.NEXT_IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
});

export async function DELETE(req: NextRequest, props: { params: { id: string } }) {
    try {
        const fileOrFolderId = props.params.id;
        const body = await req.json();
        const { bodyUserId } = body;

        if (!fileOrFolderId) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        if (!bodyUserId) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        // Fetch target (file or folder)
        const [target] = await db
            .select()
            .from(files)
            .where(
                and(
                    eq(files.id, fileOrFolderId),
                    eq(files.isTrash, true),
                    eq(files.userId, bodyUserId)
                )
            );

        if (!target) {
            return NextResponse.json({ error: "File or Folder not found in trash" }, { status: 404 });
        }

        let toDelete = [target];

        // If it's a folder, get all nested items recursively
        if (target.isFolder) {
            const nestedItems = await getAllNestedFilesAndFolders(fileOrFolderId, bodyUserId);
            toDelete = [target, ...nestedItems];
        }

        // Delete all ImageKit files (non-folder with imagekitId)
        const imagekitResults = await Promise.allSettled(
            toDelete
                .filter((file) => !file.isFolder && file.imagekitId)
                .map((file) =>
                    imagekit.deleteFile(file.imagekitId!)
                )
        );

        const failedImagekit = imagekitResults.filter(
            (r) => r.status === "rejected"
        );

        if (failedImagekit.length > 0) {
            return NextResponse.json({
                message: "Some files could not be deleted from ImageKit",
                failed: failedImagekit.map((f) => (f as PromiseRejectedResult).reason),
            }, { status: 500 });
        }

        // Delete all from database
        await db.delete(files).where(inArray(files.id, toDelete.map((f) => f.id)));

        return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });

    } catch (error) {
        console.error("Delete file failed:", error);
        return NextResponse.json({ error: "Delete file failed" }, { status: 500 });
    }
}

// Recursively get all trashed children of a folder
async function getAllNestedFilesAndFolders(folderId: string, userId: string) {
    const allItems: typeof files.$inferSelect[] = [];

    async function recurse(currentId: string) {
        const children = await db
            .select()
            .from(files)
            .where(
                and(
                    eq(files.parentId, currentId),
                    eq(files.userId, userId),
                    eq(files.isTrash, true)
                )
            );

        for (const child of children) {
            allItems.push(child);
            if (child.isFolder) {
                await recurse(child.id);
            }
        }
    }

    await recurse(folderId);
    return allItems;
}
