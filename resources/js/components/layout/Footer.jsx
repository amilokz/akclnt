import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin, Mail, Phone } from 'lucide-react';
import logo from '../../assets/AKCLNT LOGO.jpeg';
const footerLinks = {
    Company: [
        { to: '/about', label: 'About Us' },
        { to: '/team', label: 'Our Team' },
        { to: '/portfolio', label: 'Our Work' },
        { to: '/contact', label: 'Contact Us' },
    ],
      Services: [
        { to: '/services', label: 'Web Development' },
        { to: '/services', label: 'AI & Automation' },
        { to: '/services', label: 'Digital Marketing' },
        { to: '/services', label: 'Hosting & Support' },
        { to: '/services', label: 'Graphic Design' },
        { to: '/services', label: 'All Services' },
    ],
    Resources: [
        { to: '/portfolio', label: 'Case Studies' },
        { to: '/contact', label: 'Get a Quote' },
        { to: '/faq', label: 'FAQ' },
    ],
};

export default function Footer() {
    return (
        <footer className="relative overflow-hidden" style={{ backgroundColor: "#06070C" }}>
            <div className="grid-overlay-dark absolute inset-0 opacity-30" />

            <div
                className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none"
                style={{ background: "radial-gradient(circle, #5B5FEF, transparent 60%)" }}
            />
            <div
                className="absolute -top-20 right-0 w-80 h-80 rounded-full blur-3xl opacity-10 pointer-events-none"
                style={{ background: "radial-gradient(circle, #00A896, transparent 60%)" }}
            />

            <div className="relative max-w-7xl mx-auto px-6">

                {/* ===== MAIN GRID ===== */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pt-16 pb-12 border-b border-white/10">

                    {/* Brand (LEFT) */}
                    <div className="md:col-span-4">
                                                <Link to="/" className="inline-block mb-6">
                            <img src={logo} alt="AKCLNT" className="h-10 w-auto" />
                        </Link>

                        <p className="text-white/50 text-sm leading-relaxed mb-8 max-w-xs">
                            A software studio building websites, apps, and business systems for companies that need something that actually works.
                        </p>

                        <div className="space-y-3 mb-8">
                            <div className="flex items-start gap-3">
                                <MapPin size={14} className="text-signal mt-0.5 shrink-0" />
                                <p className="text-white/50 text-sm">Rawalpindi, Punjab, Pakistan</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail size={14} className="text-signal shrink-0" />
                                <p className="text-white/50 text-sm">info@akclnt.com</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone size={14} className="text-signal shrink-0" />
                                <p className="text-white/50 text-sm">+92 323 8559822</p>
                            </div>
                        </div>

                        {/* Socials */}
                        <div className="flex items-center gap-3 flex-wrap">
                            <a href="#" aria-label="Facebook"
                                className="w-10 h-10 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-signal/20 transition-all duration-300"
                                style={{ border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)" }}>
                                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                                </svg>
                            </a>
                            <a href="#" aria-label="Instagram"
                                className="w-10 h-10 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-signal/20 transition-all duration-300"
                                style={{ border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)" }}>
                                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <rect x="2" y="2" width="20" height="20" rx="5"/>
                                    <circle cx="12" cy="12" r="4"/>
                                    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
                                </svg>
                            </a>
                            <a href="#" aria-label="YouTube"
                                className="w-10 h-10 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-signal/20 transition-all duration-300"
                                style={{ border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)" }}>
                                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                                    <polygon fill="#06070C" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
                                </svg>
                            </a>
                            <a href="#" aria-label="WhatsApp"
                                className="w-10 h-10 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-signal/20 transition-all duration-300"
                                style={{ border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)" }}>
                                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                                </svg>
                            </a>
                            <a href="#" aria-label="LinkedIn"
                                className="w-10 h-10 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-signal/20 transition-all duration-300"
                                style={{ border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)" }}>
                                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Nav cols */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title} className="md:col-span-2">
                            <h4 className="font-display text-base font-bold text-white mb-5 tracking-tight">
                                {title}
                            </h4>
                            <ul className="space-y-3">
                                {links.map((l) => (
                                    <li key={l.label}>
                                        <Link
                                            to={l.to}
                                            className="text-white/45 hover:text-white text-sm transition-colors duration-200"
                                        >
                                            {l.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Get a Quote */}
                    <div className="md:col-span-2">
                        <h4 className="font-display text-base font-bold text-white mb-5 tracking-tight">
                            Get a Quote
                        </h4>
                        <p className="text-white/45 text-sm leading-relaxed mb-5">
                            Tell us what you're building. Response within 24h.
                        </p>
                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-1.5 text-signal hover:text-white text-sm font-medium transition-colors group"
                        >
                            Contact us
                            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                    </div>
                </div>

                {/* ===== FULL-WIDTH WORDMARK BAND (ezitech style) ===== */}
                <div className="relative py-10 md:py-14 overflow-hidden">
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{ background: "radial-gradient(ellipse 55% 90% at 65% 55%, rgba(91,95,239,0.10), transparent 70%)" }}
                    />
                    <h2
                        className="font-display font-black select-none flex justify-center items-end leading-none w-full"
style={{ fontSize: "clamp(40px, 13vw, 170px)", letterSpacing: "0.35em" }}
                        aria-label="AKCLNT"
                    >
                        {"AKCLNT".split("").map((char, i) => (
                            <span
                                key={i}
                                aria-hidden="true"
                                style={{
                                    display: "inline-block",
                                    background: "linear-gradient(90deg, rgba(91,95,239,0.1), rgba(91,95,239,0.5), rgba(139,123,247,0.8), rgba(255,255,255,0.9), rgba(0,168,150,0.8), rgba(91,95,239,0.5), rgba(91,95,239,0.1))",
                                    backgroundSize: "200% auto",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    animation: "brandGlow 4s linear infinite, letterFloat 2.8s ease-in-out infinite",
                                    animationDelay: `0s, ${i * 0.12}s`,
                                }}
                            >
                                {char}
                            </span>
                        ))}
                    </h2>
                </div>

                {/* Bottom bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-6 border-t border-white/10">
                    <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-white/30">
                            © {new Date().getFullYear()}
                        </span>
                        <span
                            className="font-display text-sm font-bold"
                            style={{
                                background: "linear-gradient(90deg, #5B5FEF, #8B7BF7, #00A896, #5B5FEF)",
                                backgroundSize: "200% auto",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                animation: "shimmerBrand 3s linear infinite",
                            }}
                        >
                            akclnt.
                        </span>
                        <span className="font-mono text-xs text-white/30">All rights reserved.</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <Link to="/privacy" className="font-mono text-xs text-white/30 hover:text-white/60 transition-colors">
                            Privacy Policy
                        </Link>
                        <Link to="/terms" className="font-mono text-xs text-white/30 hover:text-white/60 transition-colors">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes shimmerBrand {
                    0% { background-position: 0% center; }
                    100% { background-position: 200% center; }
                }
                @keyframes brandGlow {
                    0% { background-position: 0% center; }
                    100% { background-position: 200% center; }
                }
                @keyframes letterFloat {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-16px); }
                }
            `}</style>
        </footer>
    );
}