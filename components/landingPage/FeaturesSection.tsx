const features = [
    {
        title: 'End-to-End Encryption',
        description: 'Your files are protected with zero-knowledge encryption so only you can access them.',
        icon: '🔒',
    },
    {
        title: 'Blazing Fast Uploads',
        description: 'Optimized upload and download speed no matter your location — powered by global edge storage.',
        icon: '⚡',
    },
    {
        title: 'Developer Friendly API',
        description: 'Integrate storage easily with your apps using our clean, RESTful API and webhooks.',
        icon: '💻',
    },
    {
        title: 'Cross-Device Sync',
        description: 'Seamlessly sync and access files across your phone, tablet, and desktop.',
        icon: '🔄',
    },
];

export default function FeaturesSection() {
    return (
        <section id="features" className="w-full bg-[#1a1a2e] text-white py-24 px-6">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why Choose <span className="text-yellow-400">StoreBox?</span></h2>
                <p className="text-gray-300 mb-12 max-w-2xl mx-auto text-lg">
                    Built for speed, privacy, and simplicity — StoreBox is the cloud you’ve been waiting for.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-[#24243e] p-6 rounded-xl border border-gray-700 hover:shadow-lg transition duration-200"
                        >
                            <div className="text-4xl mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                            <p className="text-gray-400 text-sm">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
