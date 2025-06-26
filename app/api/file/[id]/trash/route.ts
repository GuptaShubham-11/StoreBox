import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { and, eq, or } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, props: { params: { id: string } }) {
    try {
        const fileOrFolderId = props.params.id;
        const { bodyUserId } = await req.json();

        if (!fileOrFolderId) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        if (!bodyUserId) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        // Check if the ID belongs to a folder
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

        if (target.isFolder) {
            // It's a folder — move the folder and all its contents to trash or restore
            await db
                .update(files)
                .set({ isTrash: newTrashStatus })
                .where(
                    or(
                        and(
                            eq(files.id, fileOrFolderId),
                            eq(files.userId, bodyUserId)
                        ),
                        and(
                            eq(files.parentId, fileOrFolderId),
                            eq(files.userId, bodyUserId)
                        )
                    )
                );
        } else {
            // It's a file — only update the file itself
            await db
                .update(files)
                .set({ isTrash: newTrashStatus })
                .where(
                    and(eq(files.id, fileOrFolderId), eq(files.userId, bodyUserId))
                );
        }

        return NextResponse.json({ message: newTrashStatus ? "Moved to trash" : "Restored from trash" }, { status: 200 });
    } catch (error) {
        console.error("Move to Trash Failed: ", error);
        return NextResponse.json({
            error: "Move to Trash Failed!"
        }, { status: 500 });
    }
}
