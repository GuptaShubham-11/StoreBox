import { Github, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-[#121022] border-t border-gray-800 py-8 px-6 text-gray-400">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                {/* Brand */}
                <div className="text-yellow-400 font-bold text-xl">
                    StoreBox
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-wrap gap-6 text-sm">
                    <a href="/" className="hover:text-yellow-400 transition">
                        Home
                    </a>
                    <a href="/features" className="hover:text-yellow-400 transition">
                        Features
                    </a>
                    <a href="/pricing" className="hover:text-yellow-400 transition">
                        Pricing
                    </a>
                    <a href="/about" className="hover:text-yellow-400 transition">
                        About
                    </a>
                    <a href="/contact" className="hover:text-yellow-400 transition">
                        Contact
                    </a>
                </nav>

                {/* Social Icons */}
                <div className="flex gap-6 text-lg text-gray-400">
                    <a
                        href="https://github.com/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className="hover:text-yellow-400 transition"
                    >
                        <Github />
                    </a>
                    <a
                        href="https://linkedin.com/in/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="hover:text-yellow-400 transition"
                    >
                        <Linkedin />
                    </a>
                    <a
                        href="https://twitter.com/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Twitter"
                        className="hover:text-yellow-400 transition"
                    >
                        <Twitter />
                    </a>
                </div>
            </div>

            {/* Copyright */}
            <p className="text-center text-xs mt-6 text-gray-600">
                &copy; {new Date().getFullYear()} StoreBox. All rights reserved.
            </p>
        </footer>
    );
}
