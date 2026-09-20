import Seo from '../../components/ui/Seo.jsx';
import React from 'react';
import { Link } from 'react-router-dom';
import { Quote } from 'lucide-react';
import Reveal from '../../components/ui/Reveal.jsx';
import TiltCard from '../../components/ui/TiltCard.jsx';

const testimonials = [
    { quote: "They understood exactly what we needed without endless back-and-forth. Our inventory system just works.", name: 'Retail Business Owner', role: 'POS System Client', tint: 'from-signal to-violet' },
    { quote: "Communication was direct and honest throughout. No surprises on timeline or budget.", name: 'Training Institute Director', role: 'Web Platform Client', tint: 'from-teal to-signal' },
    { quote: "They didn't just build what we asked for — they pointed out a better way to structure it.", name: 'Real Estate Firm', role: 'Accounting Software Client', tint: 'from-violet to-teal' },
];

export default function Testimonials() {
    return (
        <>
        <Seo path="/testimonials" title="Client Testimonials & Reviews | AKCLNT" description="Read what AKCLNT's clients say about our web development, automation, and marketing work." />
        <div className="overflow-hidden">
            {/* Header */}
            <section className="relative bg-void text-paper pt-36 pb-24 overflow-hidden">
                <div className="mesh-bg">
                    <div className="grid-overlay-dark absolute inset-0" />
                    <div className="aurora absolute w-[45vw] h-[45vw] rounded-full blur-3xl top-0 left-0"
                         style={{ background: 'radial-gradient(circle, rgba(91,95,239,0.22), transparent 60%)' }} />
                </div>
                <div className="relative max-w-6xl mx-auto px-6">
                    <Reveal>
                        <span className="font-mono text-xs uppercase tracking-wider text-teal">Client feedback</span>
                        <h1 className="font-display text-4xl md:text-6xl font-bold mt-4 max-w-2xl leading-[1.05]">
                            What clients say after <span className="text-gradient">working with us.</span>
                        </h1>
                    </Reveal>
                </div>
            </section>

            {/* Grid */}
            <section className="max-w-6xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((t, i) => (
                        <Reveal key={t.name} delay={i * 0.1}>
                            <TiltCard max={6} className="h-full">
                                <div className="group h-full flex flex-col bg-white border border-mist rounded-2xl p-8 hover:border-signal transition-colors">
                                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${t.tint} flex items-center justify-center mb-6`}>
                                        <Quote size={18} className="text-white" />
                                    </div>
                                    <p className="text-ink leading-relaxed flex-1 text-[15px]">{t.quote}</p>
                                    <div className="mt-6 pt-6 border-t border-mist">
                                        <p className="font-display font-semibold text-ink text-sm">{t.name}</p>
                                        <p className="font-mono text-xs text-graphite mt-1">{t.role}</p>
                                    </div>
                                </div>
                            </TiltCard>
                        </Reveal>
                    ))}
                </div>

                {/* CTA */}
                <Reveal>
                    <div className="relative bg-ink text-paper rounded-3xl p-10 md:p-16 mt-20 text-center overflow-hidden">
                        <div className="aurora absolute left-1/2 top-1/2 w-[40vw] h-[40vw] rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
                             style={{ background: 'radial-gradient(circle, rgba(0,168,150,0.2), transparent 60%)' }} />
                        <h2 className="relative font-display text-2xl md:text-3xl font-semibold max-w-md mx-auto">
                            Ready to become our next success story?
                        </h2>
                        <Link to="/contact" className="relative inline-block mt-7 bg-white text-ink px-7 py-3.5 rounded-full font-medium hover:bg-signal hover:text-white transition-colors">
                            Start a Project
                        </Link>
                    </div>
                </Reveal>
            </section>
        </div>
                </>

    );
}
