import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import ImageKit from "imagekit";

if (!process.env.NEXT_IMAGEKIT_PUBLIC_KEY || !process.env.NEXT_IMAGEKIT_PRIVATE_KEY || !process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT) {
    throw new Error("ImageKit environment variables are not set");
}

const imagekit = new ImageKit({
    publicKey: process.env.NEXT_IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.NEXT_IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { bodyUserId } = body;

        if (!bodyUserId) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        const trashFiles = await db
            .select()
            .from(files)
            .where(
                and(
                    eq(files.userId, bodyUserId),
                    eq(files.isTrash, true)
                )
            );

        if (trashFiles.length === 0) {
            return NextResponse.json({ error: "No files found in the trash" }, { status: 404 });
        }

        const deleteResults = await Promise.allSettled(
            trashFiles.map(async (file) => {
                try {
                    if (!file.isFolder && file.path) {
                        await imagekit.deleteFile(file.imagekitId as string);
                    }
                    return { success: true, id: file.id };
                } catch (err) {
                    console.error(`ImageKit deletion failed for file ${file.id}:`, err);
                    return { success: false, id: file.id, error: err };
                }
            })
        );

        const failedDeletes = deleteResults.filter(
            (r) => r.status === "rejected" || (r.status === "fulfilled" && !r.value?.success)
        );

        // Only delete from DB if all image deletions succeeded
        if (failedDeletes.length === 0) {
            await db.delete(files).where(
                and(
                    eq(files.userId, bodyUserId),
                    eq(files.isTrash, true)
                )
            );
        }

        return NextResponse.json(
            failedDeletes.length > 0
                ? {
                    message: "Some files could not be deleted from ImageKit",
                    failed: failedDeletes.map((f: any) => f.reason || f.value),
                }
                : { message: "Trash emptied successfully" },
            { status: failedDeletes.length > 0 ? 207 : 200 }
        );
    } catch (error) {
        console.error("Empty Trash Failed:", error);
        return NextResponse.json({ error: "Empty Trash Failed!" }, { status: 500 });
    }
}

