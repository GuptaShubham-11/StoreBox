'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { Authentication, authentication } from "@/schema/authentication";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUp } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";
import { CheckCircle, Lock, Mail } from "lucide-react";
import { Inter } from "next/font/google";
import { toast } from "sonner";
import Link from "next/link";


const InterFont = Inter({
    weight: "400",
    subsets: ["latin"],
});

export default function SignUp() {
    const { signUp, isLoaded, setActive } = useSignUp();
    const [isVerifying, setIsVerifying] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [authError, setAuthError] = useState<string | null>(null);
    const [verificationCode, setVerificationCode] = useState('');
    const [verificationError, setVerificationError] = useState<string | null>(null);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Authentication>({
        resolver: zodResolver(authentication),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: Authentication) => {
        if (!isLoaded) return;
        setIsSubmitting(true);
        setAuthError(null);

        try {
            await signUp.create({
                emailAddress: data.email,
                password: data.password,
            });

            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
            toast.success("Check your email for a verification code.");
            setIsVerifying(true);
        } catch (error: any) {
            setAuthError(error.errors?.[0]?.message || "An error occurred. Try again.");
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
            const result = await signUp.attemptEmailAddressVerification({
                code: verificationCode,
            });

            if (result.status === "complete") {
                await setActive({ session: result.createdSessionId });
                toast.success("Verification successful!");
                router.push("/dashboard");
            } else {
                setVerificationError("Invalid code. Please try again.");
            }
        } catch (error: any) {
            setVerificationError(error.errors?.[0]?.message || "Verification failed.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleGoogleSignUp = () => {
        toast.info("This feature is coming soon.",);
    };

    return (
        <div className={`min-h-screen flex items-center justify-center bg-bg px-4 ${InterFont.className}`}>
            <div className="w-full max-w-md bg-[#1f2235] p-6 rounded-xl shadow-xl text-txt">
                <h2 className="text-3xl font-semibold text-center mb-2">Join <span className="text-pri">StoreBox</span></h2>
                <p className="text-sm text-gray-100 text-center mb-4">Sign up & start uploading files in seconds 🚀</p>

                <Separator className="mb-4" />

                {!isVerifying ? (
                    <>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                            {/* Email Field */}
                            <div>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-sec" size={18} />
                                    <Input
                                        {...register("email")}
                                        placeholder="Email"
                                        type="email"
                                        className="pl-10 bg-[#1a1a2e] text-txt border border-sec focus:border-pri focus:ring-1 focus:ring-pri"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-sec" size={18} />
                                    <Input
                                        {...register("password")}
                                        placeholder="Password"
                                        type="password"
                                        className="pl-10 bg-[#1a1a2e] text-txt border border-sec focus:border-pri focus:ring-1 focus:ring-pri"
                                    />
                                </div>
                                {errors.password && (
                                    <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
                                )}
                            </div>

                            <div id="clerk-captcha" className="w-full"></div>

                            {/* Auth Error */}
                            {authError && (
                                <p className="text-red-500 text-sm mt-1">{authError}</p>
                            )}

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-acc text-white hover:bg-acc/80 transition cursor-pointer"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <Spinner />
                                        Signing Up
                                    </span>
                                ) : "Sign Up"}
                            </Button>
                        </form>

                        <Separator className="my-6" />

                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleGoogleSignUp}
                            className="w-full flex items-center justify-center gap-2 cursor-pointer text-white hover:text-black bg-transparent hover:bg-gray-100"
                        >
                            Sign Up with Google
                        </Button>

                        <p className="text-sm text-center text-gray-400 mt-4">
                            Already have an account?{" "}
                            <Link href="/sign-in" className="text-pri hover:underline">
                                Sign In
                            </Link>
                        </p>
                    </>
                ) : (
                    <form onSubmit={handleVerificationSubmit} className="space-y-4">
                        <h3 className="text-center text-lg font-medium">Enter the 6-digit code sent to your email</h3>

                        <div className="flex justify-center items-center">
                            <InputOTP
                                maxLength={6}
                                value={verificationCode}
                                onChange={setVerificationCode}
                            >
                                <InputOTPGroup>
                                    {[...Array(6)].map((_, i) => (
                                        <InputOTPSlot
                                            key={i}
                                            index={i}
                                            className="ml-0 border-l-1 rounded sm:ml-3"
                                        />
                                    ))}
                                </InputOTPGroup>
                            </InputOTP>
                        </div>

                        {verificationError && <p className="text-red-400 text-sm">{verificationError}</p>}

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-acc text-white hover:bg-acc/80 transition cursor-pointer"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center gap-2">
                                    <Spinner />
                                    Verifying...
                                </span>
                            ) : "Verify & Continue"}
                        </Button>
                    </form>
                )}

                {isVerifying && (
                    <div className="text-center mt-4 text-green-400 flex items-center justify-center gap-2">
                        <CheckCircle size={18} /> Verification code sent to your email
                    </div>
                )}
            </div>
        </div>
    );
}
