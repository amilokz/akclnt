import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles, Target, Eye } from 'lucide-react';
import Reveal from '../../components/ui/Reveal.jsx';

const stats = [
    { value: '60+', label: 'Projects shipped' },
    { value: '50+', label: 'Happy clients' },
    { value: '8',   label: 'People on the team' },
    { value: '24h', label: 'Avg. response time' },
];

const values = [
    { num: '01', title: 'We build to last',    desc: 'Every system we ship is architected to scale — not patched together to demo well once and fall apart in month three.' },
    { num: '02', title: 'We speak plainly',    desc: 'No jargon-heavy pitches. We tell you what we can do, what it will cost, and how long it will take. If something is a bad idea, we say so.' },
    { num: '03', title: 'We stay accountable', desc: 'You get direct access to the people writing your code, and a dashboard to track progress — not a black box you have to chase for updates.' },
    { num: '04', title: 'We own the outcome',  desc: 'Shipping is not the finish line. We stay on after launch to fix, tune, and make sure the thing actually works in the real world.' },
];

const process = [
    { step: '01', title: 'Discover',  desc: 'We start with your business goal, not a feature list. A short call to understand what success looks like and what has to be true for it.' },
    { step: '02', title: 'Plan',      desc: 'You get a clear scope, timeline, and quote — written plainly. No surprises halfway through.' },
    { step: '03', title: 'Build',     desc: 'We develop in the open with regular check-ins, so you see progress as it happens instead of waiting for a big reveal.' },
    { step: '04', title: 'Launch',    desc: 'We deploy, test on real devices, hand over the code and documentation, and make sure your team knows how to run it.' },
    { step: '05', title: 'Support',   desc: 'Bugs get fixed, and we stay available for changes as your business grows.' },
];

const stack = {
    'Backend':   ['Laravel', 'PHP', 'Node.js', 'Express', 'REST APIs'],
    'Frontend':  ['React', 'Next.js', 'Vite', 'Tailwind CSS', 'JavaScript'],
    'Mobile':    ['Flutter', 'Dart', 'Firebase'],
    'Database':  ['MySQL', 'MongoDB', 'PostgreSQL'],
    'AI & Automation': ['n8n', 'Gemini API', 'OpenAI', 'Chatbots'],
    'Infra':     ['VPS', 'cPanel', 'Vercel', 'Git / GitHub'],
};

const whyUs = [
    { title: 'Direct to developers',  desc: 'No account managers in between. You talk to the people writing the code.' },
    { title: 'Small by design',       desc: 'A small team keeps us fast, honest, and close to the work. Nothing gets lost in layers.' },
    { title: 'Full stack, one roof',  desc: 'Web, mobile, automation, marketing, and design — you do not need five vendors.' },
    { title: 'Local, working global', desc: 'Based in Rawalpindi, working with clients across Pakistan and abroad.' },
];

export default function About() {
    return (
        <div className="overflow-hidden">

            {/* ===== HERO ===== */}
            <section className="relative bg-void text-paper pt-40 pb-28 overflow-hidden">
                <div className="mesh-bg">
                    <div className="grid-overlay-dark absolute inset-0 opacity-60" />
                    <div className="aurora absolute w-[50vw] h-[50vw] rounded-full blur-3xl -top-20 left-1/2 -translate-x-1/2"
                         style={{ background: 'radial-gradient(circle, rgba(91,95,239,0.22), transparent 60%)' }} />
                    <div className="aurora absolute w-[35vw] h-[35vw] rounded-full blur-3xl top-40 -right-10"
                         style={{ background: 'radial-gradient(circle, rgba(0,168,150,0.18), transparent 60%)' }} />
                </div>
                <div className="relative max-w-4xl mx-auto px-6 text-center">
                    <Reveal>
                        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-7"
                             style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <Sparkles size={13} className="text-teal" />
                            <span className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-white/60">About akclnt</span>
                        </div>
                        <h1 className="font-display text-4xl md:text-6xl font-bold leading-[1.05] tracking-[-0.02em]">
                            Software, built by people who <span className="text-gradient">actually write the code.</span>
                        </h1>
                        <p className="text-white/60 text-lg mt-7 max-w-2xl mx-auto leading-relaxed">
                            akclnt is a software studio based in Rawalpindi, Pakistan. We work with
                            businesses that need real, working software — websites, apps, automation,
                            and internal tools — without the overhead of a large agency.
                        </p>
                    </Reveal>

                    <Reveal delay={0.15}>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14">
                            {stats.map((s) => (
                                <div key={s.label} className="rounded-2xl p-5"
                                     style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                                    <div className="font-display text-3xl font-bold text-white">{s.value}</div>
                                    <div className="font-mono text-[10px] uppercase tracking-wider text-white/50 mt-1.5">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ===== OUR STORY ===== */}
            <section className="relative py-24 overflow-hidden" style={{ backgroundColor: '#ffffff' }}>
                <div className="grid-overlay absolute inset-0 opacity-20" />
                <div className="relative max-w-6xl mx-auto px-6">
                    <div className="grid lg:grid-cols-[42fr_58fr] gap-12 lg:gap-16 items-start">
                        <Reveal>
                            <p className="font-mono text-xs uppercase tracking-[0.25em] text-signal mb-4">Our story</p>
                            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-ink tracking-tight leading-tight">
                                Started with code.<br />Grew into a <span className="text-gradient">studio.</span>
                            </h2>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <div className="space-y-5 text-graphite leading-relaxed">
                                <p>
                                    akclnt began the way most good studios do — with developers taking on
                                    projects they cared about, and clients who kept coming back. What
                                    started as freelance work turned into a small team, and then into a
                                    proper studio with three partners and a crew of developers and designers.
                                </p>
                                <p>
                                    Along the way we have built intern management platforms, e-commerce
                                    stores, mobile apps published on the Play Store, automation workflows,
                                    and marketing sites for founders who needed something that actually
                                    converts. Some of it for companies, some for clients, some because the
                                    problem was interesting.
                                </p>
                                <p>
                                    We stayed small on purpose. It keeps us fast, keeps the quality high,
                                    and means the person you talk to is the person building your project.
                                </p>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ===== MISSION & VISION ===== */}
            <section className="relative py-24 overflow-hidden" style={{ backgroundColor: '#f0f4f8' }}>
                <div className="absolute inset-0 pointer-events-none"
                     style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(91,95,239,0.06), transparent 70%)' }} />
                <div className="relative max-w-6xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            { Icon: Target, title: 'Our mission', text: 'To give growing businesses access to software that actually works — built properly, priced honestly, and delivered without the agency runaround.', accent: { from: '#5B5FEF', to: '#8B7BF7' } },
                            { Icon: Eye,    title: 'Our vision',  text: 'To become the studio businesses in Pakistan reach for first when they need something built — known for shipping work that holds up years later.', accent: { from: '#00A896', to: '#5B5FEF' } },
                        ].map(({ Icon, title, text, accent }) => (
                            <Reveal key={title}>
                                <div className="group h-full rounded-3xl p-px overflow-hidden transition-transform duration-300 hover:-translate-y-2"
                                     style={{ background: `linear-gradient(135deg, ${accent.from}44, rgba(0,0,0,0.04))` }}>
                                    <div className="h-full rounded-3xl bg-white p-9"
                                         style={{ boxShadow: `0 16px 40px -18px ${accent.from}33` }}>
                                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                                             style={{ background: `linear-gradient(135deg, ${accent.from}18, ${accent.to}18)`, border: `1.5px solid ${accent.from}33` }}>
                                            <Icon size={24} style={{ color: accent.from }} />
                                        </div>
                                        <h3 className="font-display text-xl font-bold text-ink mb-3">{title}</h3>
                                        <p className="text-graphite leading-relaxed">{text}</p>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== VALUES ===== */}
            <section className="max-w-6xl mx-auto px-6 py-24">
                <Reveal>
                    <div className="mb-14">
                        <p className="font-mono text-xs uppercase tracking-[0.25em] text-signal mb-4">What we stand for</p>
                        <h2 className="font-display text-3xl md:text-4xl font-extrabold text-ink tracking-tight max-w-lg">
                            A few things that <span className="text-gradient">don't change.</span>
                        </h2>
                    </div>
                </Reveal>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {values.map((value, i) => (
                        <Reveal key={value.title} delay={(i % 2) * 0.08}>
                            <div className="group relative h-full bg-white border border-mist rounded-2xl p-8 overflow-hidden hover:border-signal transition-colors">
                                <span className="font-display text-6xl font-bold text-signal/10 group-hover:text-signal/20 transition-colors">{value.num}</span>
                                <h3 className="font-display text-lg font-bold text-ink mb-2 mt-2">{value.title}</h3>
                                <p className="text-graphite text-sm leading-relaxed">{value.desc}</p>
                                <div className="mt-6 h-1 w-0 group-hover:w-full rounded-full transition-all duration-500"
                                     style={{ background: 'linear-gradient(to right, #5B5FEF, #00A896)' }} />
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* ===== HOW WE WORK ===== */}
            <section className="relative py-24 overflow-hidden" style={{ backgroundColor: '#06070C' }}>
                <div className="grid-overlay-dark absolute inset-0 opacity-30" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] blur-[120px] opacity-15 pointer-events-none"
                     style={{ background: 'radial-gradient(ellipse, #5B5FEF, transparent 70%)' }} />
                <div className="relative max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16 max-w-2xl mx-auto">
                        <p className="font-mono text-xs uppercase tracking-[0.25em] text-signal mb-4">How we work</p>
                        <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                            From first call to <span className="text-gradient">long after launch.</span>
                        </h2>
                    </div>

                    <div className="space-y-3">
                        {process.map((p, i) => (
                            <Reveal key={p.step} delay={i * 0.06}>
                                <div className="group flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8 rounded-2xl p-6 transition-colors"
                                     style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                                    <div className="flex items-center gap-4 sm:w-56 shrink-0">
                                        <div className="w-10 h-10 rounded-xl flex items-center justify-center font-mono text-xs font-bold text-white shrink-0"
                                             style={{ background: 'linear-gradient(135deg, #5B5FEF, #8B7BF7)' }}>
                                            {p.step}
                                        </div>
                                        <h3 className="font-display text-lg font-bold text-white">{p.title}</h3>
                                    </div>
                                    <p className="text-white/50 text-sm leading-relaxed flex-1">{p.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== TECH STACK ===== */}
            <section className="max-w-6xl mx-auto px-6 py-24">
                <Reveal>
                    <div className="text-center mb-14 max-w-2xl mx-auto">
                        <p className="font-mono text-xs uppercase tracking-[0.25em] text-signal mb-4">What we work with</p>
                        <h2 className="font-display text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
                            Our <span className="text-gradient">tech stack.</span>
                        </h2>
                        <p className="text-graphite mt-4 leading-relaxed">
                            We pick tools that fit the problem — not whatever is trending this month.
                        </p>
                    </div>
                </Reveal>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(stack).map(([group, items], i) => (
                        <Reveal key={group} delay={(i % 3) * 0.07}>
                            <div className="h-full bg-white border border-mist rounded-2xl p-7 hover:border-signal transition-colors">
                                <h3 className="font-mono text-[0.68rem] uppercase tracking-wider text-signal mb-4">{group}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {items.map((t) => (
                                        <span key={t} className="text-xs px-3 py-1.5 rounded-full bg-signal-dim text-signal font-medium">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* ===== WHY US ===== */}
            <section className="relative py-24 overflow-hidden" style={{ backgroundColor: '#f0f4f8' }}>
                <div className="relative max-w-6xl mx-auto px-6">
                    <Reveal>
                        <div className="mb-14 max-w-lg">
                            <p className="font-mono text-xs uppercase tracking-[0.25em] text-teal mb-4">Why akclnt</p>
                            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
                                The reasons clients <span className="text-gradient">stay.</span>
                            </h2>
                        </div>
                    </Reveal>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {whyUs.map((w, i) => (
                            <Reveal key={w.title} delay={(i % 4) * 0.06}>
                                <div className="h-full bg-white rounded-2xl p-7 border border-mist hover:border-teal transition-colors">
                                    <div className="w-10 h-1 rounded-full mb-5"
                                         style={{ background: 'linear-gradient(to right, #00A896, #5B5FEF)' }} />
                                    <h3 className="font-display text-base font-bold text-ink mb-2">{w.title}</h3>
                                    <p className="text-graphite text-sm leading-relaxed">{w.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CTA ===== */}
            <section className="max-w-5xl mx-auto px-6 py-24">
                <Reveal>
                    <div className="relative rounded-3xl p-12 md:p-16 text-center overflow-hidden"
                         style={{ background: 'linear-gradient(135deg, #0B0D14, #10121C)' }}>
                        <div className="aurora absolute left-1/2 top-0 -translate-x-1/2 w-[50vw] h-72 rounded-full blur-3xl"
                             style={{ background: 'radial-gradient(circle, rgba(91,95,239,0.3), transparent 65%)' }} />
                        <div className="relative">
                            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">Want to work with us?</h2>
                            <p className="text-white/55 mt-4 max-w-md mx-auto leading-relaxed">
                                Tell us what you're building. You'll get a real response within 24 hours — no obligation, no sales pitch.
                            </p>
                            <div className="flex flex-wrap items-center justify-center gap-3 mt-9">
                                <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-ink px-7 py-3.5 rounded-full font-medium hover:bg-signal hover:text-white transition-colors">
                                    Get in Touch <ArrowUpRight size={16} />
                                </Link>
                                <Link to="/portfolio" className="inline-flex items-center gap-2 text-white px-7 py-3.5 rounded-full font-medium transition-colors hover:bg-white/10"
                                      style={{ border: '1px solid rgba(255,255,255,0.15)' }}>
                                    See Our Work
                                </Link>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </section>
        </div>
    );
}