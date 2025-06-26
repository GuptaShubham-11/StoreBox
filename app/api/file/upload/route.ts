import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import ImageKit from "imagekit";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';

if (!process.env.NEXT_IMAGEKIT_PUBLIC_KEY || !process.env.NEXT_IMAGEKIT_PRIVATE_KEY || !process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT) {
    throw new Error('ImageKit environment variables are not set');
}

const imagekit = new ImageKit({
    publicKey: process.env.NEXT_IMAGEKIT_PUBLIC_KEY as string,
    privateKey: process.env.NEXT_IMAGEKIT_PRIVATE_KEY as string,
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT as string,
});

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;
        const bodyUserId = formData.get("bodyUserId") as string | null;
        const parentId = formData.get("parentId") as string | null;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        if (!bodyUserId) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        if (parentId) {
            const [parentFolder] = await db
                .select()
                .from(files)
                .where(
                    and(
                        eq(files.id, parentId),
                        eq(files.userId, bodyUserId),
                        eq(files.isFolder, true)
                    )
                );

            if (!parentFolder) {
                return NextResponse.json({ error: "Parent folder not found" }, { status: 404 });
            }
        }

        if (!file.type.startsWith("image/") && !file.type.startsWith("video/") && !file.type.startsWith("application/pdf")) {
            return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
        }

        const buffer = await file.arrayBuffer();
        const fileBuffer = Buffer.from(buffer);

        const originalFileName = file.name || `Untitled ${Date.now().toLocaleString()}`;
        const fileExtension = originalFileName.split('.').pop() || '';
        const uniqueFileName = `${uuidv4()}.${fileExtension}`;

        const folderPath = parentId ? `/storebox/${bodyUserId}/folders/${parentId}`
            : `/storebox/${bodyUserId}`;

        const uploadResponse = await imagekit.upload({
            file: fileBuffer,
            fileName: uniqueFileName,
            folder: folderPath,
            useUniqueFileName: true
        });

        if (!uploadResponse) {
            return NextResponse.json({ error: "File upload failed" }, { status: 500 });
        }

        const fileData = {
            name: originalFileName,
            path: uploadResponse.filePath,
            imagekitId: uploadResponse.fileId,
            size: file.size,
            type: file.type,
            fileUrl: uploadResponse.url,
            thumbnailUrl: uploadResponse.thumbnailUrl || null,
            userId: bodyUserId,
            parentId: parentId,
            isFolder: false,
            isStarred: false,
            isTrash: false,
        };

        const [newFile] = await db
            .insert(files)
            .values(fileData)
            .returning();

        return NextResponse.json({ message: "File uploaded successfully", file: newFile }, { status: 200 });

    } catch (error) {
        console.error("File upload failed: ", error);
        return NextResponse.json({ error: "File upload failed!" }, { status: 500 });
    }
}