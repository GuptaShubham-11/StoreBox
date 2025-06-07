import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { files } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

export async function POST(request: Request) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
        }

        // Empty the trash by deleting all files marked as isTrash for the user
        const deletedFiles = await db
            .delete(files)
            .where(
                and(
                    eq(files.isTrash, true),
                    eq(files.userId, userId)
                )
            )
            .returning();

        if (deletedFiles.length === 0) {
            return NextResponse.json({ message: "No files in trash to empty" }, { status: 200 });
        }

        return NextResponse.json({ message: "Trash emptied successfully", deletedFiles }, { status: 200 });
    } catch (error) {
        console.error("Error emptying trash:", error);
        return NextResponse.json({ error: "Failed to empty trash" }, { status: 500 });
    }
}