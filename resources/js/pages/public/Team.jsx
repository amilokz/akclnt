import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '../../components/ui/Reveal.jsx';

// Founders
import komilImg from '../../assets/team/komil.jpg';
import nomanImg from '../../assets/team/noman.jpg';
import shakeelImg from '../../assets/team/shakeel.jpg';
// Developers
import javariaImg from '../../assets/team/javaria.jpg';
import laibaImg from '../../assets/team/laiba.jpg';
import jehanzaibImg from '../../assets/team/jehanzaib.jpg';
import amadImg from '../../assets/team/amad.jpg';
import ayyanImg from '../../assets/team/ayyan.png';
const founders = [
    {
        name: 'Komil Hassan',
        role: 'Founder & CEO',
        focus: 'Laravel & React full-stack development, custom PHP, and project architecture.',
        image: komilImg,
        accent: { from: '#5B5FEF', to: '#8B7BF7', glow: 'rgba(91,95,239,0.18)' },
        socials: { linkedin: 'https://www.linkedin.com/in/komil-hassan-a97b66282', email: 'mailto:info@akclnt.com' },
    },
    {
        name: 'Noman Arshad',
        role: 'Amazon Accounting Management',
        focus: 'Amazon seller accounting, reconciliation, profit tracking, and reporting.',
        image: nomanImg,
        accent: { from: '#00A896', to: '#5B5FEF', glow: 'rgba(0,168,150,0.18)' },
        socials: { linkedin: null, email: 'mailto:info@akclnt.com' },
    },
    {
        name: 'Muhammad Shakeel',
        role: 'Co-Founder',
        focus: 'Operations, client relations, and project delivery.',
        image: shakeelImg,
        accent: { from: '#8B7BF7', to: '#00A896', glow: 'rgba(139,123,247,0.18)' },
        socials: { linkedin: null, email: 'mailto:info@akclnt.com' },
    },
];

const developers = [
    {
        name: 'Javaria Shabbir',
        role: 'Frontend & Full-Stack Developer',
        focus: 'React.js, JavaScript, Tailwind CSS, and the MERN stack. Also builds AI-powered apps — chatbots, LLM integration, semantic search (Groq, Qdrant) — plus UI/UX prototyping and REST API integration.',
        skills: ['React.js', 'MERN', 'Tailwind', 'AI / LLM'],
        image: javariaImg,
        accent: { from: '#5B5FEF', to: '#8B7BF7' },
        socials: { github: 'https://github.com/JaveriaisPink14', linkedin: null, email: null },
    },
    {
        name: 'Laiba Amjad',
        role: 'Flutter Developer & Technical Instructor',
        focus: 'Cross-platform mobile development with Flutter and Dart, Laravel backends and REST APIs, plus deployment on cPanel, VPS, and Firebase — including full Google Play Console management.',
        skills: ['Flutter', 'Dart', 'Laravel', 'Firebase'],
        image: laibaImg,
        accent: { from: '#00A896', to: '#5B5FEF' },
        socials: { github: null, linkedin: null, email: null },
    },
    {
        name: 'Raja Jehanzaib Arshad',
        role: 'Full Stack MERN Developer',
        focus: 'Full-stack web apps with React.js, Next.js, Node.js, Express, and MongoDB. Builds secure REST APIs and AI-powered platforms using Google Gemini, with deployments on Vercel and Railway.',
        skills: ['React', 'Next.js', 'Node.js', 'MongoDB'],
        image: jehanzaibImg,
        accent: { from: '#8B7BF7', to: '#00A896' },
        socials: { github: null, linkedin: 'https://linkedin.com/in/jehanzaib-arshad-a722b6369', email: null },
    },
  
    {
        name: 'Muhammad Amad',
        role: 'Senior Designer',
        focus: 'Senior Designer at Markhor Group of Companies. Branding, visual identity, marketing materials, and UI design.',
        skills: ['Branding', 'UI Design', 'Visual Identity'],
        image: amadImg,
        accent: { from: '#00A896', to: '#8B7BF7' },
        socials: { github: null, linkedin: 'https://www.linkedin.com/in/muhammad-amad7/', email: null },
    },
     {
        name: 'Ayyan Zubair',
        role: 'Full-Stack developer',
        focus: 'Full-Stack Developer specializing in modern web applications, with experience across frontend, backend, databases, APIs.',
        skills: ['react', 'next.js', 'node.js'],
        image: ayyanImg,
        accent: { from: '#00A896', to: '#8B7BF7' },
        socials: { github: null, linkedin: null, email: null },
    },
];

/* ---------- inline SVG icons (no lucide dependency) ---------- */
const IconLinkedIn = () => (
    <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
);
const IconGitHub = () => (
    <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.32.47-2.39 1.24-3.23-.13-.3-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.25 2.88.12 3.18.77.84 1.23 1.91 1.23 3.23 0 4.62-2.8 5.64-5.48 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z"/>
    </svg>
);
const IconMail = () => (
    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="m22 7-10 5L2 7"/>
    </svg>
);

function SocialLinks({ socials, accent }) {
    const items = [
        socials?.linkedin && { href: socials.linkedin, label: 'LinkedIn', Icon: IconLinkedIn, external: true },
        socials?.github && { href: socials.github, label: 'GitHub', Icon: IconGitHub, external: true },
        socials?.email && { href: socials.email, label: 'Email', Icon: IconMail, external: false },
    ].filter(Boolean);

    if (items.length === 0) return null;

    return (
        <div className="flex items-center justify-center gap-2.5 mt-6 pt-6 border-t border-mist">
            {items.map(({ href, label, Icon, external }) => (
                <a
                    key={label}
                    href={href}
                    aria-label={label}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-graphite hover:text-white transition-all"
                    style={{ border: '1px solid rgba(0,0,0,0.1)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = accent.from)}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                    <Icon />
                </a>
            ))}
        </div>
    );
}

function Avatar({ name, image, accent, size = 'w-36 h-36' }) {
    return (
        <div className="relative">
            <div className="absolute -inset-3 rounded-full blur-2xl opacity-35 group-hover:opacity-60 transition-opacity"
                 style={{ background: `linear-gradient(135deg, ${accent.from}, ${accent.to})` }} />
            <div className="relative rounded-full p-1"
                 style={{ background: `linear-gradient(135deg, ${accent.from}, ${accent.to})` }}>
                {image ? (
                    <img src={image} alt={name} className={`${size} rounded-full object-cover`} style={{ border: '4px solid #ffffff' }} />
                ) : (
                    <div className={`${size} rounded-full flex items-center justify-center font-display text-white text-4xl font-bold`}
                         style={{ background: `linear-gradient(135deg, ${accent.from}, ${accent.to})`, border: '4px solid #ffffff' }}>
                        {name.charAt(0)}
                    </div>
                )}
            </div>
        </div>
    );
}

export default function Team() {
    return (
        <div className="overflow-hidden">
          {/* ===== HEADER ===== */}
            <section className="relative bg-void text-paper pt-36 pb-28 overflow-hidden">
                <div className="mesh-bg">
                    <div className="grid-overlay-dark absolute inset-0 opacity-60" />
                    <div className="aurora absolute w-[45vw] h-[45vw] rounded-full blur-3xl -top-20 right-0"
                         style={{ background: 'radial-gradient(circle, rgba(139,123,247,0.22), transparent 60%)' }} />
                    <div className="aurora absolute w-[40vw] h-[40vw] rounded-full blur-3xl top-20 -left-20"
                         style={{ background: 'radial-gradient(circle, rgba(0,168,150,0.18), transparent 60%)' }} />
                </div>

                <div className="relative max-w-6xl mx-auto px-6">
                    <Reveal>
                        {/* badge */}
                        <div className="inline-flex items-center gap-2.5 rounded-full pl-2.5 pr-4 py-1.5 mb-7"
                             style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-teal opacity-75 animate-ping" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal" />
                            </span>
                            <span className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-white/60">
                                The people behind akclnt
                            </span>
                        </div>

                        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold max-w-3xl leading-[1.03] tracking-[-0.02em]">
                            A small team<br />that <span className="text-gradient">ships.</span>
                        </h1>

                        <p className="text-white/55 mt-6 max-w-xl text-lg leading-relaxed">
                            No account managers, no middlemen — you work directly with the developers
                            and designers building your project.
                        </p>

                        {/* avatar stack + stats */}
                        <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-6">
                            {/* stacked avatars */}
                            <div className="flex items-center">
                                {[...founders, ...developers].slice(0, 6).map((m, i) => (
                                    <div key={m.name}
                                         className="relative rounded-full"
                                         style={{ marginLeft: i === 0 ? 0 : '-14px', zIndex: 10 - i }}>
                                        {m.image ? (
                                            <img src={m.image} alt={m.name}
                                                 className="w-11 h-11 rounded-full object-cover"
                                                 style={{ border: '2px solid #06070C' }} />
                                        ) : (
                                            <div className="w-11 h-11 rounded-full flex items-center justify-center font-display text-white text-sm font-bold"
                                                 style={{ background: `linear-gradient(135deg, ${m.accent.from}, ${m.accent.to})`, border: '2px solid #06070C' }}>
                                                {m.name.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* stats */}
                            <div className="flex items-center gap-6">
                                {[
                                    { value: '3', label: 'Founders' },
                                    { value: '5', label: 'Builders' },
                                    { value: '100%', label: 'In-house' },
                                ].map((s, i) => (
                                    <div key={s.label} className="flex items-center gap-6">
                                        {i > 0 && <span className="h-8 w-px bg-white/10" />}
                                        <div>
                                            <div className="font-display text-2xl font-bold text-white leading-none">{s.value}</div>
                                            <div className="mt-1.5 font-mono text-[0.62rem] uppercase tracking-wider text-white/45">{s.label}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ===== FOUNDERS ===== */}
            <section className="relative py-24 overflow-hidden" style={{ backgroundColor: '#ffffff' }}>
                <div className="grid-overlay absolute inset-0 opacity-20" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[350px] blur-[130px] opacity-10 pointer-events-none"
                     style={{ background: 'radial-gradient(ellipse, #5B5FEF, transparent 70%)' }} />
                <div className="relative max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16 max-w-2xl mx-auto">
                        <p className="font-mono text-xs uppercase tracking-[0.25em] text-signal mb-4">Leadership</p>
                        <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-ink">
                            The <span className="text-gradient">founders.</span>
                        </h2>
                        <p className="text-graphite mt-5 leading-relaxed">
                            Three partners who handle everything together — from code to clients.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {founders.map((m, i) => (
                            <Reveal key={m.name} delay={i * 0.1}>
                                <div className="group relative h-full rounded-3xl p-px overflow-hidden transition-all duration-500 hover:-translate-y-2"
                                     style={{ background: `linear-gradient(160deg, ${m.accent.from}55, rgba(0,0,0,0.05) 50%)` }}>
                                    <div className="relative h-full rounded-3xl overflow-hidden flex flex-col bg-white"
                                         style={{ boxShadow: `0 20px 50px -20px ${m.accent.glow}` }}>
                                        <div className="relative pt-12 pb-8 flex justify-center"
                                             style={{ background: `linear-gradient(180deg, ${m.accent.from}12, transparent)` }}>
                                            <Avatar name={m.name} image={m.image} accent={m.accent} size="w-40 h-40" />
                                        </div>
                                        <div className="px-7 pb-8 text-center flex flex-col flex-1">
                                            <h3 className="font-display text-xl font-bold text-ink">{m.name}</h3>
                                            <p className="font-mono text-[0.68rem] uppercase tracking-wider mt-2" style={{ color: m.accent.from }}>
                                                {m.role}
                                            </p>
                                            <p className="text-graphite text-sm mt-4 leading-relaxed flex-1">{m.focus}</p>
                                            <SocialLinks socials={m.socials} accent={m.accent} />
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== DEVELOPERS ===== */}
            <section className="relative py-24 overflow-hidden" style={{ backgroundColor: '#f0f4f8' }}>
                <div className="absolute inset-0 pointer-events-none"
                     style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,168,150,0.06), transparent 70%)' }} />
                <div className="relative max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16 max-w-2xl mx-auto">
                        <p className="font-mono text-xs uppercase tracking-[0.25em] text-teal mb-4">The team</p>
                        <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-ink">
                            The people who <span className="text-gradient">build it.</span>
                        </h2>
                        <p className="text-graphite mt-5 leading-relaxed">
                            Developers and designers who turn the plan into working software.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {developers.map((m, i) => (
                            <Reveal key={m.name} delay={(i % 3) * 0.08}>
                                <div className="group relative h-full rounded-3xl p-px overflow-hidden transition-all duration-500 hover:-translate-y-2"
                                     style={{ background: `linear-gradient(160deg, ${m.accent.from}44, rgba(0,0,0,0.05) 50%)` }}>
                                    <div className="relative h-full rounded-3xl overflow-hidden flex flex-col bg-white"
                                         style={{ boxShadow: `0 16px 40px -18px ${m.accent.from}33` }}>
                                        <div className="relative pt-10 pb-6 flex justify-center"
                                             style={{ background: `linear-gradient(180deg, ${m.accent.from}10, transparent)` }}>
                                            <Avatar name={m.name} image={m.image} accent={m.accent} size="w-36 h-36" />
                                        </div>
                                        <div className="px-7 pb-8 text-center flex flex-col flex-1">
                                            <h3 className="font-display text-lg font-bold text-ink">{m.name}</h3>
                                            <p className="font-mono text-[0.66rem] uppercase tracking-wider mt-2" style={{ color: m.accent.from }}>
                                                {m.role}
                                            </p>
                                            <p className="text-graphite text-sm mt-4 leading-relaxed flex-1">{m.focus}</p>

                                            {/* skills */}
                                            {m.skills?.length > 0 && (
                                                <div className="flex flex-wrap justify-center gap-2 mt-5">
                                                    {m.skills.map((s) => (
                                                        <span key={s} className="font-mono text-[0.6rem] uppercase tracking-wider px-2.5 py-1 rounded-full"
                                                              style={{ background: `${m.accent.from}14`, color: m.accent.from }}>
                                                            {s}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}

                                            <SocialLinks socials={m.socials} accent={m.accent} />
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CTA ===== */}
            <section className="max-w-6xl mx-auto px-6 py-20">
                <Reveal>
                    <div className="relative bg-ink text-paper rounded-3xl p-10 md:p-14 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 overflow-hidden">
                        <div className="aurora absolute right-0 top-0 w-72 h-72 rounded-full blur-3xl"
                             style={{ background: 'radial-gradient(circle, rgba(0,168,150,0.2), transparent 60%)' }} />
                        <h2 className="relative font-display text-2xl md:text-3xl font-semibold max-w-sm">
                            Want to join a team that ships?
                        </h2>
                        <Link to="/contact" className="relative inline-flex items-center gap-2 bg-white text-ink px-6 py-3.5 rounded-full font-medium hover:bg-signal hover:text-white transition-colors whitespace-nowrap">
                            Get in Touch <ArrowUpRight size={16} />
                        </Link>
                    </div>
                </Reveal>
            </section>
        </div>
    );
}