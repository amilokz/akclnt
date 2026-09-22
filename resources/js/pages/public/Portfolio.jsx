import Seo from '../../components/ui/Seo.jsx';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, X, Play } from 'lucide-react';
import Reveal from '../../components/ui/Reveal.jsx';
import TiltCard from '../../components/ui/TiltCard.jsx';

const categories = ['All', 'Company', 'Client', 'Personal'];

export default function Portfolio() {
    const [filter, setFilter] = useState('All');
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeVideo, setActiveVideo] = useState(null);

    useEffect(() => {
        fetch('/api/portfolio')
            .then((r) => r.json())
            .then((data) => setProjects(Array.isArray(data) ? data : []))
            .catch(() => setProjects([]))
            .finally(() => setLoading(false));
    }, []);

    const toEmbed = (url) => {
        if (!url) return null;
        const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/);
        return m ? `https://www.youtube.com/embed/${m[1]}?autoplay=1&rel=0` : null;
    };
    const visible = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

    return (
        <>
        <Seo path="/portfolio" title="Our Work — Projects & Case Studies | AKCLNT" description="See projects AKCLNT has shipped — web platforms, client websites, mobile apps, and automation tools built for businesses across Pakistan and internationally." />
        <div className="overflow-hidden">
            {/* Header */}
            <section className="relative bg-void text-paper pt-36 pb-28 overflow-hidden">
                <div className="mesh-bg">
                    <div className="grid-overlay-dark absolute inset-0 opacity-60" />
                    <div className="aurora absolute w-[45vw] h-[45vw] rounded-full blur-3xl top-0 -left-10"
                         style={{ background: 'radial-gradient(circle, rgba(0,168,150,0.22), transparent 60%)' }} />
                    <div className="aurora absolute w-[40vw] h-[40vw] rounded-full blur-3xl top-10 right-0"
                         style={{ background: 'radial-gradient(circle, rgba(91,95,239,0.20), transparent 60%)' }} />
                </div>

                <div className="relative max-w-6xl mx-auto px-6">
                    <Reveal>
                        <div className="inline-flex items-center gap-2.5 rounded-full pl-2.5 pr-4 py-1.5 mb-7"
                             style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-teal opacity-75 animate-ping" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal" />
                            </span>
                            <span className="font-mono text-[0.68rem] font-semibold tracking-[0.22em] text-white/70 uppercase">
                                Our work
                            </span>
                        </div>

                        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold max-w-3xl leading-[1.03] tracking-[-0.02em]">
                            A few things<br />we've <span className="text-gradient">shipped.</span>
                        </h1>

                        <p className="text-white/55 mt-6 max-w-xl text-lg leading-relaxed">
                            Real projects, built for real businesses — company platforms,
                            client websites, and tools we've shipped end to end.
                        </p>

                        <div className="mt-10 flex flex-wrap items-center gap-6">
                            {[
                                { value: '100+', label: 'Projects' },
                                { value: '3', label: 'Categories' },
                                { value: '24h', label: 'Response' },
                            ].map((s, i) => (
                                <div key={s.label} className="flex items-center gap-6">
                                    {i > 0 && <span className="h-8 w-px bg-white/10" />}
                                    <div>
                                        <div className="font-display text-2xl font-bold text-white leading-none">{s.value}</div>
                                        <div className="mt-1.5 font-mono text-[0.65rem] uppercase tracking-wider text-white/45">{s.label}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
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

                {loading ? (
                    <p className="text-graphite font-mono text-sm">Loading projects…</p>
                ) : visible.length === 0 ? (
                    <p className="text-graphite font-mono text-sm">No projects yet.</p>
                ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {visible.map((project, i) => (
                        <Reveal key={project.id} delay={(i % 2) * 0.08}>
                            <TiltCard max={7} className="h-full">
                                <div className="group relative h-full flex flex-col bg-white border border-mist rounded-2xl overflow-hidden hover:border-signal transition-colors">
                                    <div className="relative h-48 overflow-hidden bg-ink">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            loading="lazy"
                                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />

                                        {project.video && (
                                            <button
                                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveVideo(project); }}
                                                aria-label={`Play ${project.title} demo`}
                                                className="absolute inset-0 flex items-center justify-center group/play"
                                            >
                                                <span className="w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-300 group-hover/play:scale-110"
                                                      style={{ background: 'rgba(255,255,255,0.92)', boxShadow: '0 8px 24px -6px rgba(0,0,0,0.5)' }}>
                                                    <Play size={20} className="text-ink ml-0.5" fill="currentColor" />
                                                </span>
                                            </button>
                                        )}

                                        <span className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-wider text-white glass-dark px-2.5 py-1 rounded-full">
                                            {project.category}
                                        </span>

                                        {project.video && (
                                            <span className="absolute top-4 right-4 font-mono text-[10px] uppercase tracking-wider text-white glass-dark px-2.5 py-1 rounded-full">
                                                Demo
                                            </span>
                                        )}
                                    </div>
                                    <div className="p-7 flex flex-col flex-1">
                                        <h2 className="font-display text-xl font-semibold text-ink mb-3">{project.title}</h2>
                                        <p className="text-graphite text-sm leading-relaxed mb-5 flex-1">{project.description}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {(project.tags || []).map((tag) => (
                                                <span key={tag} className="font-mono text-xs bg-signal-dim text-signal px-2.5 py-1 rounded-full">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        {project.link && (
                                            
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="inline-flex items-center gap-1.5 mt-5 font-mono text-xs uppercase tracking-wider text-signal hover:text-ink transition-colors"
                                            >
                                                Visit Project <ArrowUpRight size={14} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </TiltCard>
                        </Reveal>
                    ))}
                </div>
                )}

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

            {/* ===== VIDEO MODAL ===== */}
            {activeVideo && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
                     style={{ background: 'rgba(0,0,0,0.85)' }}
                     onClick={() => setActiveVideo(null)}>
                    <button
                        onClick={() => setActiveVideo(null)}
                        aria-label="Close video"
                        className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors"
                        style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
                    >
                        <X size={20} />
                    </button>

                    <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
                        <div className="rounded-2xl overflow-hidden" style={{ background: '#000', border: '1px solid rgba(255,255,255,0.12)' }}>
                            {toEmbed(activeVideo.video) ? (
                                <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                                    <iframe
                                        src={toEmbed(activeVideo.video)}
                                        title={activeVideo.title}
                                        className="absolute inset-0 w-full h-full"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                            ) : (
                                <video
                                    src={activeVideo.video}
                                    controls
                                    autoPlay
                                    playsInline
                                    className="w-full max-h-[75vh] bg-black"
                                />
                            )}
                        </div>
                        <p className="text-white font-display text-lg font-semibold mt-4 text-center">
                            {activeVideo.title}
                        </p>
                    </div>
                </div>
            )}
        </div>
                </>

    );
}
