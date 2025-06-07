export default function Pricing() {
    return (
        <section id="pricing" className="bg-[#0f0c29] py-20 px-6 text-white">
            <div className="max-w-6xl mx-auto text-center mb-12">
                <h2 className="text-4xl font-extrabold mb-4">Choose Your Plan</h2>
                <p className="text-yellow-400 max-w-2xl mx-auto">
                    Flexible plans to fit your storage needs, from free to enterprise-level.
                </p>
            </div>

            <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-3">
                {/* Free Plan */}
                <div className="border border-gray-700 rounded-xl p-8 flex flex-col">
                    <h3 className="text-2xl font-semibold mb-2">Free</h3>
                    <p className="text-yellow-400 mb-6">$0 / month</p>
                    <ul className="mb-6 space-y-3 flex-1 text-gray-300 text-left">
                        <li>5 GB Storage</li>
                        <li>Basic File Sharing</li>
                        <li>Email Support</li>
                    </ul>
                    <button
                        className="mt-auto py-3 rounded bg-purple-600 hover:bg-purple-700 transition font-semibold"
                    >
                        Get Started
                    </button>
                </div>

                {/* Pro Plan - Highlighted */}
                <div className="border border-yellow-400 bg-purple-900 rounded-xl p-8 flex flex-col relative shadow-lg">
                    <span className="absolute top-3 right-3 bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
                        Most Popular
                    </span>
                    <h3 className="text-2xl font-semibold mb-2">Pro</h3>
                    <p className="text-yellow-400 mb-6">$9.99 / month</p>
                    <ul className="mb-6 space-y-3 flex-1 text-gray-100 text-left">
                        <li>100 GB Storage</li>
                        <li>Advanced Sharing & Permissions</li>
                        <li>Priority Support</li>
                        <li>File Versioning</li>
                    </ul>
                    <button
                        className="mt-auto py-3 rounded bg-yellow-400 hover:bg-yellow-500 transition font-semibold text-gray-900"
                    >
                        Upgrade Now
                    </button>
                </div>

                {/* Enterprise Plan */}
                <div className="border border-gray-700 rounded-xl p-8 flex flex-col">
                    <h3 className="text-2xl font-semibold mb-2">Enterprise</h3>
                    <p className="text-yellow-400 mb-6">Contact Us</p>
                    <ul className="mb-6 space-y-3 flex-1 text-gray-300 text-left">
                        <li>Unlimited Storage</li>
                        <li>Custom Integrations</li>
                        <li>Dedicated Support</li>
                        <li>SLAs & Compliance</li>
                    </ul>
                    <button
                        className="mt-auto py-3 rounded bg-purple-600 hover:bg-purple-700 transition font-semibold"
                    >
                        Contact Sales
                    </button>
                </div>
            </div>
        </section>
    );
}
