import Seo from '../../components/ui/Seo.jsx';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Bot, Code2, Smartphone, ShoppingCart, Settings, ArrowRight, ArrowUpRight, Sparkles, Zap, ShieldCheck } from 'lucide-react';
import Reveal from '../../components/ui/Reveal.jsx';
import TiltCard from '../../components/ui/TiltCard.jsx';
import MagneticButton from '../../components/ui/MagneticButton.jsx';
import { Hero } from '../../components/sections/Hero';
import ctaShape1 from "../../assets/ns-img-500.png";
import ctaShape2 from "../../assets/ns-img-505.png";
import { Founders } from '../../components/sections/Founders';
import FreeAudit from '../../components/sections/FreeAudit.jsx';
import CountUp from '../../components/ui/CountUp.jsx';
import imgSellhive from '../../assets/projects/sellhive.jpg.jpg';
import imgEzitech from '../../assets/projects/ezitech.jpg.jpg';
import { Users, Layers, Clock, Code2 as CodeIcon } from 'lucide-react';


const pillars = [
    { icon: Bot, title: 'AI and Automation', featured: true, desc: 'AI chatbots, n8n workflows and WhatsApp automation that take repetitive work off your team and reply to customers in seconds.', chips: ['AI Chatbots', 'n8n Workflows', 'WhatsApp Automation'] },
    { icon: Code2, title: 'Web Development', desc: 'Custom websites and web apps that load fast and turn visitors into customers.', chips: ['Business sites', 'Web apps', 'SEO ready'] },
    { icon: Smartphone, title: 'Mobile Apps', desc: 'Android and iOS apps from a single codebase, built with Flutter.', chips: ['Flutter', 'Android', 'iOS'] },
    { icon: ShoppingCart, title: 'E-Commerce', desc: 'Online stores with secure payments, inventory and order management built in.', chips: ['Stores', 'Payments', 'Inventory'] },
    { icon: Settings, title: 'Business Software', desc: 'CRMs, dashboards and accounting tools built around how your team actually works.', chips: ['CRM', 'Dashboards', 'Accounting'] },
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

const marqueeItems = ['Clinics and Healthcare', 'Real Estate', 'E-commerce Stores', 'Restaurants', 'Schools and Institutes', 'Amazon Sellers', 'Startups', 'Agencies'];
const marqueeServices = ['AI Chatbots', 'n8n Automation', 'WhatsApp Automation', 'Custom Websites', 'Mobile Apps', 'E-commerce', 'SEO', 'Cloudflare Security', 'Cloud Hosting'];

const featured = [
    {
        title: 'SellHive',
        tag: 'Client · Website + accounting system',
        result: 'Lead-focused website and business accounting system for an Amazon ads agency.',
        image: imgSellhive,
        href: 'https://sellhive.net',
    },
    {
        title: 'Ezitech Intern Portal',
        tag: 'Web platform · Built at Ezitech',
        result: 'Runs a full internship program: 15,800+ interns trained and 6,700+ active on the platform.',
        image: imgEzitech,
        href: 'https://portal.ezitech.org',
    },
    {
        title: 'AI Website Audit',
        tag: 'Our product · AI automation',
        result: 'Checks any website with Google PageSpeed and AI, then emails a full report in about 2 minutes.',
        image: null,
        href: '/free-audit',
    },
];

export default function Home() {
    const [services, setServices] = useState([]);
    const [serviceCat, setServiceCat] = useState('All');

    useEffect(() => {
        axios.get('/api/services')
            .then((res) => setServices(res.data))
            .catch(() => {});
    }, []);

    return (
         <>
        <Seo path="/" title="AKCLNT — Web Development, AI Automation & Digital Marketing in Pakistan" description="AKCLNT is a Pakistan-based software studio offering web development, AI automation, digital marketing, and hosting for businesses at home and worldwide. Get a free consultation." />
        <div className="overflow-hidden">
            <Hero />

            {/* ============ TECH MARQUEE ============ */}
            <section className="bg-ink border-y border-white/10 py-5 overflow-hidden space-y-3">
                <div className="marquee-mask">
                    <div className="marquee-track flex gap-10 w-max">
                        {[...marqueeItems, ...marqueeItems].map((item, i) => (
                            <span key={i} className="font-mono text-sm text-white/40 uppercase tracking-wider whitespace-nowrap flex items-center gap-10">
                                {item} <span className="text-signal">◆</span>
                            </span>
                        ))}
                    </div>
                </div>
                <div className="marquee-mask">
                    <div className="marquee-track-reverse flex gap-10 w-max">
                        {[...marqueeServices, ...marqueeServices].map((item, i) => (
                            <span key={i} className="font-mono text-sm text-white/70 uppercase tracking-wider whitespace-nowrap flex items-center gap-10">
                                {item} <span className="text-teal">◆</span>
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============ PILLARS ============ */}
            <section className="relative py-24 overflow-hidden bg-white">
                <div className="relative max-w-6xl mx-auto px-6">
                    <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
                        <div className="max-w-2xl">
                            <p className="font-mono text-xs uppercase tracking-[0.25em] text-signal mb-4">What We Do</p>
                            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-ink tracking-tight">
                                Five disciplines.{" "}<span className="text-gradient">One team that ships.</span>
                            </h2>
                            <p className="text-graphite mt-4 leading-relaxed">
                                From your first website to AI that answers your customers at 2 a.m., everything is built in-house by the same team.
                            </p>
                        </div>
                        <Link to="/services" className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-signal hover:gap-2.5 transition-all">
                            All services <ArrowRight size={14} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {pillars.map((p) => {
                            const Icon = p.icon;
                            if (p.featured) {
                                return (
                                    <Link key={p.title} to="/services"
                                        className="group relative md:col-span-2 rounded-3xl bg-void text-paper p-8 md:p-10 overflow-hidden transition-transform duration-300 hover:-translate-y-1">
                                        <div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-signal/30 blur-3xl" />
                                        <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 left-10 h-56 w-56 rounded-full bg-teal/20 blur-3xl" />
                                        <div className="relative">
                                            <div className="flex items-center justify-between gap-4">
                                                <span className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center"><Icon size={22} className="text-teal" /></span>
                                                <span className="font-mono text-[0.65rem] uppercase tracking-wider text-teal bg-teal/10 px-3 py-1 rounded-full">Most requested</span>
                                            </div>
                                            <h3 className="font-display text-2xl md:text-3xl font-bold mt-6">{p.title}</h3>
                                            <p className="text-white/60 mt-3 max-w-lg leading-relaxed">{p.desc}</p>
                                            <div className="mt-8 flex flex-wrap items-center gap-2 font-mono text-xs">
                                                {['New WhatsApp message', 'AI replies instantly', 'Lead saved and team notified'].map((step, i, arr) => (
                                                    <React.Fragment key={step}>
                                                        <span className="rounded-full border border-white/15 bg-white/5 px-3.5 py-2 text-white/80">{step}</span>
                                                        {i < arr.length - 1 && <span className="text-signal">→</span>}
                                                    </React.Fragment>
                                                ))}
                                            </div>
                                            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                                                <div className="flex flex-wrap gap-2">
                                                    {p.chips.map((c) => (
                                                        <span key={c} className="text-xs font-medium text-white/70 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">{c}</span>
                                                    ))}
                                                </div>
                                                <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-signal group-hover:gap-2.5 transition-all">
                                                    Explore <ArrowUpRight size={14} />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            }
                            return (
                                <Link key={p.title} to="/services"
                                    className="group relative rounded-3xl border border-gray-200 bg-white p-7 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-signal/40 hover:shadow-[0_20px_50px_-20px_rgba(91,95,239,0.35)]">
                                    <span className="w-12 h-12 rounded-2xl bg-signal/10 flex items-center justify-center transition-colors group-hover:bg-signal">
                                        <Icon size={22} className="text-signal transition-colors group-hover:text-white" />
                                    </span>
                                    <h3 className="font-display text-xl font-bold text-ink mt-6">{p.title}</h3>
                                    <p className="text-graphite text-sm leading-relaxed mt-2 flex-1">{p.desc}</p>
                                    <div className="mt-6 flex flex-wrap gap-2">
                                        {p.chips.map((c) => (
                                            <span key={c} className="text-xs text-graphite bg-gray-100 px-2.5 py-1 rounded-full">{c}</span>
                                        ))}
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

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
                        {featured.map((item, i) => {
                            const external = item.href.startsWith('http');
                            const Card = (
                                <div className="group h-full rounded-2xl overflow-hidden border border-white/10 bg-ink-soft flex flex-col transition-colors hover:border-signal/50">
                                    <div className="relative aspect-[16/10] overflow-hidden bg-void">
                                        {item.image ? (
                                            <img src={item.image} alt={`${item.title} screenshot`} loading="lazy"
                                                className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]" />
                                        ) : (
                                            <div className="h-full w-full flex items-center justify-center gap-4 bg-gradient-to-br from-signal/20 to-teal/10">
                                                {[{ v: 92, c: 'var(--color-teal)', l: 'Speed' }, { v: 81, c: '#F5A524', l: 'SEO' }, { v: 64, c: '#F5A524', l: 'Access.' }].map((r) => (
                                                    <div key={r.l} className="flex flex-col items-center gap-1.5">
                                                        <div className="h-14 w-14 rounded-full border-4 flex items-center justify-center font-display font-bold text-paper" style={{ borderColor: r.c }}>{r.v}</div>
                                                        <span className="font-mono text-[0.6rem] uppercase tracking-wider text-white/50">{r.l}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6 flex flex-col flex-1">
                                        <span className="font-mono text-xs text-teal">{item.tag}</span>
                                        <h3 className="font-display text-lg font-semibold text-paper mt-2">{item.title}</h3>
                                        <p className="text-white/55 text-sm leading-relaxed mt-2 flex-1">{item.result}</p>
                                        <span className="inline-flex items-center gap-1.5 mt-4 font-mono text-xs uppercase tracking-wider text-signal">
                                            {external ? 'View live' : 'Try it free'} <ArrowUpRight size={14} />
                                        </span>
                                    </div>
                                </div>
                            );
                            return (
                                <Reveal key={item.title} delay={i * 0.1}>
                                    {external
                                        ? <a href={item.href} target="_blank" rel="noopener noreferrer" className="block h-full">{Card}</a>
                                        : <Link to={item.href} className="block h-full">{Card}</Link>}
                                </Reveal>
                            );
                        })}
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
                            { name: 'Muhammad Ishfaq', role: 'Founder, SellHive', text: 'We needed a website that brings in leads and a proper system to manage our accounts. akclnt built both. The site looks professional, the accounting system saves us hours every month, and Komil was always quick to reply whenever we needed a change.' },
                            { name: 'Sarfaraz', role: 'Founder, SoftwayHub', text: 'We partnered with akclnt on an AI chatbot for one of our client projects. Komil understood the requirements quickly, kept us updated throughout and delivered a working solution on time. A reliable team to work with.' },
                            { name: 'Syed Murtaza', role: 'Founder, E-commerce Startup', text: 'We were just starting out and needed an online store that looks trustworthy from day one. akclnt built it quickly, set up everything from products to payments, and explained how to manage it ourselves. Great support for a new business.' },
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

            {/* ============ SERVICES ============ */}
            {services.length > 0 && (() => {
                const counts = services.reduce((acc, s) => { const c = s.category || 'Other'; acc[c] = (acc[c] || 0) + 1; return acc; }, {});
                const cats = ['All', ...Object.keys(counts).sort((a, b) => counts[b] - counts[a])];
                const list = serviceCat === 'All' ? services : services.filter((s) => (s.category || 'Other') === serviceCat);
                const shown = list.slice(0, 8);
                const more = list.length - shown.length;
                return (
                <section className="relative bg-void text-paper py-24 overflow-hidden">
                    <div className="grid-overlay-dark absolute inset-0 opacity-50" />
                    <div aria-hidden="true" className="pointer-events-none absolute -top-20 -right-20 h-[28rem] w-[28rem] rounded-full bg-signal/20 blur-3xl" />
                    <div aria-hidden="true" className="pointer-events-none absolute bottom-0 -left-24 h-80 w-80 rounded-full bg-teal/10 blur-3xl" />
                    <div className="relative max-w-6xl mx-auto px-6">
                        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
                            <div>
                                <span className="font-mono text-xs uppercase tracking-wider text-teal">Full service list</span>
                                <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight mt-3">
                                    Everything we <span className="text-gradient">offer.</span>
                                </h2>
                                <p className="text-white/55 mt-3">
                                    {services.length} services across {Object.keys(counts).length} categories, all under one roof.
                                </p>
                            </div>
                            <Link to="/services" className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-white/70 hover:text-white transition-colors">
                                View all <ArrowRight size={14} />
                            </Link>
                        </div>

                        {/* category tabs */}
                        <div className="-mx-6 px-6 overflow-x-auto no-scrollbar pb-2 mb-8 md:mx-0 md:px-0 md:overflow-visible">
                            <div className="flex gap-2 w-max md:w-auto md:flex-wrap">
                                {cats.map((c) => (
                                    <button key={c} onClick={() => setServiceCat(c)} aria-pressed={serviceCat === c}
                                        className={`whitespace-nowrap text-xs font-medium px-4 py-2 rounded-full border transition-colors ${
                                            serviceCat === c ? 'bg-white text-ink border-white' : 'border-white/15 text-white/60 hover:border-white/40 hover:text-white'
                                        }`}>
                                        {c}<span className="ml-1.5 opacity-50">{c === 'All' ? services.length : counts[c]}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {shown.map((s) => (
                                <Link key={s.id} to={`/services/${s.id}`}
                                    className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-5 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-signal/50 hover:bg-white/[0.06]">
                                    <div className="flex items-start justify-between">
                                        <span className="text-2xl w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">{s.icon}</span>
                                        <ArrowUpRight size={16} className="text-teal opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                    </div>
                                    <span className="mt-4 font-mono text-[0.6rem] uppercase tracking-wider text-teal">{s.category}</span>
                                    <h3 className="font-display font-semibold text-paper mt-1">{s.name}</h3>
                                    <p className="text-white/50 text-sm leading-relaxed mt-2 line-clamp-2 flex-1">{s.description}</p>
                                    {Array.isArray(s.features) && s.features.length > 0 && (
                                        <div className="mt-4 flex flex-wrap gap-1.5">
                                            {s.features.slice(0, 2).map((f) => (
                                                <span key={f} className="text-[0.7rem] text-white/60 bg-white/5 px-2 py-0.5 rounded-full">{f}</span>
                                            ))}
                                        </div>
                                    )}
                                </Link>
                            ))}
                            {more > 0 && (
                                <Link to="/services"
                                    className="group rounded-2xl border border-dashed border-white/20 p-5 flex flex-col items-center justify-center text-center transition-colors hover:border-signal/60">
                                    <span className="font-display text-3xl font-bold text-paper">+{more}</span>
                                    <span className="text-sm text-white/55 mt-1">more services</span>
                                    <span className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-signal">See all <ArrowRight size={14} /></span>
                                </Link>
                            )}
                        </div>

                        {/* help strip */}
                        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6 flex flex-wrap items-center justify-between gap-4">
                            <p className="text-white/70">
                                <span className="text-paper font-semibold">Not sure what you need?</span> Tell us the problem and we will suggest the right service.
                            </p>
                            <Link to="/contact" className="btn-primary rounded-full px-6 py-3 text-sm font-semibold">Get a free consultation</Link>
                        </div>
                    </div>
                </section>
                );
            })()}

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
            <FreeAudit />

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
           </>
    );
}