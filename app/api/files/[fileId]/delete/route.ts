import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { files } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
    publicKey: process.env.NEXT_IMAGEKIT_PUBLIC_KEY || "",
    privateKey: process.env.NEXT_IMAGEKIT_PRIVATE_KEY || "",
    urlEndpoint: process.env.NEXT_IMAGEKIT_URL_ENDPOINT || "",
});

export async function DELETE(request: Request, props: { params: { fileId: string } }) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { fileId } = await props.params;

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
                    eq(files.userId, userId),

                )
            );

        if (!file) {
            return NextResponse.json({ error: "File not found or unauthorized" }, { status: 404 });
        }

        // Delete the file from the database
        await db.delete(files).where(eq(files.id, fileId));

        return NextResponse.json({ message: "File deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting file:", error);
        return NextResponse.json({ error: "Failed to delete file" }, { status: 500 });
    }
}

