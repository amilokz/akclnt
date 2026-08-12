import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Code2, Smartphone, ShoppingCart, Settings, ArrowRight, ArrowUpRight, Sparkles, Zap, ShieldCheck } from 'lucide-react';
import Reveal from '../../components/ui/Reveal.jsx';
import TiltCard from '../../components/ui/TiltCard.jsx';
import MagneticButton from '../../components/ui/MagneticButton.jsx';
import { useMotionPrefs } from '../../hooks/useMotionPrefs.js';

/* ---------- Hero floating service cards ---------- */
/* Each card is hand-placed for a deliberate, non-colliding composition.
   `pos` values are % offsets within the stage; depth drives parallax + z. */
const heroCards = [
    { icon: Code2, label: 'Web', sub: 'Sites & apps', tint: 'from-signal to-violet', pos: { top: '4%', left: '2%' }, rot: -6, depth: 2, float: 'float-card' },
    { icon: Smartphone, label: 'Mobile', sub: 'iOS & Android', tint: 'from-teal to-signal', pos: { top: '14%', right: '0%' }, rot: 7, depth: 1, float: 'float-card-slow' },
    { icon: ShoppingCart, label: 'E-Commerce', sub: 'Online stores', tint: 'from-violet to-teal', pos: { bottom: '6%', left: '0%' }, rot: 5, depth: 1, float: 'float-card-slower' },
];

function HeroStage() {
    const { canHover, reduced } = useMotionPrefs();
    const enabled = canHover && !reduced;
    const stageRef = useRef(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    const onMove = (e) => {
        if (!enabled || !stageRef.current) return;
        const r = stageRef.current.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        setTilt({ x: px, y: py });
    };
    const reset = () => setTilt({ x: 0, y: 0 });

    return (
        <div
            ref={stageRef}
            onMouseMove={onMove}
            onMouseLeave={reset}
            className="relative w-full h-[440px] sm:h-[480px] lg:h-[520px] max-w-md mx-auto lg:mx-0 lg:ml-auto"
            style={{ perspective: '1400px' }}
        >
            {/* glow core */}
            <div
                className="absolute left-1/2 top-1/2 w-72 h-72 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
                style={{ background: 'radial-gradient(circle, rgba(139,123,247,0.4), transparent 65%)' }}
            />

            {/* soft ring behind the focal card */}
            <div
                className="absolute left-1/2 top-1/2 w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 spin-slow"
                style={{ maskImage: 'linear-gradient(120deg, #000, transparent 70%)', WebkitMaskImage: 'linear-gradient(120deg, #000, transparent 70%)' }}
            />

            {/* Focal dashboard card — centered, sits at the back of the depth stack */}
            <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 float-card-slow w-[240px] sm:w-[268px]"
                style={{
                    transform: `translate(-50%,-50%) rotateY(${tilt.x * 12}deg) rotateX(${-tilt.y * 12}deg)`,
                    transformStyle: 'preserve-3d',
                    transition: enabled ? 'transform 0.25s ease-out' : 'none',
                }}
            >
                <div className="glass-dark rounded-2xl p-5 shadow-2xl">
                    <div className="flex items-center justify-between mb-4">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-teal">Live build</span>
                        <span className="flex gap-1">
                            <i className="w-2 h-2 rounded-full bg-[#FF5F57] inline-block" />
                            <i className="w-2 h-2 rounded-full bg-[#FEBC2E] inline-block" />
                            <i className="w-2 h-2 rounded-full bg-[#28C840] inline-block" />
                        </span>
                    </div>
                    <div className="font-mono text-xs leading-relaxed">
                        <div className="text-violet">const <span className="text-white">product</span> = ship({'{'}</div>
                        <div className="pl-4 text-white/70">quality: <span className="text-teal">'high'</span>,</div>
                        <div className="pl-4 text-white/70">speed: <span className="text-teal">'fast'</span>,</div>
                        <div className="text-violet">{'}'});</div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
                        <span className="font-mono text-[10px] text-white/50">deployed — 0 errors</span>
                    </div>
                </div>
            </div>

            {/* Fanned service cards — hand-placed, never overlapping the focal card badly */}
            {heroCards.map((c) => {
                const Icon = c.icon;
                const p = c.depth * 8;
                return (
                    <div
                        key={c.label}
                        className={`absolute ${c.float}`}
                        style={{
                            ...c.pos,
                            transform: `rotate(${c.rot}deg) rotateY(${tilt.x * p}deg) rotateX(${-tilt.y * p}deg) translateZ(${c.depth * 30}px)`,
                            transformStyle: 'preserve-3d',
                            transition: enabled ? 'transform 0.3s ease-out' : 'none',
                        }}
                    >
                        <div className={`rounded-2xl p-3.5 shadow-2xl bg-gradient-to-br ${c.tint} w-[128px] sm:w-[140px] backdrop-blur`}>
                            <div className="w-9 h-9 rounded-lg bg-white/25 flex items-center justify-center mb-2.5">
                                <Icon size={18} className="text-white" />
                            </div>
                            <div className="font-display text-sm font-bold text-white leading-tight">{c.label}</div>
                            <div className="font-mono text-[9px] uppercase tracking-wide text-white/70 mt-0.5">{c.sub}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

/* ---------- Static content ---------- */
const pillars = [
    { icon: Code2, title: 'Web Development', desc: 'Custom sites and web apps that load fast and turn visitors into customers.' },
    { icon: Smartphone, title: 'Mobile Apps', desc: 'Cross-platform apps for iOS and Android from a single, maintainable codebase.' },
    { icon: ShoppingCart, title: 'E-Commerce', desc: 'Online stores with secure payments, inventory, and order management built in.' },
    { icon: Settings, title: 'Business Software', desc: 'CRMs, dashboards, and internal tools built around how your team actually works.' },
];

const whyUs = [
    { icon: Zap, title: 'Built to ship', desc: 'We architect for scale and launch — not just to demo well once.' },
    { icon: ShieldCheck, title: 'Full transparency', desc: 'A live client dashboard tracks progress, files, and invoices. No black box.' },
    { icon: Sparkles, title: 'Direct to developers', desc: 'No account managers in between. You talk to the people writing the code.' },
];

const process = [
    { num: '01', title: 'Discover', desc: 'We map your business goals and define exactly what needs to be built.' },
    { num: '02', title: 'Design', desc: 'Interfaces and architecture planned around your users and your data.' },
    { num: '03', title: 'Build', desc: 'We develop in the open, keeping you updated at every milestone.' },
    { num: '04', title: 'Launch', desc: 'We deploy, test, and hand over a product ready to grow with you.' },
];

const stats = [
    { value: '6', label: 'People on the team' },
    { value: '7', label: 'Service lines' },
    { value: '24h', label: 'Avg. response time' },
    { value: '100%', label: 'Code we write ourselves' },
];

const marqueeItems = ['Laravel', 'React', 'MySQL', 'Flutter', 'Node.js', 'Vite', 'Tailwind', 'REST APIs', 'Cloudinary'];

export default function Home() {
    const [services, setServices] = useState([]);

    useEffect(() => {
        axios.get('/api/services')
            .then((res) => setServices(res.data.slice(0, 4)))
            .catch(() => {});
    }, []);

    return (
        <div className="overflow-hidden">
            {/* ============ HERO ============ */}
            <section className="relative min-h-[92vh] flex items-center bg-void text-paper pt-24 pb-16">
                {/* background layers */}
                <div className="mesh-bg">
                    <div className="grid-overlay-dark absolute inset-0" />
                    <div className="aurora absolute w-[55vw] h-[55vw] rounded-full blur-3xl -top-40 -left-20"
                         style={{ background: 'radial-gradient(circle, rgba(91,95,239,0.28), transparent 60%)' }} />
                    <div className="aurora absolute w-[45vw] h-[45vw] rounded-full blur-3xl bottom-0 right-0"
                         style={{ background: 'radial-gradient(circle, rgba(0,168,150,0.22), transparent 60%)', animationDelay: '-9s' }} />
                    <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-void to-transparent" />
                </div>

                <div className="relative max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
                    <div style={{ animation: 'fadeInUp 0.8s ease' }}>
                        <span className="inline-flex items-center gap-2 glass-dark rounded-full px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-widest text-white/70">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
                            Software & Web Development Studio
                        </span>
                        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mt-6 leading-[1.05]">
                            We turn ideas into <span className="text-gradient">software that ships.</span>
                        </h1>
                        <p className="text-white/60 mt-6 text-lg max-w-md leading-relaxed">
                            Akclnt builds websites, apps, and business systems for companies that need
                            something that actually works — not just looks good in a pitch.
                        </p>
                        <div className="flex flex-wrap gap-4 mt-9">
                            <MagneticButton
                                to="/contact"
                                className="group inline-flex items-center gap-2 bg-white text-ink px-6 py-3.5 rounded-full font-medium hover:bg-signal hover:text-white transition-colors"
                            >
                                Start a Project
                                <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </MagneticButton>
                            <Link
                                to="/portfolio"
                                className="inline-flex items-center gap-2 border border-white/20 text-white px-6 py-3.5 rounded-full font-medium hover:border-white/60 transition-colors"
                            >
                                See our work
                            </Link>
                        </div>

                        {/* trust row */}
                        <div className="flex items-center gap-6 mt-10">
                            <div className="flex -space-x-2">
                                {['K', 'J', 'M', 'L'].map((c, i) => (
                                    <span key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-signal to-teal flex items-center justify-center text-xs font-semibold text-white border-2 border-void">
                                        {c}
                                    </span>
                                ))}
                            </div>
                            <p className="font-mono text-xs text-white/50 leading-relaxed">
                                Trusted by retail, real-estate,<br className="hidden sm:block" /> and training businesses.
                            </p>
                        </div>
                    </div>

                    {/* 3D stage */}
                    <div style={{ animation: 'fadeInUp 0.8s ease 0.2s backwards' }}>
                        <HeroStage />
                    </div>
                </div>
            </section>

            {/* ============ TECH MARQUEE ============ */}
            <section className="bg-ink border-y border-white/10 py-5 overflow-hidden">
                <div className="marquee-mask">
                    <div className="marquee-track flex gap-10 w-max">
                        {[...marqueeItems, ...marqueeItems].map((item, i) => (
                            <span key={i} className="font-mono text-sm text-white/40 uppercase tracking-wider whitespace-nowrap flex items-center gap-10">
                                {item} <span className="text-signal">◆</span>
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============ STATS ============ */}
            <section className="bg-paper border-b border-mist">
                <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, i) => (
                        <Reveal key={stat.label} delay={i * 0.08}>
                            <div className="font-display text-3xl md:text-4xl font-bold text-ink">{stat.value}</div>
                            <div className="text-graphite text-sm mt-1">{stat.label}</div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* ============ PILLARS ============ */}
            <section className="max-w-6xl mx-auto px-6 py-24">
                <Reveal>
                    <span className="font-mono text-xs uppercase tracking-wider text-signal">What we do</span>
                    <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink mt-3 mb-14 max-w-xl">
                        Four disciplines. One team that actually ships.
                    </h2>
                </Reveal>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {pillars.map((p, i) => {
                        const Icon = p.icon;
                        return (
                            <Reveal key={p.title} delay={i * 0.08}>
                                <TiltCard max={8} className="h-full">
                                    <div className="group relative h-full bg-white border border-mist rounded-2xl p-6 overflow-hidden hover:border-signal transition-colors shine-sweep">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-signal to-violet flex items-center justify-center mb-5 shadow-lg shadow-signal/20">
                                            <Icon size={22} className="text-white" />
                                        </div>
                                        <h3 className="font-display text-lg font-semibold text-ink mb-2">{p.title}</h3>
                                        <p className="text-graphite text-sm leading-relaxed">{p.desc}</p>
                                    </div>
                                </TiltCard>
                            </Reveal>
                        );
                    })}
                </div>
            </section>

            {/* ============ SERVICES (live from DB) ============ */}
            {services.length > 0 && (
                <section className="relative bg-void text-paper py-24 overflow-hidden">
                    <div className="grid-overlay-dark absolute inset-0 opacity-60" />
                    <div className="aurora absolute w-[40vw] h-[40vw] rounded-full blur-3xl top-10 -right-20"
                         style={{ background: 'radial-gradient(circle, rgba(91,95,239,0.2), transparent 60%)' }} />
                    <div className="relative max-w-6xl mx-auto px-6">
                        <Reveal>
                            <div className="flex flex-wrap items-end justify-between gap-4 mb-14">
                                <div>
                                    <span className="font-mono text-xs uppercase tracking-wider text-teal">Full service list</span>
                                    <h2 className="font-display text-3xl md:text-4xl font-semibold mt-3">Everything we offer.</h2>
                                </div>
                                <Link to="/services" className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-white/70 hover:text-white transition-colors">
                                    View all <ArrowRight size={14} />
                                </Link>
                            </div>
                        </Reveal>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {services.map((service, i) => (
                                <Reveal key={service.id} delay={i * 0.08}>
                                    <TiltCard max={6}>
                                        <Link
                                            to={`/services/${service.id}`}
                                            className="group flex items-start gap-4 glass-dark rounded-2xl p-6 hover:border-signal/50 transition-colors"
                                        >
                                            <div className="text-3xl shrink-0 w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center">
                                                {service.icon}
                                            </div>
                                            <div>
                                                <h3 className="font-display text-lg font-semibold text-white mb-1.5 flex items-center gap-2">
                                                    {service.name}
                                                    <ArrowUpRight size={16} className="text-teal opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                                </h3>
                                                <p className="text-white/55 text-sm leading-relaxed line-clamp-2">{service.description}</p>
                                            </div>
                                        </Link>
                                    </TiltCard>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ============ WHY CHOOSE US ============ */}
            <section className="max-w-6xl mx-auto px-6 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                    <Reveal className="lg:sticky lg:top-24">
                        <span className="font-mono text-xs uppercase tracking-wider text-signal">Why akclnt</span>
                        <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink mt-3 leading-tight">
                            The reasons clients stay.
                        </h2>
                        <p className="text-graphite mt-4 leading-relaxed">
                            We're a small studio on purpose. It keeps us fast, honest, and close to the work.
                        </p>
                    </Reveal>

                    <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-5">
                        {whyUs.map((w, i) => {
                            const Icon = w.icon;
                            return (
                                <Reveal key={w.title} delay={i * 0.1}>
                                    <div className="h-full bg-white border border-mist rounded-2xl p-6 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-signal/5 transition-all duration-300">
                                        <div className="w-11 h-11 rounded-lg bg-signal-dim flex items-center justify-center mb-4">
                                            <Icon size={20} className="text-signal" />
                                        </div>
                                        <h3 className="font-display text-base font-semibold text-ink mb-2">{w.title}</h3>
                                        <p className="text-graphite text-sm leading-relaxed">{w.desc}</p>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ============ PROCESS ============ */}
            <section className="bg-signal-dim py-24">
                <div className="max-w-6xl mx-auto px-6">
                    <Reveal>
                        <span className="font-mono text-xs uppercase tracking-wider text-signal">How we work</span>
                        <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink mt-3 mb-14">
                            From idea to launch, in four steps.
                        </h2>
                    </Reveal>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {process.map((step, i) => (
                            <Reveal key={step.num} delay={i * 0.1}>
                                <div className="relative h-full bg-white rounded-2xl p-6 border border-white overflow-hidden group hover:border-signal transition-colors">
                                    <span className="font-display text-5xl font-bold text-signal/15 absolute top-3 right-4 group-hover:text-signal/25 transition-colors">{step.num}</span>
                                    <div className="w-8 h-8 rounded-lg bg-signal flex items-center justify-center font-mono text-xs text-white mb-4">{i + 1}</div>
                                    <h3 className="font-display text-lg font-semibold text-ink mb-2 relative">{step.title}</h3>
                                    <p className="text-graphite text-sm leading-relaxed relative">{step.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============ PORTFOLIO STRIP ============ */}
            <section className="bg-ink py-24">
                <div className="max-w-6xl mx-auto px-6">
                    <Reveal>
                        <span className="font-mono text-xs uppercase tracking-wider text-teal">Recent work</span>
                        <h2 className="font-display text-3xl md:text-4xl font-semibold text-paper mt-3 mb-14 max-w-lg">
                            Things we've shipped for real businesses.
                        </h2>
                    </Reveal>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { title: 'Retail Inventory & POS', tag: 'Software', tint: 'from-signal/20 to-violet/20' },
                            { title: 'Intern Management Platform', tag: 'Web App', tint: 'from-teal/20 to-signal/20' },
                            { title: 'Accounting Management System', tag: 'Software', tint: 'from-violet/20 to-teal/20' },
                        ].map((item, i) => (
                            <Reveal key={item.title} delay={i * 0.1}>
                                <TiltCard max={9}>
                                    <div className="group relative rounded-2xl overflow-hidden border border-white/10 aspect-[4/3] flex flex-col justify-end p-6">
                                        <div className={`absolute inset-0 bg-gradient-to-br ${item.tint}`} />
                                        <div className="grid-overlay-dark absolute inset-0 opacity-50" />
                                        <div className="relative">
                                            <span className="font-mono text-xs text-teal">{item.tag}</span>
                                            <h3 className="font-display text-lg font-semibold text-paper mt-2">{item.title}</h3>
                                        </div>
                                    </div>
                                </TiltCard>
                            </Reveal>
                        ))}
                    </div>

                    <Reveal delay={0.15}>
                        <Link to="/portfolio" className="inline-flex items-center gap-2 mt-10 font-mono text-xs uppercase tracking-wider text-signal hover:gap-3 transition-all">
                            See full portfolio <ArrowRight size={14} />
                        </Link>
                    </Reveal>
                </div>
            </section>

            {/* ============ FINAL CTA ============ */}
            <section className="relative bg-void text-paper py-28 overflow-hidden">
                <div className="mesh-bg">
                    <div className="aurora absolute left-1/2 top-1/2 w-[60vw] h-[60vw] rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
                         style={{ background: 'radial-gradient(circle, rgba(91,95,239,0.25), transparent 60%)' }} />
                    <div className="grid-overlay-dark absolute inset-0 opacity-40" />
                </div>
                <div className="relative max-w-3xl mx-auto px-6 text-center">
                    <Reveal>
                        <span className="font-mono text-xs uppercase tracking-widest text-teal">Let's build</span>
                        <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 leading-tight">
                            Have a project in mind?<br />Let's talk about it.
                        </h2>
                        <p className="text-white/55 mt-5 text-lg">
                            Tell us what you're building. You'll get a real response within 24 hours — no obligation.
                        </p>
                        <MagneticButton
                            to="/contact"
                            className="group inline-flex items-center gap-2 mt-10 bg-white text-ink px-8 py-4 rounded-full font-medium hover:bg-signal hover:text-white transition-colors"
                        >
                            Get a Free Quote
                            <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </MagneticButton>
                    </Reveal>
                </div>
            </section>
        </div>
    );
}
