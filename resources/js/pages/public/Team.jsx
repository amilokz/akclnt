import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '../../components/ui/Reveal.jsx';
import TiltCard from '../../components/ui/TiltCard.jsx';

const team = [
    { name: 'Komil Hassan', role: 'Founder & Senior Developer', focus: 'Laravel & React full-stack development, custom PHP, project architecture', tint: 'from-signal to-violet' },
    { name: 'Javaria Shabbir', role: 'MERN Stack Developer', focus: 'MongoDB, Express, React, Node.js', tint: 'from-teal to-signal' },
    { name: 'Mustabshira', role: 'MERN Stack Developer', focus: 'MongoDB, Express, React, Node.js', tint: 'from-violet to-teal' },
    { name: 'Laiba', role: 'Flutter Developer', focus: 'Cross-platform mobile app development', tint: 'from-signal to-teal' },
    { name: 'Muhammad Jehanzaib', role: 'React & Laravel Developer', focus: 'Frontend development, API integration', tint: 'from-teal to-violet' },
    { name: 'Muhammad Amad', role: 'Graphic Designer', focus: 'Branding, UI design, visual identity', tint: 'from-violet to-signal' },
];

export default function Team() {
    return (
        <div className="overflow-hidden">
            {/* Header */}
            <section className="relative bg-void text-paper pt-36 pb-24 overflow-hidden">
                <div className="mesh-bg">
                    <div className="grid-overlay-dark absolute inset-0" />
                    <div className="aurora absolute w-[45vw] h-[45vw] rounded-full blur-3xl top-0 right-0"
                         style={{ background: 'radial-gradient(circle, rgba(139,123,247,0.22), transparent 60%)' }} />
                </div>
                <div className="relative max-w-6xl mx-auto px-6">
                    <Reveal>
                        <span className="font-mono text-xs uppercase tracking-wider text-teal">The people behind akclnt</span>
                        <h1 className="font-display text-4xl md:text-6xl font-bold mt-4 max-w-2xl leading-[1.05]">
                            A small team that <span className="text-gradient">ships.</span>
                        </h1>
                        <p className="text-white/55 mt-6 max-w-lg text-lg leading-relaxed">
                            No account managers, no middlemen — you work directly with the developers building your project.
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* Grid */}
            <section className="max-w-6xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {team.map((member, i) => (
                        <Reveal key={member.name} delay={(i % 3) * 0.08}>
                            <TiltCard max={7} className="h-full">
                                <div className="group h-full bg-white border border-mist rounded-2xl p-7 hover:border-signal transition-colors">
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${member.tint} flex items-center justify-center font-display text-white text-xl font-semibold mb-5 shadow-lg group-hover:scale-105 transition-transform`}>
                                        {member.name.charAt(0)}
                                    </div>
                                    <h3 className="font-display text-lg font-semibold text-ink">{member.name}</h3>
                                    <p className="font-mono text-xs uppercase tracking-wider text-signal mt-1.5">{member.role}</p>
                                    <p className="text-graphite text-sm mt-4 leading-relaxed">{member.focus}</p>
                                </div>
                            </TiltCard>
                        </Reveal>
                    ))}
                </div>

                {/* CTA */}
                <Reveal>
                    <div className="relative bg-ink text-paper rounded-3xl p-10 md:p-14 mt-16 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 overflow-hidden">
                        <div className="aurora absolute right-0 top-0 w-72 h-72 rounded-full blur-3xl"
                             style={{ background: 'radial-gradient(circle, rgba(0,168,150,0.2), transparent 60%)' }} />
                        <h2 className="relative font-display text-2xl md:text-3xl font-semibold max-w-sm">
                            Want to join a team that ships?
                        </h2>
                        <Link to="/contact" className="relative inline-flex items-center gap-2 bg-white text-ink px-6 py-3.5 rounded-full font-medium hover:bg-signal hover:text-white transition-colors whitespace-nowrap">
                            Get in Touch <ArrowUpRight size={16} />
                        </Link>
                    </div>
                </Reveal>
            </section>
        </div>
    );
}
