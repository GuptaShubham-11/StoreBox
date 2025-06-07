import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";


export async function POST(request: NextRequest) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
        }

        const body = await request.json();
        const { imagekit, userId: bodyUserId } = body;

        if (userId !== bodyUserId) {
            return NextResponse.json({ error: "Unauthorized user" }, { status: 403 });
        }

        if (!imagekit || !imagekit.url) {
            return NextResponse.json({ error: "Invalid data upload" }, { status: 400 });
        }

        const fileData = {
            name: imagekit.name || "Untitled",
            path: imagekit.filePath || `/storebox/${userId}/${imagekit.name}`,
            size: imagekit.size || 0,
            type: imagekit.fileType || "image",
            fileUrl: imagekit.url,
            thumbnailUrl: imagekit.thumbnailUrl || null,
            userId: userId,
            parentId: null, // Root level by default
            isFolder: false,
            isStarred: false,
            isTrash: false,
        }

        const [newFile] = await db.insert(files).values(fileData).returning();

        if (!newFile) {
            return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
        }

        return NextResponse.json(newFile);
    } catch (error) {
        console.error("Error in file upload:", error);
        return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
    }
}

