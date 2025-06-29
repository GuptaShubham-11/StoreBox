import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { and, eq, inArray } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export default async function PATCH(req: NextRequest, props: { params: { id: string } }) {
    try {
        const fileOrFolderId = props.params.id;
        const { bodyUserId } = await req.json();

        if (!fileOrFolderId) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        if (!bodyUserId) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        const [target] = await db
            .select()
            .from(files)
            .where(
                and(
                    eq(files.id, fileOrFolderId),
                    eq(files.userId, bodyUserId)
                )
            );

        if (!target) {
            return NextResponse.json({ error: "File or Folder not found" }, { status: 404 });
        }

        const newTrashStatus = !target.isTrash;

        // IDs to update: start with target
        const idsToUpdate: string[] = [fileOrFolderId];

        if (target.isFolder) {
            const nestedItems = await getAllNestedFileIds(fileOrFolderId, bodyUserId);
            idsToUpdate.push(...nestedItems);
        }

        // Update all targeted files/folders
        await db
            .update(files)
            .set({ isTrash: newTrashStatus })
            .where(
                and(
                    inArray(files.id, idsToUpdate),
                    eq(files.userId, bodyUserId)
                )
            );

        return NextResponse.json(
            { message: newTrashStatus ? "Moved to trash" : "Restored from trash" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Move to Trash Failed: ", error);
        return NextResponse.json(
            { error: "Move to Trash Failed!" },
            { status: 500 }
        );
    }
}

// Recursively get all child file/folder IDs inside a folder
async function getAllNestedFileIds(folderId: string, userId: string): Promise<string[]> {
    const allIds: string[] = [];

    async function recurse(currentId: string) {
        const children = await db
            .select()
            .from(files)
            .where(
                and(
                    eq(files.parentId, currentId),
                    eq(files.userId, userId)
                )
            );

        for (const child of children) {
            allIds.push(child.id);
            if (child.isFolder) {
                await recurse(child.id);
            }
        }
    }

    await recurse(folderId);
    return allIds;
}
