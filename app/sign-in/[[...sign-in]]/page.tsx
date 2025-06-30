'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Authentication, authentication } from "@/schema/authentication";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignIn } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";
import { Lock, Mail } from "lucide-react";
import { Inter } from "next/font/google";
import { toast } from "sonner";
import Link from "next/link";


const InterFont = Inter({
    weight: "400",
    subsets: ["latin"],
});

export default function SignIn() {
    const { signIn, isLoaded, setActive } = useSignIn();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [authError, setAuthError] = useState<string | null>(null);
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
            const response = await signIn.create({
                identifier: data.email,
                password: data.password,
            });

            if (response.status === "complete") {
                await setActive({ session: response.createdSessionId });
                toast.success("Sign in successful!");
                router.push("/dashboard");
            } else {
                setAuthError("Invalid email or password. Please try again.");
            }
        } catch (error: any) {
            setAuthError(error.errors?.[0]?.message || "An error occurred. Try again.");
        } finally {
            setIsSubmitting(false);
        }
    };


    const handleGoogleSignIn = () => {
        toast.info("This feature is coming soon.",);
    };

    return (
        <div className={`min-h-screen flex items-center justify-center bg-bg px-4 ${InterFont.className}`}>
            <div className="w-full max-w-md bg-[#1f2235] p-6 rounded-xl shadow-xl text-txt">
                <h2 className="text-3xl font-semibold text-center mb-2">Welcome To <span className="text-pri">StoreBox</span></h2>
                <p className="text-sm text-gray-100 text-center mb-4">Your secure cloud space.</p>

                <Separator className="mb-4" />


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
                                Signing in
                            </span>
                        ) : "Sign In"}
                    </Button>
                </form>

                <Separator className="my-6" />

                <Button
                    type="button"
                    variant="outline"
                    onClick={handleGoogleSignIn}
                    className="w-full flex items-center justify-center gap-2 cursor-pointer text-white hover:text-black bg-transparent hover:bg-gray-100"
                >
                    Sign In with Google
                </Button>

                <p className="text-sm text-gray-100 text-center mt-4">
                    Don&apos;t have an account?{" "}
                    <Link href="/sign-up" className="text-pri hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}
