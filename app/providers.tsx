'use client';

import type { ThemeProviderProps } from 'next-themes';
import { useRouter } from 'next/navigation';
import { createContext, useContext } from 'react';
import { ImageKitProvider } from 'imagekitio-next';
import { HeroUIProvider } from '@heroui/system';

export interface ProvidersProps {
    children: React.ReactNode;
    themeProps?: ThemeProviderProps
}

declare module "@react-types/shared" {
    interface RouterConfig {
        routerOptions: NonNullable<
            Parameters<ReturnType<typeof useRouter>["push"]>[1]
        >;
    }
}

export const ImagekitAuthContext = createContext<{
    authenticate: () => Promise<{
        signature: string;
        token: string;
        expire: number;
    }>;
}>({
    authenticate: async () => ({
        signature: '',
        token: '',
        expire: 0
    }),
});

export const useImagekitAuth = () => useContext(ImagekitAuthContext);

const authenticator = async () => {
    try {
        const response = await fetch('/api/imagekit-auth');
        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error fetching ImageKit authentication:', error);
        throw new Error('Failed to authenticate with ImageKit');
    }
}

export function Providers({ children, themeProps }: ProvidersProps) {
    const router = useRouter();
    return (
        <HeroUIProvider navigate={router.push}>
            <ImageKitProvider
                authenticator={authenticator}
                publicKey={process.env.NEXT_IMAGEKIT_PUBLIC_KEY || ''}
                urlEndpoint={process.env.NEXT_IMAGEKIT_URL_ENDPOINT || ''}
            >
                {children}
            </ImageKitProvider>
        </HeroUIProvider>
    );
}