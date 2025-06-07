const testimonials = [
    {
        name: 'Sara M.',
        role: 'Product Designer',
        avatar: '👩‍🎨',
        quote: 'StoreBox saved me from losing important design files. Love the fast access!',
    },
    {
        name: 'Jake L.',
        role: 'Full Stack Developer',
        avatar: '👨‍💻',
        quote: 'Super simple to use, and the speed is just incredible. Highly recommended!',
    },
    {
        name: 'Anya R.',
        role: 'Freelance Writer',
        avatar: '📝',
        quote: 'I use StoreBox every day to organize my documents — it’s like a second brain!',
    },
];

export default function TestimonialsSection() {
    return (
        <section id="testimonials" className="bg-[#0f0c29] py-24 px-6 text-white">
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                    What Our <span className="text-yellow-400">Users Say</span>
                </h2>
                <p className="text-gray-400 mb-12 max-w-xl mx-auto">
                    Real feedback from real users who rely on StoreBox every day.
                </p>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t, idx) => (
                        <div
                            key={idx}
                            className="bg-[#1f1b3a] border border-gray-700 p-6 rounded-xl text-left shadow-md hover:shadow-lg transition"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="text-4xl">{t.avatar}</div>
                                <div>
                                    <h3 className="font-semibold">{t.name}</h3>
                                    <p className="text-sm text-gray-400">{t.role}</p>
                                </div>
                            </div>
                            <p className="text-gray-300 italic">“{t.quote}”</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
