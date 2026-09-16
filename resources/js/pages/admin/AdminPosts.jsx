import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Plus, Pencil, Trash2, X, Upload, Eye, Search } from 'lucide-react';

const empty = {
    title: '', slug: '', excerpt: '', body: '', cover_image: '',
    category: '', tags: '', is_published: false, meta_title: '', meta_description: '',
};

export default function AdminPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null);   // null = closed, {} = new
    const [form, setForm] = useState(empty);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [query, setQuery] = useState('');
    const [toast, setToast] = useState(null);

    const load = () => {
        axios.get('/api/admin/posts')
            .then((res) => setPosts(res.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    };
    useEffect(load, []);

    const notify = (text, kind = 'ok') => {
        setToast({ text, kind });
        setTimeout(() => setToast(null), 4000);
    };

    const openNew = () => { setForm(empty); setEditing({}); };
    const openEdit = (p) => {
        setForm({
            ...p,
            tags: Array.isArray(p.tags) ? p.tags.join(', ') : '',
            excerpt: p.excerpt || '', cover_image: p.cover_image || '',
            category: p.category || '', meta_title: p.meta_title || '', meta_description: p.meta_description || '',
        });
        setEditing(p);
    };

    const save = () => {
        setSaving(true);
        const payload = {
            ...form,
            tags: form.tags ? form.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
        };
        const req = editing?.id
            ? axios.put(`/api/admin/posts/${editing.id}`, payload)
            : axios.post('/api/admin/posts', payload);

        req.then(() => { notify(editing?.id ? 'Post updated' : 'Post created'); setEditing(null); load(); })
           .catch((err) => notify(err.response?.data?.message || 'Could not save', 'err'))
           .finally(() => setSaving(false));
    };

    const remove = (p) => {
        if (!confirm(`Delete "${p.title}"? This cannot be undone.`)) return;
        axios.delete(`/api/admin/posts/${p.id}`)
            .then(() => { notify('Post deleted'); load(); })
            .catch(() => notify('Could not delete', 'err'));
    };

    const uploadCover = (file) => {
        if (!file) return;
        setUploading(true);
        const fd = new FormData();
        fd.append('image', file);
        axios.post('/api/admin/posts/upload', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then((res) => setForm((f) => ({ ...f, cover_image: res.data.url })))
            .catch(() => notify('Upload failed', 'err'))
            .finally(() => setUploading(false));
    };

    const visible = posts.filter((p) => !query || p.title.toLowerCase().includes(query.toLowerCase()));
    const fmt = (d) => d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';

    return (
        <div>
            <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
                <div>
                    <h1 className="font-display text-2xl font-bold text-gray-900">Blog</h1>
                    <p className="text-gray-500 text-sm mt-1">
                        {posts.length} posts · {posts.filter((p) => p.is_published).length} published
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search posts..."
                               className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm w-56 outline-none focus:border-indigo-400" />
                    </div>
                    <button onClick={openNew}
                            className="inline-flex items-center gap-2 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-opacity hover:opacity-90"
                            style={{ background: 'linear-gradient(135deg, #5B5FEF, #8B7BF7)' }}>
                        <Plus size={16} /> New post
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                {loading ? (
                    <div className="p-6 space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="h-14 bg-gray-100 rounded-lg animate-pulse" />)}</div>
                ) : visible.length === 0 ? (
                    <div className="p-14 text-center">
                        <p className="text-gray-400 text-sm mb-4">No posts yet.</p>
                        <button onClick={openNew} className="text-sm font-medium text-indigo-600 hover:text-indigo-800">Write your first post</button>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {visible.map((p) => (
                            <div key={p.id} className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                                <div className="w-14 h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                                    {p.cover_image
                                        ? <img src={p.cover_image} alt="" className="w-full h-full object-cover" />
                                        : <div className="w-full h-full" style={{ background: 'linear-gradient(135deg, #5B5FEF22, #00A89622)' }} />}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="font-medium text-gray-900 text-sm truncate">{p.title}</div>
                                    <div className="text-xs text-gray-500">
                                        {p.category || 'Uncategorised'} · {fmt(p.published_at)} · {p.views} views
                                    </div>
                                </div>
                                <span className={`shrink-0 text-[0.65rem] font-medium px-2.5 py-1 rounded-full border ${
                                    p.is_published ? 'bg-green-50 text-green-700 border-green-200'
                                                   : 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                                    {p.is_published ? 'Published' : 'Draft'}
                                </span>
                                <div className="flex items-center gap-1 shrink-0">
                                    {p.is_published && (
                                        <a href={`/blog/${p.slug}`} target="_blank" rel="noopener noreferrer"
                                           className="p-2 text-gray-400 hover:text-gray-700 transition-colors" title="View">
                                            <Eye size={16} />
                                        </a>
                                    )}
                                    <button onClick={() => openEdit(p)} className="p-2 text-gray-400 hover:text-indigo-600 transition-colors" title="Edit">
                                        <Pencil size={16} />
                                    </button>
                                    <button onClick={() => remove(p)} className="p-2 text-gray-400 hover:text-red-600 transition-colors" title="Delete">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* editor drawer */}
            {editing && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    <div className="absolute inset-0 bg-black/40" onClick={() => setEditing(null)} />
                    <div className="relative w-full max-w-2xl bg-white h-full overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
                            <h2 className="font-display font-bold text-gray-900">{editing?.id ? 'Edit post' : 'New post'}</h2>
                            <div className="flex items-center gap-3">
                                <button onClick={save} disabled={saving || !form.title || !form.body}
                                        className="text-white text-sm font-medium px-4 py-2 rounded-lg disabled:opacity-40 transition-opacity"
                                        style={{ background: 'linear-gradient(135deg, #5B5FEF, #8B7BF7)' }}>
                                    {saving ? 'Saving...' : 'Save'}
                                </button>
                                <button onClick={() => setEditing(null)} className="text-gray-400 hover:text-gray-700"><X size={20} /></button>
                            </div>
                        </div>

                        <div className="p-6 space-y-5">
                            <Field label="Title *">
                                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                                       placeholder="How we cut page load time by 60%" className={inputCls} />
                            </Field>

                            <Field label="Slug" hint="Leave blank to auto-generate from the title">
                                <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })}
                                       placeholder="how-we-cut-page-load-time" className={inputCls} />
                            </Field>

                            <Field label="Excerpt" hint="Shown on the blog listing and in search results">
                                <textarea rows={2} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                                          placeholder="A short summary of the article..." className={inputCls} />
                            </Field>

                            <Field label="Cover image">
                                <div className="flex items-center gap-3">
                                    <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 cursor-pointer hover:border-indigo-400 transition-colors">
                                        <Upload size={15} /> {uploading ? 'Uploading...' : 'Upload'}
                                        <input type="file" accept="image/*" className="hidden"
                                               onChange={(e) => uploadCover(e.target.files[0])} />
                                    </label>
                                    {form.cover_image && (
                                        <div className="flex items-center gap-2">
                                            <img src={form.cover_image} alt="" className="w-16 h-11 rounded-lg object-cover border border-gray-200" />
                                            <button onClick={() => setForm({ ...form, cover_image: '' })}
                                                    className="text-xs text-red-600 hover:underline">Remove</button>
                                        </div>
                                    )}
                                </div>
                            </Field>

                            <div className="grid grid-cols-2 gap-4">
                                <Field label="Category">
                                    <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                                           placeholder="Development" className={inputCls} />
                                </Field>
                                <Field label="Tags" hint="Comma separated">
                                    <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })}
                                           placeholder="laravel, react, performance" className={inputCls} />
                                </Field>
                            </div>

                            <Field label="Body (Markdown) *" hint="## Heading · **bold** · `code` · ```block``` · - list · [link](url) · ![img](url)">
                                <textarea rows={18} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })}
                                          placeholder="## Introduction&#10;&#10;Write your article here..."
                                          className={`${inputCls} font-mono text-[0.82rem] leading-relaxed`} />
                            </Field>

                            <details className="rounded-xl border border-gray-200 p-4">
                                <summary className="text-sm font-medium text-gray-700 cursor-pointer">SEO settings</summary>
                                <div className="space-y-4 mt-4">
                                    <Field label="Meta title" hint="Leave blank to use the post title">
                                        <input value={form.meta_title} onChange={(e) => setForm({ ...form, meta_title: e.target.value })} className={inputCls} />
                                    </Field>
                                    <Field label="Meta description">
                                        <textarea rows={2} value={form.meta_description} onChange={(e) => setForm({ ...form, meta_description: e.target.value })} className={inputCls} />
                                    </Field>
                                </div>
                            </details>

                            <label className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 cursor-pointer">
                                <input type="checkbox" checked={form.is_published}
                                       onChange={(e) => setForm({ ...form, is_published: e.target.checked })}
                                       className="w-4 h-4 accent-indigo-600" />
                                <div>
                                    <div className="text-sm font-medium text-gray-900">Publish</div>
                                    <div className="text-xs text-gray-500">Make this post visible on the site</div>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            )}

            {toast && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl text-sm text-white shadow-lg"
                     style={{ background: toast.kind === 'err' ? '#DC2626' : '#111827' }}>
                    {toast.text}
                </div>
            )}
        </div>
    );
}

const inputCls = 'w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-indigo-400 transition-colors';

function Field({ label, hint, children }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
            {children}
            {hint && <p className="text-xs text-gray-400 mt-1.5">{hint}</p>}
        </div>
    );
}