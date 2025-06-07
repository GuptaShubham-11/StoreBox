'use client';

import { useForm } from 'react-hook-form';
import { useSignUp } from '@clerk/nextjs';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { signUpSchema } from '@/schemas/signUpSchema';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { Card, CardBody, CardHeader, CardFooter } from '@heroui/card';
import { Divider } from '@heroui/divider';


export default function SignUpForm() {
    const [isVerifying, setIsVerifying] = useState(false);
    const { signUp, isLoaded, setActive } = useSignUp();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [authError, setAuthError] = useState<string | null>(null);
    const [verificationCode, setVerificationCode] = useState('');
    const [verificationError, setVerificationError] = useState<string | null>(null);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: '',
            password: '',
            passwordConfirmation: '',
        },
    });

    const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
        if (!isLoaded) return;
        setIsSubmitting(true);
        setAuthError(null);

        try {
            await signUp.create({
                emailAddress: data.email,
                password: data.password,
            });

            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
            setIsVerifying(true);
        } catch (error: any) {
            setAuthError(error.errors?.[0]?.message || 'An error occurred. Try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleVerificationSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isLoaded || !signUp) return;

        setIsSubmitting(true);
        setVerificationError(null);

        try {
            const result = await signUp.attemptEmailAddressVerification({ code: verificationCode });
            console.log("SignUp result:", result);


            if (result.status === 'complete') {
                await setActive({ session: result.createdSessionId });
                router.push('/dashboard');
            } else {
                setVerificationError('Invalid code. Please try again.');
            }
        } catch (error: any) {
            setVerificationError(error.errors?.[0]?.message || 'Verification failed.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <Card className="bg-gray-800 border border-gray-700 max-w-md w-full  p-6 rounded-xl shadow-xl">
                <CardHeader className="flex flex-col items-center mb-4">
                    {!isVerifying ? (
                        <>
                            <h2 className="text-2xl font-bold text-white">Create your account</h2>
                            <p className="text-sm text-gray-400 mt-1">Start storing your files securely ✨</p>
                        </>
                    ) : (
                        <h2 className='text-2xl font-bold text-white'>Verify your email</h2>
                    )}
                </CardHeader>

                <Divider className="my-4" />

                {!isVerifying ? (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <CardBody className="space-y-5">
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm text-gray-300 font-medium">
                                    Email
                                </label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    {...register('email')}
                                    errorMessage={errors.email?.message}
                                />
                                {errors.email && <p className="text-yellow-300 text-sm">{errors.email.message}</p>}
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
                                {errors.password && <p className="text-yellow-300 text-sm">{errors.password.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="passwordConfirmation" className="text-sm text-gray-300 mb-2 font-medium">
                                    Confirm Password
                                </label>
                                <Input
                                    id="passwordConfirmation"
                                    type="password"
                                    placeholder="********"
                                    {...register('passwordConfirmation')}
                                    errorMessage={errors.passwordConfirmation?.message}
                                />
                                {errors.passwordConfirmation && (
                                    <p className="text-yellow-300 text-sm">{errors.passwordConfirmation.message}</p>
                                )}
                            </div>

                            {authError && <p className="text-yellow-300 text-sm text-center">{authError}</p>}

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-2 rounded cursor-pointer font-semibold bg-purple-600 hover:bg-purple-700 text-white"
                            >
                                {isSubmitting ? 'Creating account...' : 'Register'}
                            </Button>
                        </CardBody>


                        <CardFooter className="mt-4 flex flex-col gap-3">
                            <p className="text-sm text-gray-400 text-center">
                                Already have an account?{' '}
                                <a href="/sign-in" className="text-yellow-500 font-semibold hover:underline">
                                    Login
                                </a>
                            </p>
                        </CardFooter>
                    </form>
                ) : (
                    <form onSubmit={handleVerificationSubmit}>
                        <CardBody className="space-y-4">
                            <p className="text-sm text-gray-300">
                                We've sent a verification code to your email. Please enter it below to verify your account.
                            </p>
                            <Input
                                label="Verification Code"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                className="tracking-widest"
                            />
                            {verificationError && <p className="text-yellow-300 text-sm">{verificationError}</p>}
                        </CardBody>

                        <CardFooter className="mt-4">
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-2 rounded cursor-pointer font-semibold bg-purple-500 hover:bg-purple-600 text-white"
                            >
                                {isSubmitting ? 'Verifying...' : 'Verify Email'}
                            </Button>
                        </CardFooter>
                    </form>
                )}
            </Card>
        </div>
    );
}
