import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
    ChevronDown, ArrowUpRight, Phone, Code2, Bot, Megaphone, Server,
    Magnet, Lightbulb, Package, Calculator, Palette, Sparkles, Star
} from 'lucide-react';
import Reveal from '../../components/ui/Reveal.jsx';

import webMain from '../../assets/services/web-main.jpg';
import aiMain from '../../assets/services/ai-main.jpg';
import marketingMain from '../../assets/services/marketing-main.jpg';
import hostingMain from '../../assets/services/hosting-main.jpg';
import leadgenMain from '../../assets/services/leadgen-main.jpg';
import consultingMain from '../../assets/services/consulting-main.jpg';
import productsMain from '../../assets/services/products-main.jpg';
import accountingMain from '../../assets/services/accounting-main.jpg';
import designMain from '../../assets/services/design-main.jpg';

import fwRealEstate from '../../assets/services/fw-realestate.jpg';
import fwSellhive from '../../assets/projects/sellhive.jpg.jpg';
import fwEzitech from '../../assets/projects/ezitech.jpg.jpg';

const categoryImages = {
    'Web Development':    { main: webMain,        sub: null },
    'AI & Automation':   { main: aiMain,         sub: null },
    'Digital Marketing': { main: marketingMain,  sub: null },
    'Hosting & Support': { main: hostingMain,    sub: null },
    'Lead Generation':   { main: leadgenMain,    sub: null },
    'Consulting':        { main: consultingMain, sub: null },
    'Digital Products':  { main: productsMain,   sub: null },
    'Accounting':        { main: accountingMain, sub: null },
    'Design':            { main: designMain,     sub: null },
};

// Category order + icon + blurb (real SVG icons)
const categoryMeta = {
    'Web Development':   { icon: Code2,      blurb: 'Custom websites, stores, and web apps built to fit your business — not rigid templates.' },
    'AI & Automation':  { icon: Bot,        blurb: 'Automate the busywork and add real AI — chatbots, workflows, and voice agents.' },
    'Digital Marketing':{ icon: Megaphone,  blurb: 'Get found and convert — SEO, ads, email, and social that actually move numbers.' },
    'Hosting & Support':{ icon: Server,     blurb: 'Keep everything fast, secure, and running smoothly with managed support.' },
    'Lead Generation':  { icon: Magnet,     blurb: 'Fill your pipeline with qualified, ready-to-talk leads.' },
    'Consulting':       { icon: Lightbulb,  blurb: 'Expert guidance on tech, tools, and digital transformation.' },
    'Digital Products': { icon: Package,    blurb: 'Ready-made templates and boilerplates to move faster.' },
    'Accounting':       { icon: Calculator, blurb: 'Accurate Amazon accounting, reporting, and profit tracking.' },
    'Design':           { icon: Palette,    blurb: 'Branding and visuals that make your business memorable.' },
};
const categoryOrder = Object.keys(categoryMeta);


const testimonials = [
    { name: 'Abbas Ali', role: 'Business Owner', text: 'Komil delivered exactly what we needed — a fast, clean website that actually converts. Communication was smooth and the whole thing was done ahead of schedule.' },
    { name: 'Sarfaraz', role: 'Client', text: 'The n8n automation he set up saved us hours of manual work every week. Everything just runs on its own now. Highly recommended for anyone drowning in repetitive tasks.' },
    { name: 'Danish', role: 'Store Owner', text: 'Our online store looks premium and works flawlessly. He handled everything from design to payment setup, and was always available whenever we had questions.' },
];

const featuredWork = [
    { title: 'Real Estate Website', image: fwRealEstate, tags: ['Real Estate', 'Property', 'Template'], url: null },
    { title: 'Amazon Management Site', image: fwSellhive, tags: ['Client', 'Amazon', 'React'], url: 'https://sellhive.net/' },
    { title: 'Intern Management Portal', image: fwEzitech, tags: ['Company', 'Laravel', 'Web App'], url: 'https://portal.ezitech.org/' },
];

export default function Services() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openId, setOpenId] = useState(null);

    useEffect(() => {
        axios.get('/api/services')
            .then((res) => { setServices(res.data); setLoading(false); })
            .catch((err) => { console.error('Error fetching services:', err); setLoading(false); });
    }, []);

    const grouped = services.reduce((acc, s) => {
        const cat = s.category || 'Other';
        (acc[cat] = acc[cat] || []).push(s);
        return acc;
    }, {});
    const orderedCategories = Object.keys(grouped).sort((a, b) => {
        const ia = categoryOrder.indexOf(a);
        const ib = categoryOrder.indexOf(b);
        return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
    });

    return (
        <div className="bg-void text-paper overflow-hidden">

            {/* ===== HEADER ===== */}
            <section className="relative pt-36 pb-20 text-center overflow-hidden">
                <div className="grid-overlay-dark absolute inset-0 opacity-40" />
                <div className="aurora absolute left-1/2 -top-20 -translate-x-1/2 w-[55vw] h-[45vw] rounded-full blur-3xl"
                     style={{ background: 'radial-gradient(circle, rgba(91,95,239,0.22), transparent 60%)' }} />
                <div className="relative max-w-3xl mx-auto px-6">
                    <Reveal>
                        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6"
                             style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <Sparkles size={13} className="text-teal" />
                            <span className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-white/60">What we do</span>
                        </div>
                        <h1 className="font-display text-4xl md:text-6xl font-bold leading-[1.05]">
                            Our <span className="text-gradient">Services</span>
                        </h1>
                        <p className="text-white/55 mt-6 text-lg leading-relaxed">
                            We craft world-class digital experiences that elevate your brand and drive
                            results — from strategy to execution, with creativity and precision.
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* ===== CATEGORY SECTIONS ===== */}
            <section className="max-w-6xl mx-auto px-6 pb-24">
                {loading ? (
                    <div className="space-y-6">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-72 rounded-3xl bg-white/5 animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <div className="space-y-28">
                        {orderedCategories.map((category, idx) => {
                            const meta = categoryMeta[category] || { icon: Sparkles, blurb: '' };
                            const Icon = meta.icon;
                            const imgs = categoryImages[category] || { main: null, sub: null };
                            const reversed = idx % 2 === 1;

                            return (
                                <Reveal key={category}>
                                    <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${reversed ? 'lg:[direction:rtl]' : ''}`}>

                                        {/* ---- CONTENT ---- */}
                                        <div className="[direction:ltr]">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                                                     style={{ background: 'rgba(91,95,239,0.15)', border: '1px solid rgba(91,95,239,0.3)' }}>
                                                    <Icon size={20} className="text-signal" />
                                                </div>
                                                <h2 className="font-display text-2xl md:text-3xl font-bold">{category}</h2>
                                            </div>
                                            <p className="text-white/50 text-[0.95rem] leading-relaxed mb-7 max-w-md">
                                                {meta.blurb}
                                            </p>

                                            {/* Accordion — plain line style */}
                                            <div>
                                                {grouped[category].map((service) => {
                                                    const open = openId === service.id;
                                                    return (
                                                        <div key={service.id} className="border-b" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                                                            <button
                                                                onClick={() => setOpenId(open ? null : service.id)}
                                                                className="w-full flex items-center justify-between gap-4 py-4 text-left group"
                                                            >
                                                                <span className={`font-medium transition-colors ${open ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>
                                                                    {service.name}
                                                                </span>
                                                                <ChevronDown
                                                                    size={18}
                                                                    className={`shrink-0 transition-transform duration-300 ${open ? 'rotate-180 text-signal' : 'text-white/40'}`}
                                                                />
                                                            </button>
                                                            <div className="grid transition-all duration-300 ease-out"
                                                                 style={{ gridTemplateRows: open ? '1fr' : '0fr' }}>
                                                                <div className="overflow-hidden">
                                                                    <div className="pb-5">
                                                                        <p className="text-white/50 text-sm leading-relaxed mb-4">
                                                                            {service.description}
                                                                        </p>
                                                                        {Array.isArray(service.features) && service.features.length > 0 && (
                                                                            <ul className="space-y-2 mb-4">
                                                                                {service.features.map((f, i) => (
                                                                                    <li key={i} className="flex items-start gap-2.5 text-sm text-white/60">
                                                                                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-teal shrink-0" />
                                                                                        {f}
                                                                                    </li>
                                                                                ))}
                                                                            </ul>
                                                                        )}
                                                                        <Link to={`/services/${service.id}`}
                                                                              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-signal hover:text-teal transition-colors">
                                                                            Learn more <ArrowUpRight size={14} />
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {/* ---- VISUAL: layered images (or fallback) ---- */}
                                        <div className="[direction:ltr]">
                                            {imgs.main ? (
                                                <div className="relative pb-10 pr-10">
                                                    <img src={imgs.main} alt={category}
                                                         className="w-full rounded-2xl object-cover aspect-[4/3] shadow-2xl" />
                                                    <img
                                                        src={imgs.sub || imgs.main}
                                                        alt=""
                                                        aria-hidden="true"
                                                        className="absolute bottom-0 right-0 w-[45%] rounded-2xl object-cover aspect-square shadow-2xl"
                                                        style={{ border: '5px solid #06070C' }}
                                                    />
                                                </div>
                                            ) : (
                                                <div className="relative rounded-3xl overflow-hidden aspect-[4/3] flex items-center justify-center"
                                                     style={{ background: 'linear-gradient(135deg, rgba(91,95,239,0.18), rgba(0,168,150,0.12))', border: '1px solid rgba(255,255,255,0.08)' }}>
                                                    <div className="grid-overlay-dark absolute inset-0 opacity-30" />
                                                    <div className="aurora absolute w-[60%] h-[60%] rounded-full blur-3xl"
                                                         style={{ background: 'radial-gradient(circle, rgba(139,123,247,0.35), transparent 65%)' }} />
                                                    <Icon size={96} className="relative text-white/80" strokeWidth={1.2} />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                )}
            </section>

            {/* ===== "LET'S CREATE" BANNER ===== */}
            <section className="max-w-6xl mx-auto px-6 pb-24">
                <Reveal>
                    <div className="relative rounded-3xl px-8 py-16 md:p-20 overflow-hidden"
                         style={{ background: 'linear-gradient(120deg, rgba(91,95,239,0.25), rgba(6,7,12,0.4) 60%)', border: '1px solid rgba(255,255,255,0.08)' }}>
                        <div className="aurora absolute -top-10 -left-10 w-80 h-80 rounded-full blur-3xl"
                             style={{ background: 'radial-gradient(circle, rgba(91,95,239,0.4), transparent 60%)' }} />
                        <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
                            <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight max-w-xl">
                                Let's Create Something<br />Amazing Together!
                            </h2>
                            <Link to="/contact"
                                  className="inline-flex items-center gap-2 bg-white text-ink px-7 py-4 rounded-full font-medium hover:bg-signal hover:text-white transition-colors shrink-0">
                                Schedule a Call <Phone size={16} />
                            </Link>
                        </div>
                    </div>
                </Reveal>
            </section>

            {/* ===== TESTIMONIALS ===== */}
            <section className="max-w-6xl mx-auto px-6 pb-28">
                <Reveal>
                    <div className="text-center mb-14">
                        <h2 className="font-display text-3xl md:text-4xl font-bold">What Our Clients Say</h2>
                        <p className="text-white/50 mt-3">Real feedback from the people we've built for.</p>
                    </div>
                </Reveal>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((t, i) => (
                        <Reveal key={t.name} delay={i * 0.08}>
                            <div className="h-full rounded-2xl p-7 flex flex-col"
                                 style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, s) => (
                                        <Star key={s} size={14} className="text-teal" fill="currentColor" />
                                    ))}
                                </div>
                                <p className="text-white/70 text-sm leading-relaxed flex-1">"{t.text}"</p>
                                <div className="flex items-center gap-3 mt-6 pt-5 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-white shrink-0"
                                         style={{ background: 'linear-gradient(135deg, #5B5FEF, #00A896)' }}>
                                        {t.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-medium text-white text-sm">{t.name}</div>
                                        <div className="font-mono text-[0.65rem] uppercase tracking-wider text-white/40">{t.role}</div>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* ===== OUR FEATURED WORK ===== */}
            <section className="max-w-6xl mx-auto px-6 pb-24">
                <Reveal>
                    <div className="text-center mb-14 max-w-2xl mx-auto">
                        <h2 className="font-display text-3xl md:text-4xl font-bold">Our Featured Work</h2>
                        <p className="text-white/50 mt-3 leading-relaxed">
                            A curated selection of projects where creativity meets strategy. Explore
                            how we craft visually stunning and user-friendly digital experiences.
                        </p>
                    </div>
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                    {featuredWork.map((work, i) => {
                        const featured = i === 1; // middle one prominent
                        return (
                            <Reveal key={work.title} delay={i * 0.08}>
                                <div className={featured ? 'md:scale-105 md:z-10' : 'md:opacity-90'}>
                                    <a
                                        href={work.url || undefined}
                                        target={work.url ? '_blank' : undefined}
                                        rel={work.url ? 'noopener noreferrer' : undefined}
                                        className={`group block ${work.url ? '' : 'cursor-default'}`}
                                    >
                                        {/* image / preview */}
                                        <div className="relative rounded-2xl overflow-hidden aspect-[4/3] mb-5"
                                             style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                                            {work.image ? (
                                                <img src={work.image} alt={work.title}
                                                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center relative"
                                                     style={{ background: 'linear-gradient(135deg, rgba(91,95,239,0.2), rgba(0,168,150,0.12))' }}>
                                                    <div className="grid-overlay-dark absolute inset-0 opacity-30" />
                                                    <span className="relative font-display text-5xl font-bold text-white/15">0{i + 1}</span>
                                                </div>
                                            )}
                                        </div>
                                        {/* tags */}
                                        <div className="flex flex-wrap items-center gap-2 mb-3">
                                            {work.tags.map((t) => (
                                                <span key={t} className="font-mono text-[0.62rem] uppercase tracking-wider px-2.5 py-1 rounded-full text-white/60"
                                                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
                                                    {t}
                                                </span>
                                            ))}
                                            {work.url && (
                                                <span className="inline-flex items-center gap-1 font-mono text-[0.62rem] uppercase tracking-wider text-signal group-hover:text-teal transition-colors">
                                                    Visit <ArrowUpRight size={12} />
                                                </span>
                                            )}
                                        </div>
                                        {/* title */}
                                        <h3 className="font-display text-lg font-semibold text-white">{work.title}</h3>
                                    </a>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>

                {/* view all */}
                <Reveal>
                    <div className="text-center mt-12">
                        <Link to="/portfolio" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-white/60 hover:text-white transition-colors">
                            View all work <ArrowUpRight size={14} />
                        </Link>
                    </div>
                </Reveal>
            </section>
        </div>
    );
}