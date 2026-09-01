import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const links = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
    { to: '/portfolio', label: 'Work' },
    { to: '/about', label: 'About' },
    { to: '/team', label: 'Team' },
    { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Lock body scroll while the mobile menu is open.
    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [open]);

    return (
        <>
            <nav
                className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
                style={{
                    // ✅ Always dark background with blur
                    background: scrolled 
                        ? 'rgba(6, 7, 12, 0.92)' 
                        : 'rgba(6, 7, 12, 0.8)',
                    backdropFilter: 'blur(16px) saturate(160%)',
                    WebkitBackdropFilter: 'blur(16px) saturate(160%)',
                    borderBottom: scrolled 
                        ? '1px solid rgba(255, 255, 255, 0.08)' 
                        : '1px solid rgba(255, 255, 255, 0.05)',
                }}
            >
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 lg:h-20">
                    {/* Logo - white */}
                    <Link
                        to="/"
                        className="font-display text-xl font-bold text-white tracking-tight relative z-50"
                        onClick={() => setOpen(false)}
                    >
                        akclnt<span className="text-signal">.</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        {links.map((link) => {
                            const active = location.pathname === link.to;
                            return (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className={`group relative font-mono text-xs uppercase tracking-wider transition-colors ${
                                        active ? 'text-signal' : 'text-white/70 hover:text-white'
                                    }`}
                                >
                                    {link.label}
                                    <span
                                        className="absolute -bottom-1.5 left-0 h-px bg-signal transition-all duration-300"
                                        style={{ width: active ? '100%' : '0%' }}
                                    />
                                    {!active && (
                                        <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-signal transition-all duration-300 group-hover:w-full" />
                                    )}
                                </Link>
                            );
                        })}
                        <Link
                            to="/contact"
                            className="group inline-flex items-center gap-1.5 bg-signal text-white text-sm font-medium pl-4 pr-3.5 py-2 rounded-full hover:bg-violet transition-colors shadow-lg shadow-signal/25"
                        >
                            Get a Quote
                            <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                    </div>

                    {/* Hamburger - white */}
                    <button
                        onClick={() => setOpen(!open)}
                        className="md:hidden relative z-50 w-9 h-9 flex flex-col items-center justify-center gap-[5px]"
                        aria-label="Toggle menu"
                        aria-expanded={open}
                    >
                        <span
                            className="block w-6 h-[2px] bg-white rounded-full transition-all duration-300"
                            style={{ transform: open ? 'translateY(7px) rotate(45deg)' : 'none' }}
                        />
                        <span
                            className="block w-6 h-[2px] bg-white rounded-full transition-all duration-200"
                            style={{ opacity: open ? 0 : 1 }}
                        />
                        <span
                            className="block w-6 h-[2px] bg-white rounded-full transition-all duration-300"
                            style={{ transform: open ? 'translateY(-7px) rotate(-45deg)' : 'none' }}
                        />
                    </button>
                </div>
            </nav>

            {/* Mobile overlay - dark */}
            <div
                className="md:hidden fixed inset-0 z-40 flex flex-col"
                style={{
                    background: 'rgba(6, 7, 12, 0.98)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    opacity: open ? 1 : 0,
                    pointerEvents: open ? 'auto' : 'none',
                    transition: 'opacity 0.35s ease',
                }}
            >
                <div className="aurora absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl"
                     style={{ background: 'radial-gradient(circle, rgba(91,95,239,0.3), transparent 60%)' }} />
                <div className="flex-1 flex flex-col justify-center px-8 gap-2 relative">
                    {links.map((link, i) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            onClick={() => setOpen(false)}
                            className="font-display text-3xl font-semibold text-white py-2 border-b border-white/10"
                            style={{
                                opacity: open ? 1 : 0,
                                transform: open ? 'none' : 'translateY(16px)',
                                transition: `opacity 0.4s ease ${0.08 + i * 0.05}s, transform 0.4s ease ${0.08 + i * 0.05}s`,
                            }}
                        >
                            <span className="font-mono text-xs text-white/30 mr-3 align-middle">0{i + 1}</span>
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        to="/contact"
                        onClick={() => setOpen(false)}
                        className="mt-8 inline-flex items-center justify-center gap-2 bg-signal text-white text-base font-medium px-6 py-4 rounded-full hover:bg-violet transition-colors shadow-lg shadow-signal/25"
                        style={{
                            opacity: open ? 1 : 0,
                            transition: `opacity 0.4s ease ${0.08 + links.length * 0.05}s`,
                        }}
                    >
                        Get a Quote <ArrowUpRight size={18} />
                    </Link>
                </div>
            </div>
        </>
    );
}