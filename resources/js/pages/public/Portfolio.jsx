import React from 'react';
import { Link } from 'react-router-dom';

const projects = [
    {
        id: 1,
        title: 'Retail Inventory & POS System',
        category: 'Software Development',
        description: 'A point-of-sale and inventory management system built for a retail business, with barcode scanning, tiered pricing, and invoice generation.',
        tags: ['Laravel', 'React', 'MySQL'],
    },
    {
        id: 2,
        title: 'Intern Management Platform',
        category: 'Web Development',
        description: 'An internal platform to manage interns, track progress, assign tasks, and issue certificates — used daily by a growing training institute.',
        tags: ['Laravel', 'React', 'Cloudinary'],
    },
    {
        id: 3,
        title: 'Accounting Management System',
        category: 'Software Development',
        description: 'A multi-module accounting and real estate management system with cash flow reporting and map-based property tracking.',
        tags: ['Laravel', 'Leaflet.js', 'MySQL'],
    },
    {
        id: 4,
        title: 'Company Marketing Website',
        category: 'Web Development',
        description: 'A performance-optimized marketing site with smooth animations, converted from static HTML to a fully dynamic React SPA.',
        tags: ['React', 'GSAP', 'Vite'],
    },
];

export default function Portfolio() {
    return (
        <div className="max-w-6xl mx-auto px-6 py-20">
            <span className="font-mono text-xs uppercase tracking-wider text-signal">
                Our work
            </span>
            <h1 className="font-display text-4xl font-semibold text-ink mt-3 max-w-xl">
                A few things we've shipped.
            </h1>
            <p className="text-graphite mt-4 max-w-lg">
                Real projects, built for real businesses. Here's a sample of the kind
                of work we do.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                {projects.map((project, i) => (
                    <div
                        key={project.id}
                        className="border border-mist rounded-xl p-8 hover:border-signal hover:shadow-sm transition"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <span className="font-mono text-xs uppercase tracking-wider text-signal">
                                {project.category}
                            </span>
                            <span className="font-mono text-xs text-graphite">0{i + 1}</span>
                        </div>
                        <h2 className="font-display text-xl font-semibold text-ink mb-3">
                            {project.title}
                        </h2>
                        <p className="text-graphite text-sm leading-relaxed mb-5">
                            {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="font-mono text-xs bg-signal-dim text-signal px-2.5 py-1 rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-signal-dim rounded-2xl p-10 md:p-14 mt-20 text-center">
                <h2 className="font-display text-2xl md:text-3xl font-semibold text-ink max-w-md mx-auto">
                    Want something like this for your business?
                </h2>
                <Link
                    to="/contact"
                    className="inline-block mt-6 bg-ink text-paper px-6 py-3 rounded-lg font-medium hover:bg-signal transition"
                >
                    Start a Conversation
                </Link>
            </div>
        </div>
    );
}