const steps = [
    {
        title: '1. Sign Up Instantly',
        description: 'Create your free account in seconds with secure Clerk authentication.',
        icon: '📝',
    },
    {
        title: '2. Upload Your Files',
        description: 'Drag and drop or click to upload — we support all file types, large or small.',
        icon: '📁',
    },
    {
        title: '3. Access Anywhere',
        description: 'Your files stay with you — on mobile, desktop, or anywhere with a browser.',
        icon: '🌍',
    },
];

export default function HowItWorksSection() {
    return (
        <section id="how-it-works" className="bg-[#0f0c29] py-24 px-6 text-white">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                    How <span className="text-yellow-400">StoreBox</span> Works
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto mb-12 text-lg">
                    A simple 3-step process to store, sync, and access your files — from anywhere, anytime.
                </p>

                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center text-center p-6 bg-[#1f1b3a] rounded-xl border border-gray-700 hover:shadow-lg transition duration-200"
                        >
                            <div className="text-5xl mb-4">{step.icon}</div>
                            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                            <p className="text-gray-300 text-sm">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
