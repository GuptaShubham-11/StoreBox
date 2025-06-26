import { NextRequest, NextResponse } from "next/server";
import { files } from "@/lib/db/schema";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { imagekit, bodyUserId } = body;

        if (!imagekit || !imagekit.url) {
            return NextResponse.json({
                error: "Invalid upload!"
            }, { status: 400 });
        }

        const fileData = {
            name: imagekit.name || `Untitled ${Date.now().toLocaleString()}`,
            path: imagekit.filePath || `/storebox/${bodyUserId}/${imagekit.name}`,
            size: imagekit.size || 0,
            type: imagekit.fileType || "image",
            fileUrl: imagekit.url,
            thumbnailUrl: imagekit.thumbnailUrl || null,
            userId: bodyUserId,
            parentId: null, // Root level by default
            isFolder: false,
            isStarred: false,
            isTrash: false,
        }

        const [newFile] = await db.insert(files).values(fileData).returning();

        return NextResponse.json({
            message: "File uploaded successfully",
            file: newFile
        }, { status: 200 });

    } catch (error) {
        console.error("Upload Error: ", error);
        return NextResponse.json({
            error: "Upload failed!"
        }, { status: 400 });
    }
}