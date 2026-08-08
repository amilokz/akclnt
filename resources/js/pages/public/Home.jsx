import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Code2, Smartphone, ShoppingCart, Settings, ArrowRight } from 'lucide-react';
import Reveal from '../../components/ui/Reveal.jsx';

const codeLines = [
    { text: 'const client = {', indent: 0 },
    { text: 'name: "your business",', indent: 1 },
    { text: 'goal: "grow online",', indent: 1 },
    { text: 'status: "ready to build"', indent: 1 },
    { text: '};', indent: 0 },
];

function TerminalCard() {
    const [visibleLines, setVisibleLines] = useState(0);

    useEffect(() => {
        if (visibleLines < codeLines.length) {
            const timer = setTimeout(() => setVisibleLines(visibleLines + 1), 400);
            return () => clearTimeout(timer);
        }
    }, [visibleLines]);

    return (
        <div className="bg-ink rounded-2xl shadow-2xl overflow-hidden w-full max-w-md">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]"></span>
                <span className="font-mono text-xs text-graphite ml-2">project.js</span>
            </div>
            <div className="p-6 font-mono text-sm leading-relaxed min-h-[180px]">
                {codeLines.slice(0, visibleLines).map((line, i) => (
                    <div key={i} style={{ paddingLeft: `${line.indent * 1.25}rem` }}>
                        <span className="text-signal">{line.text}</span>
                    </div>
                ))}
                {visibleLines < codeLines.length && (
                    <span className="inline-block w-2 h-4 bg-teal cursor-blink"></span>
                )}
            </div>
        </div>
    );
}

const pillars = [
    { icon: Code2, title: 'Web Development', desc: 'Custom sites and web apps that load fast and actually convert visitors.' },
    { icon: Smartphone, title: 'Mobile Apps', desc: 'Cross-platform apps for iOS and Android, built with a single codebase.' },
    { icon: ShoppingCart, title: 'E-Commerce', desc: 'Online stores with secure payments, inventory, and order management.' },
    { icon: Settings, title: 'Business Software', desc: 'CRMs, internal tools, and systems built around how your team works.' },
];

const process = [
    { num: '01', title: 'Discover', desc: 'We understand your business and map out exactly what needs to be built.' },
    { num: '02', title: 'Build', desc: 'Our team designs and develops your solution, keeping you updated at every step.' },
    { num: '03', title: 'Launch', desc: 'We deploy, test, and hand over a product ready to grow your business.' },
];

const stats = [
    { value: '6', label: 'People on the team' },
    { value: '7', label: 'Service lines' },
    { value: '24hr', label: 'Average response time' },
    { value: 'Laravel + React', label: 'Core tech stack' },
];

export default function Home() {
    const [services, setServices] = useState([]);

    useEffect(() => {
        axios.get('/api/services')
            .then((res) => setServices(res.data.slice(0, 4)))
            .catch(() => {});
    }, []);

    return (
        <div className="overflow-hidden">
            {/* Hero */}
            <section className="relative max-w-6xl mx-auto px-6 pt-16 pb-24">
                <div className="mesh-bg">
                    <div className="blob absolute w-96 h-96 bg-signal/10 rounded-full blur-3xl -top-20 -left-20"></div>
                    <div className="blob-delay absolute w-96 h-96 bg-teal/10 rounded-full blur-3xl top-40 right-0"></div>
                </div>

                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="animate-[fadeInUp_0.7s_ease]">
                        <span className="font-mono text-xs uppercase tracking-wider text-signal">
                            Software & Web Development
                        </span>
                        <h1 className="font-display text-4xl md:text-5xl font-semibold text-ink mt-4 leading-tight">
                            We turn your idea into working software.
                        </h1>
                        <p className="text-graphite mt-5 text-lg max-w-md">
                            Akclnt builds websites, apps, and business software for companies
                            that need something that actually works — not just looks good.
                        </p>
                        <div className="flex gap-4 mt-8">
                            <Link
                                to="/contact"
                                className="bg-ink text-paper px-6 py-3 rounded-lg font-medium hover:bg-signal transition inline-flex items-center gap-2"
                            >
                                Start a Project <ArrowRight size={16} />
                            </Link>
                            <Link
                                to="/services"
                                className="border border-mist text-ink px-6 py-3 rounded-lg font-medium hover:border-ink transition"
                            >
                                View Services
                            </Link>
                        </div>
                    </div>

                    <div className="flex justify-center md:justify-end animate-[fadeInUp_0.7s_ease_0.2s_backwards]">
                        <TerminalCard />
                    </div>
                </div>
            </section>

            {/* Stats bar */}
            <Reveal>
                <section className="border-y border-mist bg-paper">
                    <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat) => (
                            <div key={stat.label}>
                                <div className="font-display text-2xl md:text-3xl font-semibold text-ink">
                                    {stat.value}
                                </div>
                                <div className="text-graphite text-sm mt-1">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </section>
            </Reveal>

            {/* Capability pillars */}
            <section className="max-w-6xl mx-auto px-6 py-24">
                <Reveal>
                    <span className="font-mono text-xs uppercase tracking-wider text-signal">
                        What we do
                    </span>
                    <h2 className="font-display text-3xl font-semibold text-ink mt-3 mb-12 max-w-lg">
                        Four core disciplines, one team that ships.
                    </h2>
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {pillars.map((pillar, i) => {
                        const Icon = pillar.icon;
                        return (
                            <Reveal key={pillar.title} delay={i * 0.1}>
                                <div className="border border-mist rounded-xl p-6 h-full hover:border-signal hover:shadow-lg hover:-translate-y-1.5 transition-all">
                                    <div className="w-11 h-11 rounded-lg bg-signal-dim flex items-center justify-center mb-4">
                                        <Icon size={20} className="text-signal" />
                                    </div>
                                    <h3 className="font-display text-lg font-semibold text-ink mb-2">
                                        {pillar.title}
                                    </h3>
                                    <p className="text-graphite text-sm leading-relaxed">
                                        {pillar.desc}
                                    </p>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </section>

            {/* Services preview (live from DB) */}
            {services.length > 0 && (
                <section className="bg-signal-dim py-24">
                    <div className="max-w-6xl mx-auto px-6">
                        <Reveal>
                            <div className="flex items-end justify-between mb-12">
                                <div>
                                    <span className="font-mono text-xs uppercase tracking-wider text-signal">
                                        Full service list
                                    </span>
                                    <h2 className="font-display text-3xl font-semibold text-ink mt-3">
                                        Explore everything we offer.
                                    </h2>
                                </div>
                                <Link
                                    to="/services"
                                    className="hidden md:flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-signal hover:underline"
                                >
                                    View all <ArrowRight size={14} />
                                </Link>
                            </div>
                        </Reveal>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {services.map((service, i) => (
                                <Reveal key={service.id} delay={i * 0.08}>
                                    <Link
                                        to={`/services/${service.id}`}
                                        className="block bg-paper border border-mist rounded-xl p-6 hover:border-signal hover:shadow-sm transition"
                                    >
                                        <div className="text-3xl mb-3">{service.icon}</div>
                                        <h3 className="font-display text-lg font-semibold text-ink mb-2">
                                            {service.name}
                                        </h3>
                                        <p className="text-graphite text-sm leading-relaxed">
                                            {service.description}
                                        </p>
                                    </Link>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Process */}
            <section className="max-w-6xl mx-auto px-6 py-24">
                <Reveal>
                    <span className="font-mono text-xs uppercase tracking-wider text-signal">
                        How we work
                    </span>
                    <h2 className="font-display text-3xl font-semibold text-ink mt-3 mb-12">
                        From idea to launch, in three steps.
                    </h2>
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {process.map((step, i) => (
                        <Reveal key={step.num} delay={i * 0.1}>
                            <div className="relative pl-6 border-l-2 border-mist hover:border-signal transition-colors">
                                <span className="font-mono text-sm text-signal">{step.num}</span>
                                <h3 className="font-display text-xl font-semibold text-ink mt-2 mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-graphite text-sm leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* Portfolio strip */}
            <section className="bg-ink py-24">
                <div className="max-w-6xl mx-auto px-6">
                    <Reveal>
                        <span className="font-mono text-xs uppercase tracking-wider text-signal">
                            Recent work
                        </span>
                        <h2 className="font-display text-3xl font-semibold text-paper mt-3 mb-12 max-w-lg">
                            A few things we've shipped for real businesses.
                        </h2>
                    </Reveal>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { title: 'Retail Inventory & POS', tag: 'Software' },
                            { title: 'Intern Management Platform', tag: 'Web App' },
                            { title: 'Accounting Management System', tag: 'Software' },
                        ].map((item, i) => (
                            <Reveal key={item.title} delay={i * 0.1}>
                                <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition">
                                    <span className="font-mono text-xs text-teal">{item.tag}</span>
                                    <h3 className="font-display text-lg font-semibold text-paper mt-2">
                                        {item.title}
                                    </h3>
                                </div>
                            </Reveal>
                        ))}
                    </div>

                    <Reveal delay={0.2}>
                        <Link
                            to="/portfolio"
                            className="inline-flex items-center gap-2 mt-8 font-mono text-xs uppercase tracking-wider text-signal hover:underline"
                        >
                            See full portfolio <ArrowRight size={14} />
                        </Link>
                    </Reveal>
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-6xl mx-auto px-6 py-24 text-center">
                <Reveal>
                    <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink max-w-xl mx-auto">
                        Have a project in mind? Let's talk about it.
                    </h2>
                    <p className="text-graphite mt-4">
                        Get a response within 24 hours — no obligation, no pressure.
                    </p>
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 mt-8 bg-signal text-white px-8 py-3.5 rounded-lg font-medium hover:opacity-90 transition"
                    >
                        Get a Free Quote <ArrowRight size={16} />
                    </Link>
                </Reveal>
            </section>
        </div>
    );
}