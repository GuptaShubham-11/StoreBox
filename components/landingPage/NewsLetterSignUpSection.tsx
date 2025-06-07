'use client';

import { useState } from 'react';

export default function NewsletterSignup() {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Simple email regex validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setMessage({ type: 'error', text: 'Please enter a valid email address.' });
            return;
        }

        setIsSubmitting(true);
        setMessage(null);

        try {
            // Simulate API call, replace with actual submission logic
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setMessage({ type: 'success', text: 'Thank you for subscribing!' });
            setEmail('');
        } catch {
            setMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] py-16 px-6 text-white">
            <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-extrabold mb-4">Stay Updated</h2>
                <p className="text-yellow-400 mb-8">
                    Subscribe to our newsletter to get the latest updates and offers.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <input
                        type="email"
                        placeholder="Your email address"
                        className="w-full bg-gray-300 sm:w-auto flex-grow rounded-md px-4 py-3 text-gray-900 focus:outline-none"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isSubmitting}
                        required
                    />
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-md px-6 py-3 transition"
                    >
                        {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                    </button>
                </form>

                {message && (
                    <p
                        className={`mt-4 text-sm ${message.type === 'success' ? 'text-green-400' : 'text-yellow-400'
                            }`}
                    >
                        {message.text}
                    </p>
                )}

                <p className="mt-4 text-xs text-gray-400">
                    We respect your privacy. Unsubscribe at any time.
                </p>
            </div>
        </section>
    );
}
