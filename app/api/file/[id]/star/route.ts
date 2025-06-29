import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { and, eq, ne } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, props: { params: { id: string } }) {
    try {

        const fileId = props.params.id;
        const body = await req.json();
        const { bodyUserId } = body;

        if (!fileId) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        if (!bodyUserId) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        const [file] = await db
            .select()
            .from(files)
            .where(
                and(
                    eq(files.id, fileId),
                    eq(files.userId, bodyUserId)
                )
            );

        if (!file) {
            return NextResponse.json({ error: "File not found" }, { status: 404 });
        }

        const newStarredStatus = !file.isStarred;

        await db
            .update(files)
            .set({ isStarred: newStarredStatus })
            .where(
                and(
                    eq(files.id, fileId),
                    eq(files.userId, bodyUserId)
                )
            );

        return NextResponse.json({ message: newStarredStatus ? "File starred successfully" : "File unstarred successfully" }, { status: 200 });
    } catch (error) {
        console.error("Star file failed: ", error);
        return NextResponse.json({ error: "Star file failed!" }, { status: 500 });
    }
}
