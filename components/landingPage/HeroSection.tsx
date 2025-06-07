import Link from "next/link";

export default function HeroSection() {
    return (
        <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-white px-6 py-24 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] overflow-hidden">
            {/* Glowing Background Elements */}
            <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-purple-600 opacity-20 blur-[160px] rounded-full"></div>
            <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-yellow-400 opacity-10 blur-[120px] rounded-full"></div>

            {/* Text Content */}
            <div className="relative z-10 max-w-3xl text-center">
                <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight mb-6 drop-shadow-lg">
                    Effortless Cloud Storage
                    <br />
                    <span className="text-yellow-400">Designed for Developers</span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10">
                    StoreBox lets you store, sync, and share files securely with blazing speed and full control. Accessible from anywhere.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/sign-up"
                        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 shadow-lg"
                    >
                        Get Started For Free
                    </Link>
                </div>
            </div>

            {/* Optional Decorative Elements */}
            <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)] pointer-events-none z-0" />
        </section>
    );
}
