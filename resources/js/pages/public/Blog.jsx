import Seo from '../../components/ui/Seo.jsx';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowUpRight, Search, Sparkles, Clock, ArrowRight } from 'lucide-react';
import Reveal from '../../components/ui/Reveal.jsx';

export default function Blog() {
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [activeCat, setActiveCat] = useState('all');
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const params = {};
        if (activeCat !== 'all') params.category = activeCat;
        if (query) params.q = query;

        const t = setTimeout(() => {
            axios.get('/api/posts', { params })
                .then((res) => setPosts(res.data.data || []))
                .catch(console.error)
                .finally(() => setLoading(false));
        }, query ? 350 : 0);

        return () => clearTimeout(t);
    }, [activeCat, query]);

    useEffect(() => {
        axios.get('/api/posts/categories').then((res) => setCategories(res.data)).catch(() => {});
    }, []);

    const fmt = (d) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    const readTime = (p) => Math.max(1, Math.ceil((p.excerpt?.split(' ').length || 40) / 40));

    const showFeatured = activeCat === 'all' && !query && posts.length > 0;
    const featured = showFeatured ? posts[0] : null;
    const rest = showFeatured ? posts.slice(1) : posts;

    return (
        <>
        <Seo path="/blog" title="Blog — Web, AI & Marketing Insights | AKCLNT" description="Practical guides and insights on web development, AI automation, and digital marketing for Pakistani businesses — from the AKCLNT team." />
        <div className="overflow-hidden">
            {/* ===== HEADER ===== */}
            <section className="relative bg-void text-paper pt-36 pb-28 overflow-hidden">
                <div className="grid-overlay-dark absolute inset-0 opacity-50" />
                <div className="aurora absolute w-[45vw] h-[45vw] rounded-full blur-3xl -top-24 right-0"
                     style={{ background: 'radial-gradient(circle, rgba(91,95,239,0.22), transparent 60%)' }} />
                <div className="aurora absolute w-[35vw] h-[35vw] rounded-full blur-3xl top-20 -left-20"
                     style={{ background: 'radial-gradient(circle, rgba(0,168,150,0.16), transparent 60%)' }} />
                <div className="relative max-w-6xl mx-auto px-6">
                    <Reveal>
                        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-7"
                             style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <Sparkles size={13} className="text-teal" />
                            <span className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-white/60">Insights</span>
                        </div>
                        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold max-w-3xl leading-[1.03] tracking-[-0.02em]">
                            Notes on building<br /><span className="text-gradient">software.</span>
                        </h1>
                        <p className="text-white/55 mt-7 max-w-xl text-lg leading-relaxed">
                            What we learn shipping websites, apps, and automation for real businesses —
                            written for the people who have to live with the result.
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* ===== FEATURED ===== */}
            {featured && !loading && (
                <section className="max-w-6xl mx-auto px-6 -mt-14 relative z-10">
                    <Reveal>
                        <Link to={`/blog/${featured.slug}`}
                              className="group block rounded-3xl overflow-hidden bg-white border border-mist hover:border-signal transition-colors"
                              style={{ boxShadow: '0 24px 60px -30px rgba(91,95,239,0.45)' }}>
                            <div className="grid md:grid-cols-2">
                                <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[320px] overflow-hidden bg-ink">
                                    {featured.cover_image ? (
                                        <img src={featured.cover_image} alt={featured.title}
                                             className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center"
                                             style={{ background: 'linear-gradient(135deg, rgba(91,95,239,0.3), rgba(0,168,150,0.18))' }}>
                                            <span className="font-display text-5xl font-black text-white/15">akclnt</span>
                                        </div>
                                    )}
                                    <span className="absolute top-5 left-5 font-mono text-[10px] uppercase tracking-[0.18em] text-white px-3 py-1.5 rounded-full"
                                          style={{ background: 'linear-gradient(135deg, #5B5FEF, #8B7BF7)' }}>
                                        Latest
                                    </span>
                                </div>

                                <div className="p-8 md:p-10 flex flex-col justify-center">
                                    <div className="flex items-center gap-4 font-mono text-[0.65rem] uppercase tracking-wider text-graphite mb-4">
                                        {featured.category && <span className="text-signal">{featured.category}</span>}
                                        <span>{fmt(featured.published_at)}</span>
                                        <span className="flex items-center gap-1.5"><Clock size={11} /> {readTime(featured)} min</span>
                                    </div>
                                    <h2 className="font-display text-2xl md:text-3xl font-bold text-ink leading-snug mb-4">
                                        {featured.title}
                                    </h2>
                                    <p className="text-graphite leading-relaxed line-clamp-3">{featured.excerpt}</p>
                                    <span className="inline-flex items-center gap-2 font-medium text-signal mt-7 group-hover:gap-3 transition-all">
                                        Read article <ArrowRight size={16} />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </Reveal>
                </section>
            )}

            {/* ===== FILTERS + GRID ===== */}
            <section className="max-w-6xl mx-auto px-6 py-20">
                <Reveal>
                    <div className="flex flex-wrap items-center justify-between gap-5 mb-12 pb-6 border-b border-mist">
                        <div className="flex flex-wrap gap-2">
                            {['all', ...categories.map((c) => c.category)].map((c) => {
                                const active = activeCat === c;
                                const count = c === 'all' ? null : categories.find((x) => x.category === c)?.total;
                                return (
                                    <button key={c} onClick={() => setActiveCat(c)}
                                            className={`font-mono text-[0.68rem] uppercase tracking-wider px-4 py-2 rounded-full transition-all ${
                                                active ? 'text-white' : 'text-graphite hover:text-ink'}`}
                                            style={active
                                                ? { background: 'linear-gradient(135deg, #5B5FEF, #8B7BF7)', boxShadow: '0 4px 14px -4px rgba(91,95,239,0.5)' }
                                                : { border: '1px solid #E4E4E0' }}>
                                        {c === 'all' ? 'All' : c}
                                        {count != null && <span className="ml-1.5 opacity-60">{count}</span>}
                                    </button>
                                );
                            })}
                        </div>
                        <div className="relative">
                            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-graphite" />
                            <input value={query} onChange={(e) => setQuery(e.target.value)}
                                   placeholder="Search articles..."
                                   className="pl-11 pr-4 py-2.5 rounded-full border border-mist text-sm w-full sm:w-64 outline-none focus:border-signal transition-colors" />
                        </div>
                    </div>
                </Reveal>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
                        {[...Array(3)].map((_, i) => <div key={i} className="h-80 rounded-2xl bg-mist/40 animate-pulse" />)}
                    </div>
                ) : rest.length === 0 ? (
                    <div className="py-24 text-center">
                        <p className="font-display text-lg text-ink mb-2">
                            {query ? 'Nothing matched that search.' : 'No articles yet.'}
                        </p>
                        <p className="text-graphite text-sm">
                            {query ? 'Try a different term.' : 'We are writing the first few — check back soon.'}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                        {rest.map((post, i) => (
                            <Reveal key={post.id} delay={(i % 3) * 0.07}>
                                <Link to={`/blog/${post.slug}`} className="group h-full flex flex-col">
                                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-ink mb-5">
                                        {post.cover_image ? (
                                            <img src={post.cover_image} alt={post.title} loading="lazy"
                                                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center relative"
                                                 style={{ background: 'linear-gradient(135deg, rgba(91,95,239,0.25), rgba(0,168,150,0.15))' }}>
                                                <div className="grid-overlay-dark absolute inset-0 opacity-30" />
                                                <span className="relative font-display text-3xl font-black text-white/15">akclnt</span>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl" />
                                    </div>

                                    <div className="flex items-center gap-3 font-mono text-[0.62rem] uppercase tracking-wider text-graphite mb-3">
                                        {post.category && <span className="text-signal">{post.category}</span>}
                                        {post.category && <span className="w-1 h-1 rounded-full bg-mist" />}
                                        <span>{fmt(post.published_at)}</span>
                                    </div>

                                    <h2 className="font-display text-lg font-semibold text-ink leading-snug mb-2.5 group-hover:text-signal transition-colors">
                                        {post.title}
                                    </h2>
                                    <p className="text-graphite text-sm leading-relaxed line-clamp-2 flex-1">{post.excerpt}</p>

                                    <span className="inline-flex items-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-wider text-signal mt-4 group-hover:gap-2.5 transition-all">
                                        Read <ArrowUpRight size={13} />
                                    </span>
                                </Link>
                            </Reveal>
                        ))}
                    </div>
                )}
            </section>

            {/* ===== CTA ===== */}
            <section className="max-w-5xl mx-auto px-6 pb-24">
                <Reveal>
                    <div className="relative rounded-3xl p-12 md:p-16 text-center overflow-hidden"
                         style={{ background: 'linear-gradient(135deg, #0B0D14, #10121C)' }}>
                        <div className="aurora absolute left-1/2 top-0 -translate-x-1/2 w-[50vw] h-72 rounded-full blur-3xl"
                             style={{ background: 'radial-gradient(circle, rgba(91,95,239,0.3), transparent 65%)' }} />
                        <div className="relative">
                            <h2 className="font-display text-2xl md:text-3xl font-bold text-white max-w-md mx-auto">
                                Got a project in mind?
                            </h2>
                            <p className="text-white/55 mt-4 max-w-sm mx-auto leading-relaxed">
                                Tell us what you're building — free quote within 24 hours.
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