import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const faqs = [
    {
        q: 'How long does a typical project take?',
        a: 'It depends on scope. A simple website usually takes 2-3 weeks, while a full business system (like a CRM or accounting platform) can take 1-3 months. We give you a clear timeline before starting.',
    },
    {
        q: 'How much does a project cost?',
        a: "Pricing depends on complexity and features. Fill out the contact form with your budget range, and we'll tell you honestly if it fits or what adjustments would make it work.",
    },
    {
        q: 'Do you offer support after launch?',
        a: 'Yes. Every project includes a support period after launch, and we offer ongoing maintenance plans for clients who want continuous updates.',
    },
    {
        q: 'Can I track my project progress?',
        a: 'Yes — once your project starts, you get access to a client dashboard where you can see progress, files, invoices, and raise support tickets directly.',
    },
    {
        q: 'What technologies do you work with?',
        a: 'Mainly Laravel and React for web applications, along with mobile development for iOS and Android. We choose the right stack based on what your project actually needs.',
    },
    {
        q: 'Do you sign a contract before starting?',
        a: "Yes, once we agree on scope and budget, we put it in writing before any work begins — so there's no ambiguity on either side.",
    },
];

function FAQItem({ faq }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="border-b border-mist py-6">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between text-left"
            >
                <h3 className="font-display text-lg font-semibold text-ink pr-8">
                    {faq.q}
                </h3>
                <span className={`font-mono text-signal text-xl transition-transform ${open ? 'rotate-45' : ''}`}>
                    +
                </span>
            </button>
            {open && (
                <p className="text-graphite text-sm leading-relaxed mt-4 max-w-2xl">
                    {faq.a}
                </p>
            )}
        </div>
    );
}

export default function FAQ() {
    return (
        <div className="max-w-3xl mx-auto px-6 py-20">
            <span className="font-mono text-xs uppercase tracking-wider text-signal">
                Common questions
            </span>
            <h1 className="font-display text-4xl font-semibold text-ink mt-3">
                Frequently asked questions.
            </h1>
            <p className="text-graphite mt-4">
                Can't find what you're looking for?{' '}
                <Link to="/contact" className="text-signal hover:underline">
                    Ask us directly
                </Link>.
            </p>

            <div className="mt-12">
                {faqs.map((faq, i) => (
                    <FAQItem key={i} faq={faq} />
                ))}
            </div>
        </div>
    );
}