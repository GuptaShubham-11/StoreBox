import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { files } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

export async function PATCH(request: Request, props: { params: { fileId: string } }) {
    try {
        const { userId } = await auth();
        const { fileId } = await props.params;

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
        }

        if (!fileId) {
            return NextResponse.json({ error: "File ID is required" }, { status: 400 });
        }

        // Check if the file exists and belongs to the user
        const [file] = await db
            .select()
            .from(files)
            .where(
                and(
                    eq(files.id, fileId),
                    eq(files.userId, userId)
                )
            );

        if (!file) {
            return NextResponse.json({ error: "File not found or unauthorized" }, { status: 404 });
        }

        // Update the isStarred field in the database
        const [starredFile] = await db
            .update(files)
            .set({ isStarred: !file.isStarred })
            .where(eq(files.id, fileId))
            .returning();

        return NextResponse.json({ message: "File starred successfully", starredFile }, { status: 200 });
    } catch (error) {
        console.error("Error starring file:", error);
        return NextResponse.json({ error: "Failed to update file starred status" }, { status: 500 });
    }
}