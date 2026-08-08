import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const location = useLocation();

   const links = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
    { to: '/portfolio', label: 'Work' },
    { to: '/about', label: 'About' },
    { to: '/team', label: 'Team' },
    { to: '/contact', label: 'Contact' },
];
    return (
        <nav className="bg-paper/90 backdrop-blur border-b border-mist sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
                <Link to="/" className="font-display text-xl font-bold text-ink tracking-tight">
                    akclnt<span className="text-signal">.</span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    {links.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`font-mono text-xs uppercase tracking-wider transition ${
                                location.pathname === link.to
                                    ? 'text-signal'
                                    : 'text-graphite hover:text-ink'
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        to="/contact"
                        className="bg-ink text-paper text-sm font-medium px-4 py-2 rounded-lg hover:bg-signal transition"
                    >
                        Get a Quote
                    </Link>
                </div>

                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden text-ink"
                    aria-label="Toggle menu"
                >
                    {open ? '✕' : '☰'}
                </button>
            </div>

            {open && (
                <div className="md:hidden border-t border-mist px-6 py-4 flex flex-col gap-4 bg-paper">
                    {links.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            onClick={() => setOpen(false)}
                            className="font-mono text-xs uppercase tracking-wider text-graphite"
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        to="/contact"
                        onClick={() => setOpen(false)}
                        className="bg-ink text-paper text-sm font-medium px-4 py-2 rounded-lg text-center"
                    >
                        Get a Quote
                    </Link>
                </div>
            )}
        </nav>
    );
}