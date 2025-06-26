import ImageKit from "imagekit";
import { NextResponse } from "next/server";

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT as string,
});

export function GET() {
    try {
        const getAuthenticatedParameters = imagekit.getAuthenticationParameters();
        return NextResponse.json(getAuthenticatedParameters, { status: 200 });
    } catch (error) {
        console.error("ImageKit Get Auth Params Failed: ", error);
        return NextResponse.json({
            error: "ImageKit Get Auth Params Failed!"
        }, { status: 500 });
    }
}

