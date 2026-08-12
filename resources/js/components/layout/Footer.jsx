import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const columns = [
    {
        title: 'Company',
        links: [
            { to: '/about', label: 'About' },
            { to: '/team', label: 'Team' },
            { to: '/portfolio', label: 'Work' },
        ],
    },
    {
        title: 'Explore',
        links: [
            { to: '/services', label: 'Services' },
            { to: '/testimonials', label: 'Testimonials' },
            { to: '/faq', label: 'FAQ' },
        ],
    },
];

export default function Footer() {
    return (
        <footer className="relative bg-void text-paper mt-auto overflow-hidden">
            <div className="grid-overlay-dark absolute inset-0 opacity-40" />
            <div className="aurora absolute -bottom-20 -left-10 w-72 h-72 rounded-full blur-3xl"
                 style={{ background: 'radial-gradient(circle, rgba(91,95,239,0.18), transparent 60%)' }} />

            <div className="relative max-w-6xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                    {/* Brand + CTA */}
                    <div className="md:col-span-5">
                        <Link to="/" className="font-display text-2xl font-bold tracking-tight">
                            akclnt<span className="text-gradient">.</span>
                        </Link>
                        <h3 className="font-display text-2xl md:text-3xl font-semibold mt-5 max-w-sm leading-tight">
                            Let's build something worth shipping.
                        </h3>
                        <Link
                            to="/contact"
                            className="group inline-flex items-center gap-2 mt-7 bg-white text-ink px-6 py-3 rounded-full font-medium hover:bg-signal hover:text-white transition-colors"
                        >
                            Start a Project
                            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                    </div>

                    {/* Nav columns */}
                    {columns.map((col) => (
                        <div key={col.title} className="md:col-span-2">
                            <h4 className="font-mono text-xs uppercase tracking-wider text-white/40 mb-4">{col.title}</h4>
                            <ul className="space-y-3">
                                {col.links.map((l) => (
                                    <li key={l.to}>
                                        <Link to={l.to} className="text-white/70 hover:text-white text-sm transition-colors">
                                            {l.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Contact */}
                    <div className="md:col-span-3">
                        <h4 className="font-mono text-xs uppercase tracking-wider text-white/40 mb-4">Get in touch</h4>
                        <p className="text-white/70 text-sm">hello@akclnt.com</p>
                        <p className="text-white/70 text-sm mt-2">Rawalpindi, Pakistan</p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between mt-16 pt-8 border-t border-white/10 gap-4">
                    <p className="font-mono text-xs text-white/40">
                        © {new Date().getFullYear()} akclnt. All rights reserved.
                    </p>
                    <p className="font-mono text-xs text-white/40">
                        Built with Laravel + React
                    </p>
                </div>
            </div>
        </footer>
    );
}
