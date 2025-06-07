'use client';

import { useState } from 'react';

const faqs = [
    {
        question: 'Is StoreBox free to use?',
        answer: 'Yes! StoreBox offers a free tier with limited storage. You can upgrade anytime for more features.',
    },
    {
        question: 'How secure is my data?',
        answer:
            'Your files are encrypted and stored securely. We use industry-standard security practices to keep your data safe.',
    },
    {
        question: 'Can I access my files from any device?',
        answer: 'Absolutely! StoreBox is cloud-based, so you can access your files from any device with internet access.',
    },
    {
        question: 'What file types are supported?',
        answer: 'StoreBox supports all common file types including documents, images, videos, and more.',
    },
    {
        question: 'How do I reset my password?',
        answer:
            'You can reset your password by clicking the "Forgot password?" link on the sign-in page and following the instructions.',
    },
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-16 px-6 bg-[#121022] text-white max-w-5xl mx-auto">
            <h2 className="text-3xl font-extrabold text-center mb-10">Frequently Asked Questions</h2>
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="border border-gray-700 rounded-md overflow-hidden"
                    >
                        <button
                            className="w-full flex justify-between items-center px-6 py-4 text-left text-yellow-400 font-semibold hover:bg-gray-800 transition"
                            onClick={() => toggle(index)}
                            aria-expanded={openIndex === index}
                            aria-controls={`faq-answer-${index}`}
                            id={`faq-question-${index}`}
                        >
                            <span>{faq.question}</span>
                            <span className="ml-4 text-2xl">{openIndex === index ? '−' : '+'}</span>
                        </button>
                        <div
                            id={`faq-answer-${index}`}
                            role="region"
                            aria-labelledby={`faq-question-${index}`}
                            className={`px-6 py-4 bg-[#1e1b3c] text-gray-300 transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                                }`}
                        >
                            <p>{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
