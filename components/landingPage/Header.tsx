'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Navbar() {

    return (
        <motion.nav
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 60 }}
            className="w-full fixed top-0 left-0 z-50 backdrop-blur-md bg-gradient-to-br from-[#0f0c29]/80 via-[#302b63]/80 to-[#24243e]/80 shadow-md"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-yellow-400 text-2xl font-bold tracking-wide">⚡ StoreBox</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    <Link
                        href="/sign-in"
                        className="ml-4 px-5 py-2 rounded-xl font-semibold text-white bg-purple-600 hover:bg-purple-700 transition"
                    >
                        Login
                    </Link>
                </div>

            </div>
        </motion.nav>
    );
}
