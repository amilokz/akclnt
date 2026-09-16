import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { ArrowUpRight, ArrowLeft, Clock, Eye } from 'lucide-react';
import Reveal from '../../components/ui/Reveal.jsx';

function renderMarkdown(md = '') {
    const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const blocks = [];

    // pull out fenced code first
    let text = md.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
        blocks.push(`<pre class="code-block"><code>${esc(code.trim())}</code></pre>`);
        return `\u0000BLOCK${blocks.length - 1}\u0000`;
    });

    const inline = (s) => esc(s)
        .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
        .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="md-img" loading="lazy">')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/\*([^*]+)\*/g, '<em>$1</em>');

    const html = text.split(/\n{2,}/).map((chunk) => {
        const c = chunk.trim();
        if (!c) return '';
        if (/^\u0000BLOCK\d+\u0000$/.test(c)) return c;
        if (/^###\s/.test(c)) return `<h3>${inline(c.replace(/^###\s/, ''))}</h3>`;
        if (/^##\s/.test(c))  return `<h2>${inline(c.replace(/^##\s/, ''))}</h2>`;
        if (/^#\s/.test(c))   return `<h1>${inline(c.replace(/^#\s/, ''))}</h1>`;
        if (/^>\s/.test(c))   return `<blockquote>${inline(c.replace(/^>\s?/gm, ''))}</blockquote>`;
        if (/^(-{3,}|\*{3,})$/.test(c)) return '<hr>';
        if (/^[-*]\s/m.test(c) && c.split('\n').every((l) => /^[-*]\s/.test(l.trim()))) {
            return `<ul>${c.split('\n').map((l) => `<li>${inline(l.replace(/^[-*]\s/, '').trim())}</li>`).join('')}</ul>`;
        }
        if (/^\d+\.\s/m.test(c) && c.split('\n').every((l) => /^\d+\.\s/.test(l.trim()))) {
            return `<ol>${c.split('\n').map((l) => `<li>${inline(l.replace(/^\d+\.\s/, '').trim())}</li>`).join('')}</ol>`;
        }
        return `<p>${inline(c).replace(/\n/g, '<br>')}</p>`;
    }).join('\n');

    return html.replace(/\u0000BLOCK(\d+)\u0000/g, (_, i) => blocks[i]);
}

export default function BlogPost() {
    const { slug } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        setLoading(true);
        setNotFound(false);
        window.scrollTo(0, 0);
        axios.get(`/api/posts/${slug}`)
            .then((res) => setData(res.data))
            .catch(() => setNotFound(true))
            .finally(() => setLoading(false));
    }, [slug]);

    const fmt = (d) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

    if (loading) {
        return (
            <div className="pt-36 pb-24 max-w-3xl mx-auto px-6">
                <div className="h-10 bg-mist/50 rounded animate-pulse mb-4" />
                <div className="h-64 bg-mist/50 rounded-2xl animate-pulse" />
            </div>
        );
    }

    if (notFound || !data) {
        return (
            <div className="pt-40 pb-32 text-center px-6">
                <h1 className="font-display text-3xl font-bold text-ink">Article not found</h1>
                <Link to="/blog" className="inline-flex items-center gap-2 mt-6 text-signal font-medium">
                    <ArrowLeft size={16} /> Back to all articles
                </Link>
            </div>
        );
    }

    const { post, related, reading_time } = data;

    return (
        <div className="overflow-hidden">
            {/* header */}
            <section className="relative bg-void text-paper pt-36 pb-20 overflow-hidden">
                <div className="grid-overlay-dark absolute inset-0 opacity-40" />
                <div className="aurora absolute w-[45vw] h-[45vw] rounded-full blur-3xl -top-20 left-1/4"
                     style={{ background: 'radial-gradient(circle, rgba(91,95,239,0.2), transparent 60%)' }} />
                <div className="relative max-w-3xl mx-auto px-6">
                    <Link to="/blog" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-white/50 hover:text-white transition-colors mb-8">
                        <ArrowLeft size={14} /> All articles
                    </Link>
                    {post.category && (
                        <span className="inline-block font-mono text-[0.65rem] uppercase tracking-wider text-teal mb-4">
                            {post.category}
                        </span>
                    )}
                    <h1 className="font-display text-3xl md:text-5xl font-bold leading-[1.1] tracking-[-0.02em]">
                        {post.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-5 mt-7 font-mono text-[0.68rem] uppercase tracking-wider text-white/45">
                        <span>{fmt(post.published_at)}</span>
                        <span className="flex items-center gap-1.5"><Clock size={12} /> {reading_time} min read</span>
                        <span className="flex items-center gap-1.5"><Eye size={12} /> {post.views}</span>
                        {post.author?.name && <span>By {post.author.name}</span>}
                    </div>
                </div>
            </section>

            {/* cover */}
            {post.cover_image && (
                <div className="max-w-4xl mx-auto px-6 -mt-10 relative z-10">
                    <img src={post.cover_image} alt={post.title}
                         className="w-full rounded-2xl shadow-2xl aspect-[16/9] object-cover" />
                </div>
            )}

            {/* body */}
            <article className="max-w-3xl mx-auto px-6 py-16">
                <div className="post-body" dangerouslySetInnerHTML={{ __html: renderMarkdown(post.body) }} />

                {post.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-mist">
                        {post.tags.map((t) => (
                            <span key={t} className="font-mono text-xs bg-signal-dim text-signal px-3 py-1.5 rounded-full">{t}</span>
                        ))}
                    </div>
                )}
            </article>

            {/* related */}
            {related?.length > 0 && (
                <section className="max-w-6xl mx-auto px-6 pb-20">
                    <h2 className="font-display text-2xl font-bold text-ink mb-8">More like this</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {related.map((r) => (
                            <Link key={r.id} to={`/blog/${r.slug}`}
                                  className="group bg-white border border-mist rounded-2xl p-6 hover:border-signal transition-colors">
                                <span className="font-mono text-[0.62rem] uppercase tracking-wider text-graphite">{fmt(r.published_at)}</span>
                                <h3 className="font-display text-base font-semibold text-ink mt-2 mb-2 leading-snug">{r.title}</h3>
                                <p className="text-graphite text-sm line-clamp-2">{r.excerpt}</p>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="max-w-4xl mx-auto px-6 pb-24">
                <div className="relative bg-ink text-paper rounded-3xl p-10 md:p-14 text-center overflow-hidden">
                    <div className="aurora absolute left-1/2 top-0 -translate-x-1/2 w-[40vw] h-64 rounded-full blur-3xl"
                         style={{ background: 'radial-gradient(circle, rgba(91,95,239,0.3), transparent 65%)' }} />
                    <div className="relative">
                        <h2 className="font-display text-2xl md:text-3xl font-semibold max-w-sm mx-auto">
                            Need something built?
                        </h2>
                        <p className="text-white/55 mt-3">Tell us what you're working on — free quote within 24 hours.</p>
                        <Link to="/contact" className="inline-flex items-center gap-2 mt-7 bg-white text-ink px-7 py-3.5 rounded-full font-medium hover:bg-signal hover:text-white transition-colors">
                            Get in Touch <ArrowUpRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>

            <style>{`
                .post-body { color: #4B4F58; line-height: 1.8; font-size: 1.05rem; }
                .post-body h1 { font-size: 2rem; font-weight: 700; color: #0B0D14; margin: 2.5rem 0 1rem; line-height: 1.25; }
                .post-body h2 { font-size: 1.6rem; font-weight: 700; color: #0B0D14; margin: 2.5rem 0 1rem; line-height: 1.3; }
                .post-body h3 { font-size: 1.25rem; font-weight: 700; color: #0B0D14; margin: 2rem 0 .75rem; }
                .post-body p { margin: 1.25rem 0; }
                .post-body a { color: #5B5FEF; text-decoration: underline; text-underline-offset: 3px; }
                .post-body ul, .post-body ol { margin: 1.25rem 0; padding-left: 1.4rem; }
                .post-body ul { list-style: disc; }
                .post-body ol { list-style: decimal; }
                .post-body li { margin: .5rem 0; }
                .post-body blockquote { border-left: 3px solid #5B5FEF; padding: .25rem 0 .25rem 1.25rem; margin: 1.75rem 0; color: #0B0D14; font-style: italic; }
                .post-body hr { border: 0; border-top: 1px solid #E4E4E0; margin: 2.5rem 0; }
                .post-body .md-img { width: 100%; border-radius: 14px; margin: 2rem 0; }
                .post-body .inline-code { background: #EEF0FF; color: #5B5FEF; padding: .15rem .4rem; border-radius: 5px; font-family: 'JetBrains Mono', monospace; font-size: .88em; }
                .post-body .code-block { background: #0B0D14; color: #E4E4E0; padding: 1.25rem; border-radius: 14px; overflow-x: auto; margin: 1.75rem 0; font-family: 'JetBrains Mono', monospace; font-size: .85rem; line-height: 1.7; }
                .post-body .code-block code { background: none; padding: 0; color: inherit; }
                .post-body strong { color: #0B0D14; font-weight: 600; }
            `}</style>
        </div>
    );
}