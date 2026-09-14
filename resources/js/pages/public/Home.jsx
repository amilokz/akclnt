import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Code2, Smartphone, ShoppingCart, Settings, ArrowRight, ArrowUpRight, Sparkles, Zap, ShieldCheck } from 'lucide-react';
import Reveal from '../../components/ui/Reveal.jsx';
import TiltCard from '../../components/ui/TiltCard.jsx';
import MagneticButton from '../../components/ui/MagneticButton.jsx';
import { Hero } from '../../components/sections/Hero';
import ctaShape1 from "../../assets/ns-img-500.png";
import ctaShape2 from "../../assets/ns-img-505.png";
import { Founders } from '../../components/sections/Founders';
import CountUp from '../../components/ui/CountUp.jsx';
import { Users, Layers, Clock, Code2 as CodeIcon } from 'lucide-react';

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
    { value: '8', label: 'People on the team', icon: Users },
    { value: '29', label: 'Services offered', icon: Layers },
    { value: '24h', label: 'Avg. response time', icon: Clock },
    { value: '100%', label: 'In-house code', icon: CodeIcon },
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
            <Hero />

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
            <section className="relative py-24 overflow-hidden" style={{ backgroundColor: "#f0f4f8" }}>
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(91,95,239,0.05), transparent 70%)" }}
                />
                <div className="relative max-w-6xl mx-auto px-6">
                    <div className="text-center mb-14">
                        <p className="font-mono text-xs uppercase tracking-[0.25em] text-signal mb-4">By The Numbers</p>
                        <h2 className="font-display text-4xl md:text-5xl font-extrabold text-ink tracking-tight">
                            Built on <span className="text-gradient">real results.</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, i) => {
                            const accents = [
                                { from: "#5B5FEF", to: "#8B7BF7", glow: "rgba(91,95,239,0.12)", icon: "🚀" },
                                { from: "#00A896", to: "#5B5FEF", glow: "rgba(0,168,150,0.12)", icon: "⚡" },
                                { from: "#8B7BF7", to: "#00A896", glow: "rgba(139,123,247,0.12)", icon: "🕐" },
                                { from: "#5B5FEF", to: "#00A896", glow: "rgba(91,95,239,0.12)", icon: "✅" },
                            ];
                            const accent = accents[i];
                            return (
                                <div
                                    key={stat.label}
                                    className="group relative rounded-3xl p-px overflow-hidden transition-transform duration-300 hover:-translate-y-2"
                                    style={{ background: `linear-gradient(135deg, ${accent.from}44, rgba(0,0,0,0.04))` }}
                                >
                                    <div
                                        className="relative rounded-3xl px-6 py-10 flex flex-col items-center text-center h-full"
                                        style={{ backgroundColor: "#ffffff", boxShadow: `0 8px 40px -12px ${accent.glow}` }}
                                    >
                                        <div
                                            className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                            style={{ background: `radial-gradient(circle at 50% 0%, ${accent.glow}, transparent 70%)` }}
                                        />
                                                                              <div
                                            className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                                            style={{
                                                background: `linear-gradient(135deg, ${accent.from}15, ${accent.to}15)`,
                                                border: `1.5px solid ${accent.from}30`,
                                            }}
                                        >
                                            <stat.icon size={22} style={{ color: accent.from }} />
                                        </div>
                                        <div
                                            className="font-display text-5xl font-black mb-2 relative leading-none"
                                            style={{
                                                background: `linear-gradient(135deg, #0B0D14 30%, ${accent.from})`,
                                                WebkitBackgroundClip: "text",
                                                WebkitTextFillColor: "transparent",
                                            }}
                                        >
                                                                                     <CountUp value={stat.value} />
                                        </div>
                                        <div className="font-mono text-xs uppercase tracking-wider text-ink/40 mt-1 relative">
                                            {stat.label}
                                        </div>
                                        <div
                                            className="mt-5 h-1 w-8 group-hover:w-16 rounded-full transition-all duration-500"
                                            style={{ background: `linear-gradient(to right, ${accent.from}, ${accent.to})` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ============ PILLARS ============ */}
            <section className="relative py-24 overflow-hidden" style={{ backgroundColor: "#ffffff" }}>
                <div className="grid-overlay absolute inset-0 opacity-20" />
                <div
                    className="absolute top-0 right-0 w-[500px] h-[400px] blur-[120px] opacity-10 pointer-events-none"
                    style={{ background: "radial-gradient(ellipse, #00A896, transparent 70%)" }}
                />
                <div className="relative max-w-6xl mx-auto px-6">
                    <div className="mb-16">
                        <p className="font-mono text-xs uppercase tracking-[0.25em] text-signal mb-4">What We Do</p>
                        <h2 className="font-display text-4xl md:text-5xl font-extrabold text-ink tracking-tight max-w-xl">
                            Four disciplines.{" "}
                            <span className="text-gradient">One team that ships.</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {pillars.map((p, i) => {
                            const Icon = p.icon;
                            const accents = [
                                { from: "#5B5FEF", to: "#8B7BF7", glow: "rgba(91,95,239,0.25)" },
                                { from: "#00A896", to: "#5B5FEF", glow: "rgba(0,168,150,0.25)" },
                                { from: "#8B7BF7", to: "#00A896", glow: "rgba(139,123,247,0.25)" },
                                { from: "#5B5FEF", to: "#00A896", glow: "rgba(91,95,239,0.25)" },
                            ];
                            const accent = accents[i];
                            return (
                                <div
                                    key={p.title}
                                    className="group cursor-pointer"
                                    style={{ perspective: "1000px", height: "220px" }}
                                >
                                    <div
                                        style={{
                                            position: "relative",
                                            width: "100%",
                                            height: "100%",
                                            transformStyle: "preserve-3d",
                                            transition: "transform 0.7s cubic-bezier(0.4,0.2,0.2,1)",
                                        }}
                                        className="group-hover:[transform:rotateY(180deg)]"
                                    >
                                        {/* FRONT */}
                                        <div
                                            className="absolute inset-0 rounded-2xl p-7 flex flex-col border border-gray-100 shadow-md"
                                            style={{
                                                backgroundColor: "#ffffff",
                                                backfaceVisibility: "hidden",
                                                WebkitBackfaceVisibility: "hidden",
                                            }}
                                        >
                                            <div
                                                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shadow-lg"
                                                style={{ background: `linear-gradient(135deg, ${accent.from}, ${accent.to})` }}
                                            >
                                                <Icon size={24} className="text-white" />
                                            </div>
                                            <h3 className="font-display text-lg font-bold text-ink mb-2">{p.title}</h3>
                                            <p className="text-graphite text-sm leading-relaxed">{p.desc}</p>
                                        </div>

                                        {/* BACK */}
                                        <div
                                            className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center p-7"
                                            style={{
                                                background: `linear-gradient(135deg, ${accent.from}, ${accent.to})`,
                                                backfaceVisibility: "hidden",
                                                WebkitBackfaceVisibility: "hidden",
                                                transform: "rotateY(180deg)",
                                                boxShadow: `0 8px 32px -8px ${accent.glow}`,
                                            }}
                                        >
                                            <div
                                                className="w-20 h-20 rounded-3xl flex items-center justify-center mb-4"
                                                style={{ background: "rgba(255,255,255,0.2)" }}
                                            >
                                                <Icon size={40} className="text-white" />
                                            </div>
                                            <h3 className="font-display text-xl font-bold text-white text-center">{p.title}</h3>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ============ SERVICES ============ */}
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
                        <h2 className="font-display text-4xl md:text-5xl font-extrabold text-ink mt-3 leading-tight tracking-tight">
                            The reasons{" "}
                            <span className="text-gradient">clients stay.</span>
                        </h2>
                        <p className="text-graphite mt-4 leading-relaxed">
                            We're a small studio on purpose. It keeps us fast, honest, and close to the work.
                        </p>
                    </Reveal>
                    <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {whyUs.map((w, i) => {
                            const Icon = w.icon;
                            const accents = [
                                { from: "#5B5FEF", to: "#8B7BF7", glow: "rgba(91,95,239,0.15)", light: "rgba(91,95,239,0.08)" },
                                { from: "#00A896", to: "#5B5FEF", glow: "rgba(0,168,150,0.15)", light: "rgba(0,168,150,0.08)" },
                                { from: "#8B7BF7", to: "#00A896", glow: "rgba(139,123,247,0.15)", light: "rgba(139,123,247,0.08)" },
                            ];
                            const accent = accents[i];
                            return (
                                <div
                                    key={w.title}
                                    className="group relative rounded-2xl p-px overflow-hidden transition-all duration-300 hover:-translate-y-2"
                                    style={{
                                        background: `linear-gradient(135deg, ${accent.from}55, rgba(0,0,0,0.04))`,
                                        minHeight: "320px",
                                    }}
                                >
                                    <div
                                        className="relative rounded-2xl p-8 h-full flex flex-col"
                                        style={{ backgroundColor: "#ffffff", boxShadow: `0 8px 32px -8px ${accent.glow}` }}
                                    >
                                        <div
                                            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                            style={{ background: `radial-gradient(circle at 30% 0%, ${accent.light}, transparent 70%)` }}
                                        />
                                        <div
                                            className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                                            style={{
                                                background: `linear-gradient(135deg, ${accent.from}18, ${accent.to}18)`,
                                                border: `1.5px solid ${accent.from}33`,
                                            }}
                                        >
                                            <Icon size={26} style={{ color: accent.from }} />
                                        </div>
                                        <h3 className="font-display text-lg font-bold text-ink mb-3 relative">{w.title}</h3>
                                        <p className="text-graphite text-sm leading-relaxed relative flex-1">{w.desc}</p>
                                        <div
                                            className="mt-6 h-1 w-0 group-hover:w-full rounded-full transition-all duration-500"
                                            style={{ background: `linear-gradient(to right, ${accent.from}, ${accent.to})` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ============ PROCESS ============ */}
            <section className="relative py-24 overflow-hidden" style={{ backgroundColor: "#06070C" }}>
                <div className="grid-overlay-dark absolute inset-0 opacity-30" />
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] blur-[120px] opacity-15 pointer-events-none"
                    style={{ background: "radial-gradient(ellipse, #5B5FEF, transparent 70%)" }}
                />
                <div className="relative max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <p className="font-mono text-xs uppercase tracking-[0.25em] text-signal mb-4">How We Work</p>
                        <h2 className="font-display text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                            From idea to launch,{" "}
                            <span className="text-gradient">in four steps.</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {process.map((step, i) => (
                            <div
                                key={step.num}
                                className="group relative rounded-2xl p-px overflow-hidden transition-transform duration-300 hover:-translate-y-2"
                                style={{ background: "linear-gradient(135deg, rgba(91,95,239,0.4), rgba(255,255,255,0.04))" }}
                            >
                                <div
                                    className="relative rounded-2xl p-7 h-full flex flex-col"
                                    style={{ backgroundColor: "#10121C" }}
                                >
                                    <div
                                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                        style={{ background: "radial-gradient(circle at 50% 0%, rgba(91,95,239,0.18), transparent 70%)" }}
                                    />
                                    <div className="flex items-center justify-between mb-6 relative">
                                        <div className="w-9 h-9 rounded-xl bg-signal flex items-center justify-center font-mono text-xs font-bold text-white shadow-lg shadow-signal/30">
                                            {i + 1}
                                        </div>
                                        <span className="font-display text-5xl font-black text-white/5 group-hover:text-white/10 transition-colors">
                                            {step.num}
                                        </span>
                                    </div>
                                    <h3 className="font-display text-lg font-bold text-white mb-3 relative">{step.title}</h3>
                                    <p className="text-white/50 text-sm leading-relaxed relative">{step.desc}</p>
                                    <div className="mt-6 w-0 group-hover:w-full h-px bg-gradient-to-r from-signal to-violet transition-all duration-500" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

                        {/* ============ FOUNDERS ============ */}
            <Founders />

            {/* ============ PORTFOLIO ============ */}
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
                            { title: 'Retail Inventory', tag: 'Software', tint: 'from-signal/20 to-violet/20' },
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


            {/* ============ TESTIMONIALS ============ */}
            <section className="bg-paper py-24">
                <div className="max-w-6xl mx-auto px-6">
                    <Reveal>
                        <div className="text-center mb-14 max-w-2xl mx-auto">
                            <p className="font-mono text-xs uppercase tracking-[0.25em] text-signal mb-4">Testimonials</p>
                            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-ink tracking-tight">
                                What our <span className="text-gradient">clients say.</span>
                            </h2>
                        </div>
                    </Reveal>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { name: 'Abbas Ali', role: 'Business Owner', text: 'Komil delivered exactly what we needed — a fast, clean website that actually converts. Communication was smooth and the whole thing was done ahead of schedule.' },
                            { name: 'Sarfaraz', role: 'Client', text: 'The n8n automation he set up saved us hours of manual work every week. Everything just runs on its own now. Highly recommended for anyone drowning in repetitive tasks.' },
                            { name: 'Danish', role: 'Store Owner', text: 'Our online store looks premium and works flawlessly. He handled everything from design to payment setup, and was always available whenever we had questions.' },
                        ].map((t, i) => {
                            const accents = [
                                { from: '#5B5FEF', to: '#8B7BF7', glow: 'rgba(91,95,239,0.12)' },
                                { from: '#00A896', to: '#5B5FEF', glow: 'rgba(0,168,150,0.12)' },
                                { from: '#8B7BF7', to: '#00A896', glow: 'rgba(139,123,247,0.12)' },
                            ];
                            const accent = accents[i];
                            return (
                                <Reveal key={t.name} delay={i * 0.08}>
                                    <div className="group h-full bg-white border border-gray-100 rounded-2xl p-8 flex flex-col transition-all duration-300 hover:-translate-y-2"
                                         style={{ boxShadow: `0 8px 32px -12px ${accent.glow}` }}>
                                        <div className="flex gap-1 mb-5">
                                            {[...Array(5)].map((_, s) => (
                                                <svg key={s} width="15" height="15" viewBox="0 0 24 24" style={{ fill: accent.from }}>
                                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                                </svg>
                                            ))}
                                        </div>
                                        <p className="text-graphite text-sm leading-relaxed flex-1">"{t.text}"</p>
                                        <div className="flex items-center gap-3 mt-6 pt-5 border-t border-gray-100">
                                            <div className="w-11 h-11 rounded-full flex items-center justify-center font-display font-bold text-white shrink-0"
                                                 style={{ background: `linear-gradient(135deg, ${accent.from}, ${accent.to})` }}>
                                                {t.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-display font-bold text-ink text-sm">{t.name}</div>
                                                <div className="font-mono text-[0.65rem] uppercase tracking-wider text-graphite">{t.role}</div>
                                            </div>
                                        </div>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ============ FINAL CTA ============ */}
            <section className="relative bg-void text-paper py-28 overflow-hidden">
                                {/* Corner decorative images */}
                <img
                    src={ctaShape1}
                    alt=""
                    aria-hidden="true"
                    className="pointer-events-none select-none absolute top-0 left-0 z-0 w-40 md:w-110 opacity-80 -translate-x-30 -translate-y-30"
                />
                <img
                    src={ctaShape2}
                    alt=""
                    aria-hidden="true"
                    className="pointer-events-none select-none absolute bottom-0 right-0 z-0 w-40 md:w-110 opacity-80 translate-x-30 translate-y-30"
                />
                <div className="mesh-bg">
                    <div className="aurora absolute left-1/2 top-1/2 w-[60vw] h-[60vw] rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
                         style={{ background: 'radial-gradient(circle, rgba(91,95,239,0.25), transparent 60%)' }} />
                    <div className="grid-overlay-dark absolute inset-0 opacity-40" />
                </div>
    
                    <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
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