import Seo from '../../components/ui/Seo.jsx';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import Reveal from '../../components/ui/Reveal.jsx';

const faqs = [
    { q: 'How long does a typical project take?', a: 'It depends on scope. A simple website usually takes 2-3 weeks, while a full business system (like a CRM or accounting platform) can take 1-3 months. We give you a clear timeline before starting.' },
    { q: 'How much does a project cost?', a: "Pricing depends on complexity and features. Fill out the contact form with your budget range, and we'll tell you honestly if it fits or what adjustments would make it work." },
    { q: 'Do you offer support after launch?', a: 'Yes. Every project includes a support period after launch, and we offer ongoing maintenance plans for clients who want continuous updates.' },
    { q: 'Can I track my project progress?', a: 'Yes — once your project starts, you get access to a client dashboard where you can see progress, files, invoices, and raise support tickets directly.' },
    { q: 'What technologies do you work with?', a: 'Mainly Laravel and React for web applications, along with mobile development for iOS and Android. We choose the right stack based on what your project actually needs.' },
    { q: 'Do you sign a contract before starting?', a: "Yes, once we agree on scope and budget, we put it in writing before any work begins — so there's no ambiguity on either side." },
];

function FAQItem({ faq, isOpen, onToggle }) {
    return (
       
       
        <div className="border border-mist rounded-2xl bg-white overflow-hidden transition-colors hover:border-signal/40">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between text-left px-6 py-5 gap-4"
                aria-expanded={isOpen}
            >
                <h3 className="font-display text-base md:text-lg font-semibold text-ink">{faq.q}</h3>
                <span
                    className="w-8 h-8 rounded-full bg-signal-dim flex items-center justify-center flex-shrink-0 transition-transform duration-300"
                    style={{ transform: isOpen ? 'rotate(135deg)' : 'none' }}
                >
                    <Plus size={16} className="text-signal" />
                </span>
            </button>
            <div
                className="grid transition-all duration-300 ease-out"
                style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
                <div className="overflow-hidden">
                    <p className="text-graphite text-sm leading-relaxed px-6 pb-5 max-w-2xl">{faq.a}</p>
                </div>
            </div>
        </div>
        
    );
}

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(0);

    return (
         <>
          <Seo path="/faq" title="Frequently Asked Questions | AKCLNT" description="Answers to common questions about AKCLNT's services, pricing, process, and how we work with businesses in Pakistan and internationally." />
        <div className="overflow-hidden">
            {/* Header */}
            <section className="relative bg-void text-paper pt-36 pb-24 overflow-hidden">
                <div className="mesh-bg">
                    <div className="grid-overlay-dark absolute inset-0" />
                    <div className="aurora absolute w-[45vw] h-[45vw] rounded-full blur-3xl top-0 right-0"
                         style={{ background: 'radial-gradient(circle, rgba(0,168,150,0.2), transparent 60%)' }} />
                </div>
                <div className="relative max-w-3xl mx-auto px-6">
                    <Reveal>
                        <span className="font-mono text-xs uppercase tracking-wider text-teal">Common questions</span>
                        <h1 className="font-display text-4xl md:text-6xl font-bold mt-4 leading-[1.05]">
                            Frequently asked <span className="text-gradient">questions.</span>
                        </h1>
                        <p className="text-white/55 mt-6">
                            Can't find what you're looking for?{' '}
                            <Link to="/contact" className="text-teal hover:underline">Ask us directly</Link>.
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* List */}
            <section className="max-w-3xl mx-auto px-6 py-20">
                <div className="space-y-3">
                    {faqs.map((faq, i) => (
                        <Reveal key={i} delay={i * 0.05}>
                            <FAQItem
                                faq={faq}
                                isOpen={openIndex === i}
                                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
                            />
                        </Reveal>
                    ))}
                </div>
            </section>
        </div>
         </>
    );
}
