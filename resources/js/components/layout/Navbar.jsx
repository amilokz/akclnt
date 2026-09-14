import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import logo from '../../assets/AKCLNT LOGO.jpeg';
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
            <header className="fixed top-0 inset-x-0 z-50 flex justify-center pointer-events-none">
                <nav
                    className="pointer-events-auto w-full transition-all duration-500 ease-out"
                    style={{
                        maxWidth: scrolled ? '72rem' : '100%',
                        marginTop: scrolled ? '0.75rem' : '0rem',
                        paddingLeft: scrolled ? '0.5rem' : '0rem',
                        paddingRight: scrolled ? '0.5rem' : '0rem',
                    }}
                >
                    <div
                        className="mx-auto transition-all duration-500 ease-out"
                        style={{
                            background: scrolled ? 'rgba(16, 18, 28, 0.72)' : 'rgba(6, 7, 12, 0.55)',
                            backdropFilter: 'blur(18px) saturate(160%)',
                            WebkitBackdropFilter: 'blur(18px) saturate(160%)',
                            border: `1px solid rgba(255,255,255,${scrolled ? 0.1 : 0.06})`,
                            borderRadius: scrolled ? '9999px' : '0px',
                            boxShadow: scrolled ? '0 10px 40px -12px rgba(0,0,0,0.6)' : 'none',
                        }}
                    >
                        <div
                            className="max-w-7xl mx-auto px-5 md:px-6 flex items-center justify-between transition-all duration-500"
                            style={{ height: scrolled ? '3.75rem' : '4.75rem' }}
                        >
                            {/* Logo + status dot */}
                            <Link
                                to="/"
                                className="group flex items-center gap-2.5 relative z-50"
                                onClick={() => setOpen(false)}
                            >
                                                            <img
                                    src={logo}
                                    alt="AKCLNT"
                                    className="h-8 md:h-10 w-auto"
                                />
                                <span className="hidden sm:flex items-center gap-1.5 pl-2.5 ml-0.5 border-l border-white/10">
                                    
                            
                                    <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">
                            
                                    </span>
                                </span>
                            </Link>

                            {/* Desktop nav — glass pill */}
                            <div
                                className="hidden md:flex items-center gap-1 rounded-full px-1.5 py-1.5"
                                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                            >
                                {links.map((link) => {
                                    const active = location.pathname === link.to;
                                    return (
                                        <Link
                                            key={link.to}
                                            to={link.to}
                                            className={`relative font-mono text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-full transition-colors duration-300 ${
                                                active
                                                    ? 'text-white'
                                                    : 'text-white/55 hover:text-white'
                                            }`}
                                            style={
                                                active
                                                    ? {
                                                        background: 'linear-gradient(90deg, rgba(91,95,239,0.9), rgba(139,123,247,0.9))',
                                                        boxShadow: '0 4px 14px -4px rgba(91,95,239,0.6)',
                                                    }
                                                    : undefined
                                            }
                                        >
                                            {link.label}
                                        </Link>
                                    );
                                })}
                            </div>

                            {/* CTA */}
                            <Link
                                to="/contact"
                                className="hidden md:inline-flex group relative items-center gap-1.5 text-white text-sm font-medium pl-4 pr-3.5 py-2 rounded-full overflow-hidden transition-transform hover:scale-[1.03]"
                                style={{
                                    background: 'linear-gradient(90deg, #5B5FEF, #8B7BF7)',
                                    boxShadow: '0 8px 24px -8px rgba(91,95,239,0.7)',
                                }}
                            >
                                <span
                                    className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none"
                                    style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)' }}
                                />
                                <span className="relative">Get a Quote</span>
                                <ArrowUpRight size={15} className="relative transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </Link>

                            {/* Hamburger */}
                            <button
                                onClick={() => setOpen(!open)}
                                className="md:hidden relative z-50 w-9 h-9 flex flex-col items-center justify-center gap-[5px]"
                                aria-label="Toggle menu"
                                aria-expanded={open}
                            >
                                <span className="block w-6 h-[2px] bg-white rounded-full transition-all duration-300"
                                    style={{ transform: open ? 'translateY(7px) rotate(45deg)' : 'none' }} />
                                <span className="block w-6 h-[2px] bg-white rounded-full transition-all duration-200"
                                    style={{ opacity: open ? 0 : 1 }} />
                                <span className="block w-6 h-[2px] bg-white rounded-full transition-all duration-300"
                                    style={{ transform: open ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
                            </button>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Mobile overlay */}
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
                <div className="aurora absolute -bottom-24 -left-24 w-72 h-72 rounded-full blur-3xl"
                     style={{ background: 'radial-gradient(circle, rgba(0,168,150,0.22), transparent 60%)' }} />
                <div className="flex-1 flex flex-col justify-center px-8 gap-2 relative">
                    {links.map((link, i) => {
                        const active = location.pathname === link.to;
                        return (
                            <Link
                                key={link.to}
                                to={link.to}
                                onClick={() => setOpen(false)}
                                className={`font-display text-3xl font-semibold py-2 border-b border-white/10 ${active ? 'text-signal' : 'text-white'}`}
                                style={{
                                    opacity: open ? 1 : 0,
                                    transform: open ? 'none' : 'translateY(16px)',
                                    transition: `opacity 0.4s ease ${0.08 + i * 0.05}s, transform 0.4s ease ${0.08 + i * 0.05}s`,
                                }}
                            >
                                <span className="font-mono text-xs text-white/30 mr-3 align-middle">0{i + 1}</span>
                                {link.label}
                            </Link>
                        );
                    })}
                    <Link
                        to="/contact"
                        onClick={() => setOpen(false)}
                        className="mt-8 inline-flex items-center justify-center gap-2 text-white text-base font-medium px-6 py-4 rounded-full"
                        style={{
                            background: 'linear-gradient(90deg, #5B5FEF, #8B7BF7)',
                            boxShadow: '0 8px 24px -8px rgba(91,95,239,0.7)',
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