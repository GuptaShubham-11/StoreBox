// app/page.tsx or app/page.jsx

export default function Sample() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex flex-col items-center justify-center px-6 py-16 text-white">
            {/* Hero */}
            <div className="text-center max-w-2xl">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
                    Secure Your Files. <br className="hidden sm:block" />
                    Access Them Anywhere.
                </h1>
                <p className="text-lg md:text-xl text-gray-300 mb-8">
                    A modern, fast, and private cloud storage solution for developers and creators.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                    <a
                        href="/sign-up"
                        className="bg-purple-600 hover:bg-purple-700 transition-all duration-200 text-white font-semibold py-3 px-6 rounded-lg shadow-lg"
                    >
                        Get Started
                    </a>
                    <a
                        href="/sign-in"
                        className="border border-purple-500 hover:border-purple-600 text-purple-400 hover:text-purple-300 transition-all duration-200 py-3 px-6 rounded-lg"
                    >
                        Already have an account?
                    </a>
                </div>
            </div>

            {/* Glass CTA Card */}
            <div className="relative mt-16 max-w-4xl w-full bg-white/5 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl p-8">
                <h2 className="text-2xl font-bold mb-2">⚡ Fast. 🔒 Secure. 🧠 Smart.</h2>
                <p className="text-gray-300 mb-6">
                    All your files stored safely with end-to-end encryption, blazing fast uploads, and instant access from any device.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-200">
                    <div className="bg-white/10 p-4 rounded-lg">📦 10GB Free Storage</div>
                    <div className="bg-white/10 p-4 rounded-lg">🔑 Encrypted Access</div>
                    <div className="bg-white/10 p-4 rounded-lg">🌍 Global CDN</div>
                </div>
            </div>

            {/* Footer */}
            <footer className="mt-20 text-sm text-gray-500 text-center">
                © {new Date().getFullYear()} Gupta Shubham. All rights reserved.
            </footer>
        </main>
    );
}
