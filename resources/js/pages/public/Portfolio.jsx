import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '../../components/ui/Reveal.jsx';
import TiltCard from '../../components/ui/TiltCard.jsx';
import imgQuotex from '../../assets/projects/aibot_pradition.jpg.jpg';
import imgLocalMarket from '../../assets/projects/localemarket_website.jpg.jpg';
import imgMyApp from '../../assets/projects/blogpost_website.jpg.jpg';
import imgSmartServe from '../../assets/projects/smart_services_website.jpg.jpg';
import imgFlexiPDF from '../../assets/projects/flexipdf.jpg.jpg';
import imgAutomation from '../../assets/projects/n8nautomation2.jpg.jpg';
import imgEzitech from '../../assets/projects/ezitech.jpg.jpg';
import imgSellHive from '../../assets/projects/sellhive.jpg.jpg';
import imgSuperPdf from '../../assets/projects/superpdf.png';
import imgEziDownload from '../../assets/projects/ezidownload.png';
import imgQissa from '../../assets/projects/qissa.jpg';
import imgMedflow from '../../assets/projects/medflow.jpg';
import imgAyyanPortfolio from '../../assets/projects/portfolio-ayan.jpg';

const projects = [
  
    {
        id: 1,
        title: 'Intern Management Platform',
        category: 'Company',
        image: imgEzitech,
        description: 'An internal platform to manage interns, track progress, assign tasks, and issue certificates — used daily by a growing training institute.',
        tags: ['Laravel', 'React', 'Cloudinary'],
    },
    {
        id: 2,
        title: 'SellHive — Amazon Management',
        category: 'Client',
        image: imgSellHive,
        description: 'A marketing site for a founder-led Amazon management service, with a free-audit lead flow and performance highlights.',
        tags: ['React', 'Vite', 'Landing Page'],
    },
    {
        id: 3,
        title: 'SmartServe — Services Booking',
        category: 'Client',
        image: imgSmartServe,
        description: 'A platform to book verified professionals for home and business services, with a bookings dashboard and sign-up flow.',
        tags: ['React', 'Laravel', 'Bookings'],
    },
    {
        id: 4,
        title: 'Local E-Market',
        category: 'Client',
        image: imgLocalMarket,
        description: 'An e-commerce storefront with product catalog, cart, deals, and wishlist for a local marketplace.',
        tags: ['React', 'E-Commerce', 'Tailwind'],
    },
    {
        id: 5,
        title: 'FlexiPDF — PDF Tools',
        category: 'Personal',
        image: imgFlexiPDF,
        description: 'A PDF toolkit to convert and manage files — PDF↔Word, PDF to image, image to PDF — plus a built-in chatbot.',
        tags: ['Python', 'Flask', 'PDF'],
    },
    {
        id: 6,
        title: 'MyApp — Web Platform',
        category: 'Personal',
        image: imgMyApp,
        description: 'A full-stack web app with dashboard, chatbot, post uploads, and authentication — built as an all-in-one starter platform.',
        tags: ['React', 'Node.js', 'Auth'],
    },
    {
        id: 7,
        title: 'Quotex AI Predictor Bot',
        category: 'client',
        image: imgQuotex,
        description: 'A Telegram bot that analyses market data and generates trading signals in real time, with asset and timeframe selection.',
        tags: ['Python', 'Telegram API', 'Automation'],
    },
    {
        id: 8,
        title: 'Auto LinkedIn Posting Workflow',
        category: 'client',
        image: imgAutomation,
        description: 'An n8n automation that pulls a daily post from a database and publishes it to LinkedIn on a schedule via HTTP requests.',
        tags: ['n8n', 'Automation', 'API'],
    },
        {
        id: 9,
        title: 'Super PDF — Mobile App',
        category: 'Company',
        image: imgSuperPdf,
        description: 'A Flutter PDF toolkit with merge, split, compress, OCR scanning, AI summarisation, format conversion, and digital signatures — backed by a Laravel API on cPanel.',
        tags: ['Flutter', 'Laravel', 'OCR'],
    },
    {
        id: 10,
        title: 'EziDownload — Media Downloader',
        category: 'Company',
        image: imgEziDownload,
        description: 'A multi-platform media downloader for TikTok, YouTube, Instagram, and Facebook, built in Flutter with a Laravel backend on VPS using yt-dlp and FFmpeg.',
        tags: ['Flutter', 'Laravel', 'FFmpeg'],
    },
     {
        id: 11,
        title: 'QISSA — E-Commerce Platform',
        category: 'Personal',
        image: imgQissa,
        description: 'A full-stack ethnic fashion store with authentication, product management, cart and wishlist, Stripe checkout, admin panel, and AI-powered outfit recommendations.',
        tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    },
    {
        id: 12,
        title: 'MEDFLOW — B2B Pharma Platform',
        category: 'Personal',
        image: imgMedflow,
        description: 'A B2B pharmaceutical marketplace connecting buyers, suppliers, and admins with role-based access, quotation requests, and an AI chatbot for orders and shipping.',
        tags: ['React', 'PostgreSQL', 'TypeORM', 'AI'],
    },
  
];

const categories = ['All', 'Company', 'Client', 'Personal'];

export default function Portfolio() {
    const [filter, setFilter] = useState('All');
    const visible = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

    return (
        <div className="overflow-hidden">
                      {/* Header */}
            <section className="relative bg-void text-paper pt-36 pb-28 overflow-hidden">
                <div className="mesh-bg">
                    <div className="grid-overlay-dark absolute inset-0 opacity-60" />
                    <div className="aurora absolute w-[45vw] h-[45vw] rounded-full blur-3xl top-0 -left-10"
                         style={{ background: 'radial-gradient(circle, rgba(0,168,150,0.22), transparent 60%)' }} />
                    <div className="aurora absolute w-[40vw] h-[40vw] rounded-full blur-3xl top-10 right-0"
                         style={{ background: 'radial-gradient(circle, rgba(91,95,239,0.20), transparent 60%)' }} />
                </div>

                <div className="relative max-w-6xl mx-auto px-6">
                    <Reveal>
                        {/* eyebrow badge */}
                        <div className="inline-flex items-center gap-2.5 rounded-full pl-2.5 pr-4 py-1.5 mb-7"
                             style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-teal opacity-75 animate-ping" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal" />
                            </span>
                            <span className="font-mono text-[0.68rem] font-semibold tracking-[0.22em] text-white/70 uppercase">
                                Our work
                            </span>
                        </div>

                        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold max-w-3xl leading-[1.03] tracking-[-0.02em]">
                            A few things<br />we've <span className="text-gradient">shipped.</span>
                        </h1>

                        <p className="text-white/55 mt-6 max-w-xl text-lg leading-relaxed">
                            Real projects, built for real businesses — company platforms,
                            client websites, and tools we've shipped end to end.
                        </p>

                        {/* mini stats */}
                        <div className="mt-10 flex flex-wrap items-center gap-6">
                            {[
                                { value: '60+', label: 'Projects' },
                                { value: '3', label: 'Categories' },
                                { value: '24h', label: 'Response' },
                            ].map((s, i) => (
                                <div key={s.label} className="flex items-center gap-6">
                                    {i > 0 && <span className="h-8 w-px bg-white/10" />}
                                    <div>
                                        <div className="font-display text-2xl font-bold text-white leading-none">{s.value}</div>
                                        <div className="mt-1.5 font-mono text-[0.65rem] uppercase tracking-wider text-white/45">{s.label}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Filters + grid */}
            <section className="max-w-6xl mx-auto px-6 py-20">
                <Reveal>
                    <div className="flex flex-wrap gap-2 mb-12">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`font-mono text-xs uppercase tracking-wider px-4 py-2 rounded-full border transition-colors ${
                                    filter === cat
                                        ? 'bg-ink text-paper border-ink'
                                        : 'bg-transparent text-graphite border-mist hover:border-ink'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {visible.map((project, i) => (
                        <Reveal key={project.id} delay={(i % 2) * 0.08}>
                            <TiltCard max={7} className="h-full">
                                <div className="group relative h-full flex flex-col bg-white border border-mist rounded-2xl overflow-hidden hover:border-signal transition-colors">
                                    {/* preview banner */}
                                                                     <div className="relative h-48 overflow-hidden bg-ink">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            loading="lazy"
                                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                                        <span className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-wider text-white glass-dark px-2.5 py-1 rounded-full">
                                            {project.category}
                                        </span>
                                    </div>
                                    <div className="p-7 flex flex-col flex-1">
                                        <h2 className="font-display text-xl font-semibold text-ink mb-3">{project.title}</h2>
                                        <p className="text-graphite text-sm leading-relaxed mb-5 flex-1">{project.description}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.map((tag) => (
                                                <span key={tag} className="font-mono text-xs bg-signal-dim text-signal px-2.5 py-1 rounded-full">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
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
                             style={{ background: 'radial-gradient(circle, rgba(91,95,239,0.2), transparent 60%)' }} />
                        <div className="relative">
                            <h2 className="font-display text-2xl md:text-3xl font-semibold max-w-md mx-auto">
                                Want something like this for your business?
                            </h2>
                            <Link to="/contact" className="inline-flex items-center gap-2 mt-7 bg-white text-ink px-7 py-3.5 rounded-full font-medium hover:bg-signal hover:text-white transition-colors">
                                Start a Conversation <ArrowUpRight size={16} />
                            </Link>
                        </div>
                    </div>
                </Reveal>
            </section>
        </div>
    );
}
