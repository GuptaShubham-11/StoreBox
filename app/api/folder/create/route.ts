import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, parentId = null, bodyUserId } = body;

        if (!name || typeof name !== 'string' || name.trim() === '') {
            return NextResponse.json({ error: 'Folder name is required' }, { status: 400 });
        }

        if (!bodyUserId) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
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
                return NextResponse.json({ error: 'Parent folder not found' }, { status: 404 });
            }
        }

        const folderData = {
            id: uuidv4(),
            name: name.trim(),
            path: `/folders/${bodyUserId}/${uuidv4()}`,
            size: 0,
            type: "folder",
            fileUrl: "",
            thumbnailUrl: null,
            userId: bodyUserId,
            parentId,
            isFolder: true,
            isStarred: false,
            isTrash: false,
        }

        const [newFolder] = await db
            .insert(files)
            .values(folderData)
            .returning();

        return NextResponse.json({ message: 'Folder created successfully', folder: newFolder }, { status: 200 });
    } catch (error) {
        console.error('Folder creation failed:', error);
        return NextResponse.json({ error: 'Folder creation failed' }, { status: 500 });
    }
}


