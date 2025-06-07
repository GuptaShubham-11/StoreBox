export default function CallToAction() {
    return (
        <section className="bg-gradient-to-r from-purple-700 via-purple-600 to-purple-500 py-20 px-6 text-white text-center">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-4xl font-extrabold mb-4">
                    Ready to Securely Store and Access Your Files Anytime, Anywhere?
                </h2>
                <p className="mb-8 text-yellow-300 text-lg">
                    Join thousands who trust StoreBox for safe, reliable cloud storage.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <a
                        href="/sign-up"
                        className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-8 rounded-lg shadow-lg transition"
                    >
                        Get Started
                    </a>
                    <a
                        href="#features"
                        className="inline-block border border-yellow-400 hover:border-yellow-500 text-yellow-400 hover:text-yellow-500 font-semibold py-3 px-8 rounded-lg transition"
                    >
                        Learn More
                    </a>
                </div>
            </div>
        </section>
    );
}
