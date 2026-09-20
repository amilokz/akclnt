import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Plus, Pencil, Trash2, X, Upload, Search, LayoutGrid } from 'lucide-react';

const empty = {
    title: '', category: 'Client', image: '', video: '', description: '',
    tags: '', link: '', is_active: true, sort_order: 0,
};

const CATEGORIES = ['Company', 'Client', 'Personal'];

export default function AdminPortfolio() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState(empty);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [query, setQuery] = useState('');
    const [toast, setToast] = useState(null);

    const load = () => {
        axios.get('/api/admin/portfolio')
            .then((res) => setItems(res.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    };
    useEffect(load, []);

    const notify = (text, kind = 'ok') => { setToast({ text, kind }); setTimeout(() => setToast(null), 4000); };

    const openNew = () => { setForm(empty); setEditing({}); };
    const openEdit = (p) => {
        setForm({
            ...p,
            tags: Array.isArray(p.tags) ? p.tags.join(', ') : '',
            description: p.description || '', image: p.image || '', video: p.video || '',
            category: p.category || 'Client', link: p.link || '',
        });
        setEditing(p);
    };

    const save = () => {
        setSaving(true);
        const payload = {
            ...form,
            sort_order: Number(form.sort_order) || 0,
            tags: form.tags ? form.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
            link: form.link || null,
        };
        const req = editing?.id
            ? axios.put(`/api/admin/portfolio/${editing.id}`, payload)
            : axios.post('/api/admin/portfolio', payload);

        req.then(() => { notify(editing?.id ? 'Project updated' : 'Project created'); setEditing(null); load(); })
           .catch((err) => notify(err.response?.data?.message || 'Could not save', 'err'))
           .finally(() => setSaving(false));
    };

    const remove = (p) => {
        if (!confirm(`Delete "${p.title}"?`)) return;
        axios.delete(`/api/admin/portfolio/${p.id}`)
            .then(() => { notify('Project deleted'); load(); })
            .catch(() => notify('Could not delete', 'err'));
    };

    const upload = (file) => {
        if (!file) return;
        setUploading(true);
        const fd = new FormData();
        fd.append('image', file);
        axios.post('/api/admin/portfolio/upload', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then((res) => setForm((f) => ({ ...f, image: res.data.url })))
            .catch(() => notify('Upload failed', 'err'))
            .finally(() => setUploading(false));
    };

    const visible = items.filter((p) => !query || p.title.toLowerCase().includes(query.toLowerCase()));

    return (
        <div>
            <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
                <div>
                    <h1 className="font-display text-2xl font-bold text-gray-900">Portfolio</h1>
                    <p className="text-gray-500 text-sm mt-1">
                        {items.length} total · {items.filter((p) => p.is_active).length} live
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..."
                               className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm w-48 outline-none focus:border-indigo-400" />
                    </div>
                    <button onClick={openNew}
                            className="inline-flex items-center gap-2 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-opacity hover:opacity-90"
                            style={{ background: 'linear-gradient(135deg, #5B5FEF, #8B7BF7)' }}>
                        <Plus size={16} /> New project
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                {loading ? (
                    <div className="p-6 space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-14 bg-gray-100 rounded-lg animate-pulse" />)}</div>
                ) : visible.length === 0 ? (
                    <div className="p-14 text-center">
                        <LayoutGrid size={32} className="mx-auto text-gray-300 mb-3" />
                        <p className="text-gray-400 text-sm mb-4">No projects yet.</p>
                        <button onClick={openNew} className="text-sm font-medium text-indigo-600 hover:text-indigo-800">Add your first project</button>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {visible.map((p) => (
                            <div key={p.id} className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                                <div className="w-14 h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                                    {p.image ? <img src={p.image} alt="" className="w-full h-full object-cover" />
                                             : <div className="w-full h-full" style={{ background: 'linear-gradient(135deg, #5B5FEF22, #00A89622)' }} />}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="font-medium text-gray-900 text-sm truncate">{p.title}</div>
                                    <div className="text-xs text-gray-500">{p.category || 'Uncategorised'}</div>
                                </div>
                                <span className={`shrink-0 text-[0.65rem] font-medium px-2.5 py-1 rounded-full border ${
                                    p.is_active ? 'bg-green-50 text-green-700 border-green-200'
                                                : 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                                    {p.is_active ? 'Live' : 'Hidden'}
                                </span>
                                <div className="flex items-center gap-1 shrink-0">
                                    <button onClick={() => openEdit(p)} className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"><Pencil size={16} /></button>
                                    <button onClick={() => remove(p)} className="p-2 text-gray-400 hover:text-red-600 transition-colors"><Trash2 size={16} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* editor */}
            {editing && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    <div className="absolute inset-0 bg-black/40" onClick={() => setEditing(null)} />
                    <div className="relative w-full max-w-xl bg-white h-full overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
                            <h2 className="font-display font-bold text-gray-900">{editing?.id ? 'Edit project' : 'New project'}</h2>
                            <div className="flex items-center gap-3">
                                <button onClick={save} disabled={saving || !form.title}
                                        className="text-white text-sm font-medium px-4 py-2 rounded-lg disabled:opacity-40"
                                        style={{ background: 'linear-gradient(135deg, #5B5FEF, #8B7BF7)' }}>
                                    {saving ? 'Saving...' : 'Save'}
                                </button>
                                <button onClick={() => setEditing(null)} className="text-gray-400 hover:text-gray-700"><X size={20} /></button>
                            </div>
                        </div>

                        <div className="p-6 space-y-5">
                            <Field label="Title *">
                                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                                       placeholder="SellHive — Amazon Management" className={inputCls} />
                            </Field>

                            <Field label="Category">
                                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputCls}>
                                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                                </select>
                            </Field>

                            <Field label="Image">
                                <div className="flex items-center gap-3">
                                    <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 cursor-pointer hover:border-indigo-400 transition-colors">
                                        <Upload size={15} /> {uploading ? 'Uploading...' : 'Upload'}
                                        <input type="file" accept="image/*" className="hidden" onChange={(e) => upload(e.target.files[0])} />
                                    </label>
                                    {form.image && (
                                        <div className="flex items-center gap-2">
                                            <img src={form.image} alt="" className="w-16 h-11 rounded-lg object-cover border border-gray-200" />
                                            <button onClick={() => setForm({ ...form, image: '' })} className="text-xs text-red-600 hover:underline">Remove</button>
                                        </div>
                                    )}
                                </div>
                            </Field>

                            <Field label="Video" hint="YouTube link OR local path like /videos/demo.mp4 — leave blank for none">
                                <input value={form.video} onChange={(e) => setForm({ ...form, video: e.target.value })}
                                       placeholder="https://youtu.be/xxxx  or  /videos/demo.mp4" className={inputCls} />
                            </Field>

                            <Field label="Description">
                                <textarea rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                                          placeholder="A marketing site for a founder-led Amazon management service..." className={inputCls} />
                            </Field>

                            <Field label="Tags" hint="Comma separated — e.g. React, Vite, Landing Page">
                                <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })}
                                       placeholder="React, Laravel, Tailwind" className={inputCls} />
                            </Field>

                            <Field label="Link" hint="Optional live project URL">
                                <input value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })}
                                       placeholder="https://example.com" className={inputCls} />
                            </Field>

                            <Field label="Sort order" hint="Lower numbers show first">
                                <input type="number" min="0" value={form.sort_order}
                                       onChange={(e) => setForm({ ...form, sort_order: e.target.value })} className={inputCls} />
                            </Field>

                            <Toggle label="Live on site" desc="Show this project on /portfolio"
                                    checked={form.is_active} onChange={(v) => setForm({ ...form, is_active: v })} />
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

function Toggle({ label, desc, checked, onChange }) {
    return (
        <label className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 cursor-pointer">
            <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="w-4 h-4 accent-indigo-600" />
            <div>
                <div className="text-sm font-medium text-gray-900">{label}</div>
                <div className="text-xs text-gray-500">{desc}</div>
            </div>
        </label>
    );
}