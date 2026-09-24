import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import logo from '../../assets/AKCLNT LOGO.jpeg';

const links = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services', mega: true },
    { to: '/portfolio', label: 'Work' },
    { to: '/about', label: 'About' },
    { to: '/team', label: 'Team' },
    { to: '/blog', label: 'Blog' },
    { to: '/products', label: 'Products' },
    { to: '/contact', label: 'Contact' },

];

// Order + emoji per category for the mega menu
const categoryOrder = [
    'Web Development',
    'Mobile Development',
    'AI & Automation',
    'Digital Marketing',
    'Hosting & Support',
    'Design',
    'Consulting',
    'Lead Generation',
    'Digital Products',
    'Accounting',
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [megaOpen, setMegaOpen] = useState(false);
    const [services, setServices] = useState([]);
    const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
    const location = useLocation();
    const closeTimer = useRef(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        axios.get('/api/services')
            .then((res) => setServices(Array.isArray(res.data) ? res.data : []))
            .catch(() => {});
    }, []);

    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [open]);

    // close mega menu on route change
    useEffect(() => { setMegaOpen(false); }, [location.pathname]);

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

    const openMega = () => { clearTimeout(closeTimer.current); setMegaOpen(true); };
    const scheduleClose = () => { closeTimer.current = setTimeout(() => setMegaOpen(false), 180); };

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
                            {/* Logo */}
                            <Link to="/" className="flex items-center relative z-50" onClick={() => setOpen(false)}>
                                <img src={logo} alt="AKCLNT" className="h-8 md:h-10 w-auto" />
                            </Link>

                            {/* Desktop nav */}
                            <div
                                className="hidden md:flex items-center gap-1 rounded-full px-1.5 py-1.5"
                                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                            >
                                {links.map((link) => {
                                    const active = location.pathname === link.to
                                        || (link.mega && location.pathname.startsWith('/services'));
                                    return (
                                        <div
                                            key={link.to}
                                            className="relative"
                                            onMouseEnter={link.mega ? openMega : undefined}
                                            onMouseLeave={link.mega ? scheduleClose : undefined}
                                        >
                                            <Link
                                                to={link.to}
                                                className={`relative flex items-center gap-1 font-mono text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-full transition-colors duration-300 ${
                                                    active ? 'text-white' : 'text-white/55 hover:text-white'
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
                                                {link.mega && (
                                                    <ChevronDown size={12} className={`transition-transform duration-300 ${megaOpen ? 'rotate-180' : ''}`} />
                                                )}
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>

                            <Link
                                to="/free-audit"
                                className="hidden md:inline-flex items-center gap-2 text-white/85 hover:text-white text-sm font-medium px-4 py-2 rounded-full border border-white/15 hover:border-white/30 hover:bg-white/5 transition-colors"
                            >
                                <span className="relative flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full rounded-full bg-teal opacity-60 animate-ping motion-reduce:animate-none" />
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
                                </span>
                                Free Audit
                            </Link>

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

                    {/* ===== MEGA MENU (desktop) ===== */}
                                     <div
                        className="hidden md:flex justify-center fixed inset-x-0 px-6 mt-2"
                        style={{
                            opacity: megaOpen ? 1 : 0,
                            pointerEvents: megaOpen ? 'auto' : 'none',
                            transform: megaOpen ? 'translateY(0)' : 'translateY(-8px)',
                            transition: 'opacity .25s ease, transform .25s ease',
                        }}
                        onMouseEnter={openMega}
                        onMouseLeave={scheduleClose}
                    >
                                               <div
                            className="rounded-3xl overflow-hidden w-full max-w-[1100px]"
                            style={{
                                background: 'rgba(11, 13, 20, 0.97)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                boxShadow: '0 24px 60px -20px rgba(0,0,0,0.8)',
                            }}
                        >
                            <div className="p-7 grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-7 max-h-[70vh] overflow-y-auto">
                                {orderedCategories.map((category) => (
                                    <div key={category}>
                                        <h3 className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-signal mb-3">
                                            {category}
                                        </h3>
                                        <ul className="space-y-2">
                                            {grouped[category].slice(0, 7).map((s) => (
                                                <li key={s.id}>
                                                    <Link
                                                        to={`/services/${s.id}`}
                                                        onClick={() => setMegaOpen(false)}
                                                        className="text-white/60 hover:text-white text-[0.82rem] leading-snug transition-colors block"
                                                    >
                                                        {s.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>

                            <div
                                className="px-7 py-4 flex items-center justify-between"
                                style={{ borderTop: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}
                            >
                                <span className="text-white/45 text-xs">
                                    {services.length} services across {orderedCategories.length} categories
                                </span>
                                <Link
                                    to="/services"
                                    onClick={() => setMegaOpen(false)}
                                    className="inline-flex items-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-wider text-signal hover:text-teal transition-colors"
                                >
                                    View all services <ArrowUpRight size={13} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            {/* ===== Mobile overlay ===== */}
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

                <div className="flex-1 flex flex-col justify-center px-8 gap-1 relative overflow-y-auto pt-24 pb-8">
                    {links.map((link, i) => {
                        const active = location.pathname === link.to;
                        const style = {
                            opacity: open ? 1 : 0,
                            transform: open ? 'none' : 'translateY(16px)',
                            transition: `opacity 0.4s ease ${0.08 + i * 0.05}s, transform 0.4s ease ${0.08 + i * 0.05}s`,
                        };

                        if (link.mega) {
                            return (
                                <div key={link.to} style={style} className="border-b border-white/10">
                                    <button
                                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                                        className="w-full flex items-center justify-between py-2.5 text-left"
                                    >
                                        <span className={`font-display text-3xl font-semibold ${active ? 'text-signal' : 'text-white'}`}>
                                            <span className="font-mono text-xs text-white/30 mr-3 align-middle">0{i + 1}</span>
                                            {link.label}
                                        </span>
                                        <ChevronDown size={20} className={`text-white/40 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                                    </button>
                                    <div className="grid transition-all duration-300"
                                         style={{ gridTemplateRows: mobileServicesOpen ? '1fr' : '0fr' }}>
                                        <div className="overflow-hidden">
                                            <div className="pb-4 pl-9 space-y-4">
                                                {orderedCategories.map((category) => (
                                                    <div key={category}>
                                                        <div className="font-mono text-[0.6rem] uppercase tracking-wider text-signal mb-1.5">
                                                            {category}
                                                        </div>
                                                        <ul className="space-y-1.5">
                                                            {grouped[category].slice(0, 5).map((s) => (
                                                                <li key={s.id}>
                                                                    <Link to={`/services/${s.id}`} onClick={() => setOpen(false)}
                                                                          className="text-white/55 hover:text-white text-sm transition-colors">
                                                                        {s.name}
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                                <Link to="/services" onClick={() => setOpen(false)}
                                                      className="inline-flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-wider text-teal pt-1">
                                                    View all services <ArrowUpRight size={12} />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        }

                        return (
                            <Link
                                key={link.to}
                                to={link.to}
                                onClick={() => setOpen(false)}
                                className={`font-display text-3xl font-semibold py-2.5 border-b border-white/10 ${active ? 'text-signal' : 'text-white'}`}
                                style={style}
                            >
                                <span className="font-mono text-xs text-white/30 mr-3 align-middle">0{i + 1}</span>
                                {link.label}
                            </Link>
                        );
                    })}

                    <Link
                        to="/free-audit"
                        onClick={() => setOpen(false)}
                        className="mt-8 inline-flex items-center justify-center gap-2 text-white text-base font-medium px-6 py-4 rounded-full border border-white/20"
                        style={{
                            opacity: open ? 1 : 0,
                            transition: `opacity 0.4s ease ${0.05 + links.length * 0.05}s`,
                        }}
                    >
                        <span className="h-2 w-2 rounded-full bg-teal" /> Free Website Audit
                    </Link>
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