import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '../ui/Reveal.jsx';
import komilImg from '../../assets/team/komil.jpg';
import nomanImg from '../../assets/team/noman.jpg';
import shakeelImg from '../../assets/team/shakeel.jpg';

const founders = [
    {
        name: 'Komil Hassan',
        role: 'Founder & CEO',
        focus: 'Laravel & React full-stack development and project architecture.',
        image: komilImg,
        accent: { from: '#5B5FEF', to: '#8B7BF7', glow: 'rgba(91,95,239,0.18)' },
        socials: { linkedin: 'https://www.linkedin.com/in/komil-hassan-a97b66282', email: 'mailto:info@akclnt.com' },
    },
    {
        name: 'Noman Arshad',
        role: 'Amazon Accounting Management',
        focus: 'Amazon seller accounting, reconciliation, and reporting.',
        image: nomanImg,
        accent: { from: '#00A896', to: '#5B5FEF', glow: 'rgba(0,168,150,0.18)' },
        socials: { linkedin: null, email: 'mailto:info@akclnt.com' },
    },
    {
        name: 'Muhammad Shakeel',
        role: 'Co-Founder',
        focus: 'Operations, client relations, and project delivery.',
        image: shakeelImg,
        accent: { from: '#8B7BF7', to: '#00A896', glow: 'rgba(139,123,247,0.18)' },
        socials: { linkedin: null, email: 'mailto:info@akclnt.com' },
    },
];

export function Founders() {
    return (
        <section className="relative py-28 overflow-hidden" style={{ backgroundColor: '#ffffff' }}>
            {/* backdrop */}
            <div className="grid-overlay absolute inset-0 opacity-20" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[400px] blur-[130px] opacity-10 pointer-events-none"
                 style={{ background: 'radial-gradient(ellipse, #5B5FEF, transparent 70%)' }} />

            <div className="relative max-w-6xl mx-auto px-6">
                {/* heading */}
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <p className="font-mono text-xs uppercase tracking-[0.25em] text-signal mb-4">The founders</p>
                    <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-ink">
                        Three partners, <span className="text-gradient">one team.</span>
                    </h2>
                    <p className="text-graphite mt-5 leading-relaxed">
                        We handle everything together — from code to clients. Behind us is a full
                        team of developers who build alongside us.
                    </p>
                </div>

                {/* cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {founders.map((m, i) => (
                        <Reveal key={m.name} delay={i * 0.1}>
                            <div className="group relative h-full rounded-3xl p-px overflow-hidden transition-all duration-500 hover:-translate-y-2"
                                 style={{ background: `linear-gradient(160deg, ${m.accent.from}55, rgba(0,0,0,0.05) 50%)` }}>
                                <div className="relative h-full rounded-3xl overflow-hidden flex flex-col bg-white"
                                     style={{ boxShadow: `0 20px 50px -20px ${m.accent.glow}` }}>

                                    {/* top gradient band + big photo */}
                                    <div className="relative pt-12 pb-8 flex justify-center"
                                         style={{ background: `linear-gradient(180deg, ${m.accent.from}12, transparent)` }}>
                                        <div className="relative">
                                            {/* glow ring */}
                                            <div className="absolute -inset-3 rounded-full blur-2xl opacity-40 group-hover:opacity-70 transition-opacity"
                                                 style={{ background: `linear-gradient(135deg, ${m.accent.from}, ${m.accent.to})` }} />
                                            {/* gradient border ring */}
                                            <div className="relative rounded-full p-1"
                                                 style={{ background: `linear-gradient(135deg, ${m.accent.from}, ${m.accent.to})` }}>
                                                {m.image ? (
                                                    <img src={m.image} alt={m.name}
                                                         className="w-40 h-40 rounded-full object-cover"
                                                         style={{ border: '4px solid #ffffff' }} />
                                                ) : (
                                                    <div className="w-40 h-40 rounded-full flex items-center justify-center font-display text-white text-5xl font-bold"
                                                         style={{ background: `linear-gradient(135deg, ${m.accent.from}, ${m.accent.to})`, border: '4px solid #ffffff' }}>
                                                        {m.name.charAt(0)}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* text */}
                                    <div className="px-7 pb-8 text-center flex flex-col flex-1">
                                        <h3 className="font-display text-xl font-bold text-ink">{m.name}</h3>
                                        <p className="font-mono text-[0.68rem] uppercase tracking-wider mt-2"
                                           style={{ color: m.accent.from }}>{m.role}</p>
                                        <p className="text-graphite text-sm mt-4 leading-relaxed flex-1">{m.focus}</p>

                                        {/* socials (inline SVG) */}
                                        <div className="flex items-center justify-center gap-2.5 mt-6 pt-6 border-t border-mist">
                                            {m.socials?.linkedin && (
                                                <a href={m.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                                                   className="w-9 h-9 rounded-full flex items-center justify-center text-graphite hover:text-white transition-all"
                                                   style={{ border: '1px solid rgba(0,0,0,0.1)' }}
                                                   onMouseEnter={(e) => (e.currentTarget.style.background = m.accent.from)}
                                                   onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
                                                    <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                                    </svg>
                                                </a>
                                            )}
                                            {m.socials?.email && (
                                                <a href={m.socials.email} aria-label="Email"
                                                   className="w-9 h-9 rounded-full flex items-center justify-center text-graphite hover:text-white transition-all"
                                                   style={{ border: '1px solid rgba(0,0,0,0.1)' }}
                                                   onMouseEnter={(e) => (e.currentTarget.style.background = m.accent.from)}
                                                   onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
                                                    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                        <rect x="2" y="4" width="20" height="16" rx="2"/>
                                                        <path d="m22 7-10 5L2 7"/>
                                                    </svg>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>

                {/* link */}
                <div className="text-center mt-14">
                    <Link to="/team" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-signal hover:gap-3 transition-all">
                        Meet the full team <ArrowUpRight size={14} />
                    </Link>
                </div>
            </div>
        </section>
    );
}