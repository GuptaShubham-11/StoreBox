'use client';

import { useSignIn } from '@clerk/nextjs';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { signInSchema } from '@/schemas/signInSchema';

import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { Card, CardBody, CardHeader, CardFooter } from '@heroui/card';
import { Divider } from '@heroui/divider';

export default function SignInForm() {
    const { signIn, isLoaded, setActive } = useSignIn();
    const [authError, setAuthError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            identifier: '',
            password: '',
        },
    });

    const onSubmit = async (data: z.infer<typeof signInSchema>) => {
        if (!isLoaded) return;

        setIsSubmitting(true);
        setAuthError(null);

        try {
            const result = await signIn.create({
                identifier: data.identifier,
                password: data.password,
            });

            if (result.status === 'complete') {
                await setActive({ session: result.createdSessionId });
                router.push('/dashboard');
            } else {
                setAuthError('Unexpected sign-in status. Please try again.');
            }
        } catch (error: any) {
            console.error('Sign in error:', error);
            setAuthError(error.errors?.[0]?.message || 'Invalid credentials. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <Card className="bg-gray-800 border border-gray-700 max-w-md w-full p-6 rounded-xl shadow-xl">
                <CardHeader className="flex flex-col items-center mb-4">
                    <h2 className="text-2xl font-bold text-white">Welcome back</h2>
                    <p className="text-sm text-gray-400 mt-1">Login to continue 🔐</p>
                </CardHeader>

                <Divider className="my-4" />

                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardBody className="space-y-5">
                        <div className="space-y-2">
                            <label htmlFor="identifier" className="text-sm text-gray-300 font-medium">
                                Email
                            </label>
                            <Input
                                id="identifier"
                                type="text"
                                placeholder="you@example.com"
                                {...register('identifier')}
                                errorMessage={errors.identifier?.message}
                            />
                            {errors.identifier && (
                                <p className="text-yellow-300 text-sm">{errors.identifier.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm text-gray-300 font-medium">
                                Password
                            </label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="********"
                                {...register('password')}
                                errorMessage={errors.password?.message}
                            />
                            {errors.password && (
                                <p className="text-yellow-300 text-sm">{errors.password.message}</p>
                            )}
                        </div>

                        {authError && (
                            <p className="text-yellow-300 text-sm text-center">{authError}</p>
                        )}

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-2 rounded cursor-pointer font-semibold bg-purple-600 hover:bg-purple-700 text-white"
                        >
                            {isSubmitting ? 'Signing in...' : 'Login'}
                        </Button>
                    </CardBody>

                    <CardFooter className="mt-4 flex flex-col gap-3">
                        <p className="text-sm text-gray-400 text-center">
                            Don't have an account?{' '}
                            <a href="/sign-up" className="text-yellow-500 font-semibold hover:underline">
                                Register
                            </a>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
