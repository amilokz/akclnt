import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '../../components/ui/Reveal.jsx';
import TiltCard from '../../components/ui/TiltCard.jsx';

const projects = [
    {
        id: 1,
        title: 'Retail Inventory & POS System',
        category: 'Software Development',
        description: 'A point-of-sale and inventory management system built for a retail business, with barcode scanning, tiered pricing, and invoice generation.',
        tags: ['Laravel', 'React', 'MySQL'],
        tint: 'from-signal to-violet',
    },
    {
        id: 2,
        title: 'Intern Management Platform',
        category: 'Web Development',
        description: 'An internal platform to manage interns, track progress, assign tasks, and issue certificates — used daily by a growing training institute.',
        tags: ['Laravel', 'React', 'Cloudinary'],
        tint: 'from-teal to-signal',
    },
    {
        id: 3,
        title: 'Accounting Management System',
        category: 'Software Development',
        description: 'A multi-module accounting and real estate management system with cash flow reporting and map-based property tracking.',
        tags: ['Laravel', 'Leaflet.js', 'MySQL'],
        tint: 'from-violet to-teal',
    },
    {
        id: 4,
        title: 'Company Marketing Website',
        category: 'Web Development',
        description: 'A performance-optimized marketing site with smooth animations, converted from static HTML to a fully dynamic React SPA.',
        tags: ['React', 'GSAP', 'Vite'],
        tint: 'from-signal to-teal',
    },
];

const categories = ['All', 'Web Development', 'Software Development'];

export default function Portfolio() {
    const [filter, setFilter] = useState('All');
    const visible = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

    return (
        <div className="overflow-hidden">
            {/* Header */}
            <section className="relative bg-void text-paper pt-36 pb-24 overflow-hidden">
                <div className="mesh-bg">
                    <div className="grid-overlay-dark absolute inset-0" />
                    <div className="aurora absolute w-[45vw] h-[45vw] rounded-full blur-3xl top-0 -left-10"
                         style={{ background: 'radial-gradient(circle, rgba(0,168,150,0.22), transparent 60%)' }} />
                </div>
                <div className="relative max-w-6xl mx-auto px-6">
                    <Reveal>
                        <span className="font-mono text-xs uppercase tracking-wider text-teal">Our work</span>
                        <h1 className="font-display text-4xl md:text-6xl font-bold mt-4 max-w-2xl leading-[1.05]">
                            A few things we've <span className="text-gradient">shipped.</span>
                        </h1>
                        <p className="text-white/55 mt-6 max-w-lg text-lg leading-relaxed">
                            Real projects, built for real businesses. Here's a sample of the kind of work we do.
                        </p>
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
                                    <div className="relative h-40 overflow-hidden">
                                        <div className={`absolute inset-0 bg-gradient-to-br ${project.tint} opacity-90`} />
                                        <div className="grid-overlay-dark absolute inset-0 opacity-40" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="font-display text-6xl font-bold text-white/15 group-hover:scale-110 transition-transform duration-500">
                                                0{project.id}
                                            </span>
                                        </div>
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
