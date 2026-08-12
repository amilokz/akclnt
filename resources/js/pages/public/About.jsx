import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '../../components/ui/Reveal.jsx';

const values = [
    { num: '01', title: 'We build to last', desc: 'Every system we ship is architected to scale, not patched together to demo well once.' },
    { num: '02', title: 'We speak plainly', desc: 'No jargon-heavy pitches. We tell you what we can do, what it costs, and how long it takes.' },
    { num: '03', title: 'We stay accountable', desc: 'You get a dashboard to track your project — not a black box you have to chase for updates.' },
];

const stats = [
    { value: '6', label: 'Developers & designers' },
    { value: '7+', label: 'Services offered' },
    { value: '24h', label: 'Response time' },
];

export default function About() {
    return (
        <div className="overflow-hidden">
            {/* Hero */}
            <section className="relative bg-void text-paper pt-40 pb-28 overflow-hidden">
                <div className="mesh-bg">
                    <div className="grid-overlay-dark absolute inset-0" />
                    <div className="aurora absolute w-[50vw] h-[50vw] rounded-full blur-3xl -top-20 left-1/2 -translate-x-1/2"
                         style={{ background: 'radial-gradient(circle, rgba(91,95,239,0.22), transparent 60%)' }} />
                </div>
                <div className="relative max-w-4xl mx-auto px-6 text-center">
                    <Reveal>
                        <span className="font-mono text-xs uppercase tracking-wider text-teal">About akclnt</span>
                        <h1 className="font-display text-4xl md:text-6xl font-bold mt-5 leading-[1.05]">
                            Software, built by people who <span className="text-gradient">actually write the code.</span>
                        </h1>
                        <p className="text-white/60 text-lg mt-7 max-w-2xl mx-auto leading-relaxed">
                            Akclnt is a small software development team based in Rawalpindi, Pakistan.
                            We work with businesses that need real, working software — websites, apps,
                            and internal tools — without the overhead of a large agency.
                        </p>
                    </Reveal>

                    <Reveal delay={0.15}>
                        <div className="grid grid-cols-3 gap-4 mt-14 max-w-lg mx-auto">
                            {stats.map((s) => (
                                <div key={s.label} className="glass-dark rounded-2xl p-5">
                                    <div className="font-display text-3xl font-bold text-white">{s.value}</div>
                                    <div className="font-mono text-[10px] uppercase tracking-wider text-white/50 mt-1">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Values */}
            <section className="max-w-6xl mx-auto px-6 py-24">
                <Reveal>
                    <span className="font-mono text-xs uppercase tracking-wider text-signal">What we stand for</span>
                    <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink mt-3 mb-14">
                        A few things that don't change.
                    </h2>
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {values.map((value, i) => (
                        <Reveal key={value.title} delay={i * 0.1}>
                            <div className="group relative h-full bg-white border border-mist rounded-2xl p-8 overflow-hidden hover:border-signal transition-colors">
                                <span className="font-display text-6xl font-bold text-signal/10 group-hover:text-signal/20 transition-colors">{value.num}</span>
                                <h3 className="font-display text-lg font-semibold text-ink mb-2 mt-2">{value.title}</h3>
                                <p className="text-graphite text-sm leading-relaxed">{value.desc}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-4xl mx-auto px-6 pb-24">
                <Reveal>
                    <div className="relative bg-signal-dim rounded-3xl p-12 md:p-16 text-center overflow-hidden">
                        <h2 className="font-display text-2xl md:text-3xl font-semibold text-ink">Want to work with us?</h2>
                        <p className="text-graphite mt-3">We'd love to hear what you're building.</p>
                        <Link to="/contact" className="inline-flex items-center gap-2 mt-7 bg-ink text-paper px-7 py-3.5 rounded-full font-medium hover:bg-signal transition-colors">
                            Get in Touch <ArrowUpRight size={16} />
                        </Link>
                    </div>
                </Reveal>
            </section>
        </div>
    );
}
