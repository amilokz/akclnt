import React from 'react';
import { Link } from 'react-router-dom';

const testimonials = [
    {
        quote: "They understood exactly what we needed without endless back-and-forth. Our inventory system just works.",
        name: 'Retail Business Owner',
        role: 'POS System Client',
    },
    {
        quote: "Communication was direct and honest throughout. No surprises on timeline or budget.",
        name: 'Training Institute Director',
        role: 'Web Platform Client',
    },
    {
        quote: "They didn't just build what we asked for — they pointed out a better way to structure it.",
        name: 'Real Estate Firm',
        role: 'Accounting Software Client',
    },
];

export default function Testimonials() {
    return (
        <div className="max-w-6xl mx-auto px-6 py-20">
            <span className="font-mono text-xs uppercase tracking-wider text-signal">
                Client feedback
            </span>
            <h1 className="font-display text-4xl font-semibold text-ink mt-3 max-w-xl">
                What clients say after working with us.
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
                {testimonials.map((t, i) => (
                    <div key={i} className="border border-mist rounded-xl p-8 flex flex-col">
                        <span className="font-mono text-3xl text-signal mb-4">"</span>
                        <p className="text-ink leading-relaxed flex-1">{t.quote}</p>
                        <div className="mt-6 pt-6 border-t border-mist">
                            <p className="font-display font-semibold text-ink text-sm">{t.name}</p>
                            <p className="font-mono text-xs text-graphite mt-1">{t.role}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-signal-dim rounded-2xl p-10 md:p-14 mt-20 text-center">
                <h2 className="font-display text-2xl md:text-3xl font-semibold text-ink max-w-md mx-auto">
                    Ready to become our next success story?
                </h2>
                <Link
                    to="/contact"
                    className="inline-block mt-6 bg-ink text-paper px-6 py-3 rounded-lg font-medium hover:bg-signal transition"
                >
                    Start a Project
                </Link>
            </div>
        </div>
    );
}