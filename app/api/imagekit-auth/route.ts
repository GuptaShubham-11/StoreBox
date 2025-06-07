import { auth } from "@clerk/nextjs/server";
import ImageKit from "imagekit";
import { NextResponse } from "next/server";

const imagekit = new ImageKit({
    publicKey: process.env.NEXT_IMAGEKIT_PUBLIC_KEY || "",
    privateKey: process.env.NEXT_IMAGEKIT_PRIVATE_KEY || "",
    urlEndpoint: process.env.NEXT_IMAGEKIT_URL_ENDPOINT || "",
});

export async function GET() {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
        }

        const authenticationParameters = imagekit.getAuthenticationParameters();

        return NextResponse.json(authenticationParameters);
    } catch (error) {
        console.error("Error generating ImageKit authentication parameters:", error);
        return NextResponse.json({ error: "Failed to generate authentication parameters" }, { status: 500 });
    }
}