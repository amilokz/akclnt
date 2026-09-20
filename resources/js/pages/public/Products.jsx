import Seo from '../../components/ui/Seo.jsx';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowUpRight, Check, Package, ExternalLink, Sparkles, Zap, ShieldCheck, RefreshCw } from 'lucide-react';
import Reveal from '../../components/ui/Reveal.jsx';

const perks = [
    { Icon: Zap,         title: 'Instant download',   desc: 'Get the files the moment you buy.' },
    { Icon: ShieldCheck, title: 'Production-tested',  desc: 'Every product runs on real client projects.' },
    { Icon: RefreshCw,   title: 'Free updates',       desc: 'Buy once, get improvements as they ship.' },
];

export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        axios.get('/api/products')
            .then((res) => setProducts(Array.isArray(res.data) ? res.data : []))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const categories = [...new Set(products.map((p) => p.category).filter(Boolean))];
    const visible = filter === 'all' ? products : products.filter((p) => p.category === filter);

    const sym = { USD: '$', EUR: '€', GBP: '£', PKR: 'Rs ' };
    const money = (p) => {
        if (Number(p.price) === 0) return 'Free';
        const s = sym[p.currency] || '$';
        return `${s}${Number(p.price) % 1 === 0 ? Number(p.price) : Number(p.price).toFixed(2)}`;
    };

    return (
        <>
        <Seo path="/products" title="Digital Products & Tools | AKCLNT" description="Browse ready-made digital products, boilerplates, and tools built by AKCLNT to help you launch faster." />
        <div className="overflow-hidden">
            {/* ===== HEADER ===== */}
            <section className="relative bg-void text-paper pt-36 pb-32 overflow-hidden">
                <div className="grid-overlay-dark absolute inset-0 opacity-50" />
                <div className="aurora absolute w-[50vw] h-[45vw] rounded-full blur-3xl -top-24 left-1/2 -translate-x-1/2"
                     style={{ background: 'radial-gradient(circle, rgba(91,95,239,0.24), transparent 60%)' }} />
                <div className="relative max-w-4xl mx-auto px-6 text-center">
                    <Reveal>
                        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-7"
                             style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <Sparkles size={13} className="text-teal" />
                            <span className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-white/60">Digital products</span>
                        </div>
                        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.03] tracking-[-0.02em]">
                            Tools we built,<br /><span className="text-gradient">ready for you.</span>
                        </h1>
                        <p className="text-white/55 mt-7 text-lg leading-relaxed max-w-xl mx-auto">
                            Templates, boilerplates, and automation workflows we use on real client
                            projects — packaged so you can skip the setup and start building.
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* ===== PERKS STRIP ===== */}
            <section className="max-w-5xl mx-auto px-6 -mt-16 relative z-10">
                <Reveal>
                    <div className="grid sm:grid-cols-3 gap-px rounded-2xl overflow-hidden"
                         style={{ background: '#E4E4E0', boxShadow: '0 20px 50px -30px rgba(0,0,0,0.25)' }}>
                        {perks.map(({ Icon, title, desc }) => (
                            <div key={title} className="bg-white p-6 text-center">
                                <Icon size={20} className="mx-auto text-signal mb-3" />
                                <h3 className="font-display text-sm font-bold text-ink">{title}</h3>
                                <p className="text-graphite text-xs mt-1.5 leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </Reveal>
            </section>

            {/* ===== GRID ===== */}
            <section className="max-w-6xl mx-auto px-6 py-20">
                {categories.length > 1 && (
                    <Reveal>
                        <div className="flex flex-wrap gap-2 mb-12 pb-6 border-b border-mist">
                            {['all', ...categories].map((c) => {
                                const active = filter === c;
                                return (
                                    <button key={c} onClick={() => setFilter(c)}
                                            className={`font-mono text-[0.68rem] uppercase tracking-wider px-4 py-2 rounded-full transition-all ${
                                                active ? 'text-white' : 'text-graphite hover:text-ink'}`}
                                            style={active
                                                ? { background: 'linear-gradient(135deg, #5B5FEF, #8B7BF7)', boxShadow: '0 4px 14px -4px rgba(91,95,239,0.5)' }
                                                : { border: '1px solid #E4E4E0' }}>
                                        {c === 'all' ? 'All products' : c}
                                    </button>
                                );
                            })}
                        </div>
                    </Reveal>
                )}

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                        {[...Array(3)].map((_, i) => <div key={i} className="h-[26rem] rounded-2xl bg-mist/40 animate-pulse" />)}
                    </div>
                ) : visible.length === 0 ? (
                    <div className="py-24 text-center">
                        <div className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center"
                             style={{ background: 'linear-gradient(135deg, rgba(91,95,239,0.1), rgba(0,168,150,0.08))', border: '1px solid rgba(91,95,239,0.15)' }}>
                            <Package size={26} className="text-signal" strokeWidth={1.5} />
                        </div>
                        <p className="font-display text-lg text-ink mb-2">Products coming soon</p>
                        <p className="text-graphite text-sm max-w-sm mx-auto">
                            We're packaging the tools we use internally. In the meantime, we build custom.
                        </p>
                        <Link to="/contact" className="inline-flex items-center gap-2 mt-7 text-signal font-medium text-sm hover:gap-3 transition-all">
                            Talk to us about custom work <ArrowUpRight size={15} />
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                        {visible.map((p, i) => (
                            <Reveal key={p.id} delay={(i % 3) * 0.07}>
                                <div className="group relative h-full rounded-2xl p-px overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
                                     style={{ background: p.is_featured
                                         ? 'linear-gradient(160deg, #5B5FEF, rgba(0,0,0,0.06) 55%)'
                                         : 'linear-gradient(160deg, rgba(0,0,0,0.09), rgba(0,0,0,0.04))' }}>
                                    <div className="relative h-full flex flex-col bg-white rounded-2xl overflow-hidden"
                                         style={{ boxShadow: p.is_featured ? '0 20px 50px -28px rgba(91,95,239,0.6)' : '0 12px 34px -26px rgba(0,0,0,0.3)' }}>

                                        {p.is_featured && (
                                            <span className="absolute top-4 right-4 z-10 font-mono text-[9px] uppercase tracking-[0.15em] text-white px-2.5 py-1 rounded-full"
                                                  style={{ background: 'linear-gradient(135deg, #5B5FEF, #8B7BF7)' }}>
                                                Popular
                                            </span>
                                        )}

                                        <div className="relative aspect-[16/10] overflow-hidden bg-ink">
                                            {p.image ? (
                                                <img src={p.image} alt={p.name} loading="lazy"
                                                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center relative"
                                                     style={{ background: 'linear-gradient(135deg, rgba(91,95,239,0.25), rgba(0,168,150,0.15))' }}>
                                                    <div className="grid-overlay-dark absolute inset-0 opacity-30" />
                                                    <Package size={36} className="relative text-white/25" strokeWidth={1.4} />
                                                </div>
                                            )}
                                            {p.category && (
                                                <span className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-wider text-white glass-dark px-2.5 py-1 rounded-full">
                                                    {p.category}
                                                </span>
                                            )}
                                        </div>

                                        <div className="p-7 flex flex-col flex-1">
                                            <h2 className="font-display text-lg font-bold text-ink leading-snug">{p.name}</h2>
                                            {p.tagline && <p className="text-graphite text-sm mt-2 leading-relaxed">{p.tagline}</p>}

                                            {p.features?.length > 0 && (
                                                <ul className="space-y-2.5 mt-6 flex-1">
                                                    {p.features.slice(0, 4).map((f) => (
                                                        <li key={f} className="flex items-start gap-2.5 text-sm text-graphite">
                                                            <span className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                                                                  style={{ background: 'rgba(0,168,150,0.12)' }}>
                                                                <Check size={10} className="text-teal" strokeWidth={3} />
                                                            </span>
                                                            {f}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}

                                            <div className="mt-7 pt-6 border-t border-mist">
                                                <div className="flex items-end justify-between mb-4">
                                                    <div>
                                                        <div className="font-mono text-[0.6rem] uppercase tracking-wider text-graphite mb-1">
                                                            {Number(p.price) === 0 ? 'Price' : 'One-time'}
                                                        </div>
                                                        <span className="font-display text-3xl font-bold text-ink leading-none">{money(p)}</span>
                                                    </div>
                                                    {p.demo_url && (
                                                        <a href={p.demo_url} target="_blank" rel="noopener noreferrer"
                                                           className="inline-flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-wider text-graphite hover:text-signal transition-colors">
                                                            Demo <ExternalLink size={12} />
                                                        </a>
                                                    )}
                                                </div>

                                                {p.buy_url ? (
                                                    <a href={p.buy_url} target="_blank" rel="noopener noreferrer"
                                                       className="w-full inline-flex items-center justify-center gap-2 text-white text-sm font-medium py-3 rounded-xl transition-all hover:opacity-90"
                                                       style={{ background: 'linear-gradient(135deg, #5B5FEF, #8B7BF7)', boxShadow: '0 8px 20px -8px rgba(91,95,239,0.55)' }}>
                                                        Get it now <ArrowUpRight size={15} />
                                                    </a>
                                                ) : (
                                                    <Link to="/contact"
                                                          className="w-full inline-flex items-center justify-center gap-2 text-sm font-medium py-3 rounded-xl border border-mist text-ink hover:border-signal hover:text-signal transition-colors">
                                                        Enquire
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                )}

                {/* CTA */}
                <Reveal>
                    <div className="relative rounded-3xl p-12 md:p-16 mt-20 text-center overflow-hidden"
                         style={{ background: 'linear-gradient(135deg, #0B0D14, #10121C)' }}>
                        <div className="aurora absolute left-1/2 top-0 -translate-x-1/2 w-[50vw] h-72 rounded-full blur-3xl"
                             style={{ background: 'radial-gradient(circle, rgba(0,168,150,0.24), transparent 65%)' }} />
                        <div className="relative">
                            <h2 className="font-display text-2xl md:text-3xl font-bold text-white max-w-md mx-auto">
                                Need something built for your business?
                            </h2>
                            <p className="text-white/55 mt-4 max-w-sm mx-auto leading-relaxed">
                                These are our off-the-shelf tools. For custom work, we start from scratch.
                            </p>
                            <Link to="/contact" className="inline-flex items-center gap-2 mt-8 bg-white text-ink px-7 py-3.5 rounded-full font-medium hover:bg-signal hover:text-white transition-colors">
                                Start a Project <ArrowUpRight size={16} />
                            </Link>
                        </div>
                    </div>
                </Reveal>
            </section>
        </div>
                </>

    );
}