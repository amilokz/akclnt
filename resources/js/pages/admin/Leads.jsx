import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Search, Mail, Phone, Calendar, UserPlus, X } from 'lucide-react';

const statusMeta = {
    new:               { label: 'New',        cls: 'bg-blue-50 text-blue-700 border-blue-200' },
    contacted:         { label: 'Contacted',  cls: 'bg-amber-50 text-amber-700 border-amber-200' },
    meeting_scheduled: { label: 'Meeting',    cls: 'bg-purple-50 text-purple-700 border-purple-200' },
    deal_done:         { label: 'Deal Done',  cls: 'bg-green-50 text-green-700 border-green-200' },
    converted:         { label: 'Converted',  cls: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    lost:              { label: 'Lost',       cls: 'bg-red-50 text-red-700 border-red-200' },
};
const statusOptions = Object.keys(statusMeta);

export default function Leads() {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState('');
    const [filter, setFilter] = useState('all');
    const [selected, setSelected] = useState(null);
    const [toast, setToast] = useState(null);

    const fetchLeads = () => {
        axios.get('/api/admin/leads')
            .then((res) => setLeads(res.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    };

    useEffect(fetchLeads, []);

    const showToast = (text, kind = 'ok') => {
        setToast({ text, kind });
        setTimeout(() => setToast(null), 5000);
    };

    const handleStatusChange = (id, status) => {
        axios.patch(`/api/admin/leads/${id}/status`, { status })
            .then(() => { fetchLeads(); showToast('Status updated'); })
            .catch(() => showToast('Could not update status', 'err'));
    };

    const handleConvert = (id) => {
        if (!confirm('Convert this lead into a client account?')) return;
        axios.post(`/api/admin/leads/${id}/convert`)
            .then((res) => {
                showToast(`Client created — ${res.data.client.email} · temp password: ${res.data.temp_password}`);
                fetchLeads();
            })
            .catch((err) => showToast(err.response?.data?.message || 'Something went wrong', 'err'));
    };

    const visible = leads.filter((l) => {
        const matchStatus = filter === 'all' || l.status === filter;
        const q = query.toLowerCase();
        const matchQuery = !q
            || l.name?.toLowerCase().includes(q)
            || l.email?.toLowerCase().includes(q)
            || l.phone?.toLowerCase().includes(q)
            || l.service?.name?.toLowerCase().includes(q);
        return matchStatus && matchQuery;
    });

    const fmtDate = (d) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

    return (
        <div>
            {/* header */}
            <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
                <div>
                    <h1 className="font-display text-2xl font-bold text-gray-900">Leads</h1>
                    <p className="text-gray-500 text-sm mt-1">{leads.length} total · {visible.length} shown</p>
                </div>
                <div className="relative">
                    <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search name, email, service..."
                        className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm w-full sm:w-72 outline-none focus:border-indigo-400 transition-colors"
                    />
                </div>
            </div>

            {/* filters */}
            <div className="flex flex-wrap gap-2 mb-6">
                {['all', ...statusOptions].map((s) => (
                    <button
                        key={s}
                        onClick={() => setFilter(s)}
                        className={`text-xs font-medium px-3.5 py-2 rounded-full border transition-colors ${
                            filter === s
                                ? 'bg-gray-900 text-white border-gray-900'
                                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                        }`}
                    >
                        {s === 'all' ? 'All' : statusMeta[s].label}
                        {s !== 'all' && (
                            <span className="ml-1.5 opacity-60">{leads.filter((l) => l.status === s).length}</span>
                        )}
                    </button>
                ))}
            </div>

            {/* table */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                {loading ? (
                    <div className="p-6 space-y-3">
                        {[...Array(5)].map((_, i) => <div key={i} className="h-14 bg-gray-100 rounded-lg animate-pulse" />)}
                    </div>
                ) : visible.length === 0 ? (
                    <div className="p-14 text-center">
                        <p className="text-gray-400 text-sm">No leads match your filters.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr className="text-left text-gray-500">
                                    <th className="px-6 py-3.5 font-medium">Lead</th>
                                    <th className="px-6 py-3.5 font-medium hidden md:table-cell">Service</th>
                                    <th className="px-6 py-3.5 font-medium hidden lg:table-cell">Received</th>
                                    <th className="px-6 py-3.5 font-medium">Status</th>
                                    <th className="px-6 py-3.5 font-medium text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {visible.map((lead) => (
                                    <tr key={lead.id} className="hover:bg-gray-50 transition-colors cursor-pointer"
                                        onClick={() => setSelected(lead)}>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                                                     style={{ background: 'linear-gradient(135deg, #5B5FEF, #00A896)' }}>
                                                    {lead.name?.charAt(0)?.toUpperCase()}
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="font-medium text-gray-900 truncate">{lead.name}</div>
                                                    <div className="text-xs text-gray-500 truncate">{lead.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 hidden md:table-cell">{lead.service?.name || '—'}</td>
                                        <td className="px-6 py-4 text-gray-500 text-xs hidden lg:table-cell">{fmtDate(lead.created_at)}</td>
                                        <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                                            <select
                                                value={lead.status}
                                                onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                                                className={`text-[0.7rem] font-medium px-2.5 py-1.5 rounded-full border outline-none cursor-pointer ${statusMeta[lead.status]?.cls}`}
                                            >
                                                {statusOptions.map((s) => (
                                                    <option key={s} value={s}>{statusMeta[s].label}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                                            {lead.status === 'deal_done' ? (
                                                <button onClick={() => handleConvert(lead.id)}
                                                        className="inline-flex items-center gap-1.5 text-xs font-medium text-white px-3 py-1.5 rounded-lg transition-opacity hover:opacity-90"
                                                        style={{ background: 'linear-gradient(135deg, #5B5FEF, #8B7BF7)' }}>
                                                    <UserPlus size={13} /> Convert
                                                </button>
                                            ) : (
                                                <span className="text-xs text-gray-300">—</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* detail drawer */}
            {selected && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    <div className="absolute inset-0 bg-black/40" onClick={() => setSelected(null)} />
                    <div className="relative w-full max-w-md bg-white h-full overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
                            <h2 className="font-display font-bold text-gray-900">Lead details</h2>
                            <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-700">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold shrink-0"
                                     style={{ background: 'linear-gradient(135deg, #5B5FEF, #00A896)' }}>
                                    {selected.name?.charAt(0)?.toUpperCase()}
                                </div>
                                <div className="min-w-0">
                                    <div className="font-display text-lg font-bold text-gray-900">{selected.name}</div>
                                    <span className={`inline-block mt-1 text-[0.65rem] font-medium px-2.5 py-1 rounded-full border ${statusMeta[selected.status]?.cls}`}>
                                        {statusMeta[selected.status]?.label}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <a href={`mailto:${selected.email}`} className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-indigo-300 transition-colors">
                                    <Mail size={16} className="text-indigo-500 shrink-0" />
                                    <span className="text-sm text-gray-700 truncate">{selected.email}</span>
                                </a>
                                <a href={`https://wa.me/${selected.phone?.replace(/\D/g, '').replace(/^0/, '92')}`} target="_blank" rel="noopener noreferrer"
                                   className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-emerald-300 transition-colors">
                                    <Phone size={16} className="text-emerald-500 shrink-0" />
                                    <span className="text-sm text-gray-700">{selected.phone}</span>
                                    <span className="ml-auto text-[0.6rem] font-mono uppercase text-emerald-600">WhatsApp</span>
                                </a>
                                <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-200">
                                    <Calendar size={16} className="text-gray-400 shrink-0" />
                                    <span className="text-sm text-gray-700">{fmtDate(selected.created_at)}</span>
                                </div>
                            </div>

                            <div>
                                <div className="font-mono text-[0.65rem] uppercase tracking-wider text-gray-400 mb-2">Service</div>
                                <p className="text-sm text-gray-800">{selected.service?.name || '—'}</p>
                            </div>

                            {selected.budget && (
                                <div>
                                    <div className="font-mono text-[0.65rem] uppercase tracking-wider text-gray-400 mb-2">Budget</div>
                                    <p className="text-sm text-gray-800">{selected.budget}</p>
                                </div>
                            )}

                            <div>
                                <div className="font-mono text-[0.65rem] uppercase tracking-wider text-gray-400 mb-2">Message</div>
                                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap bg-gray-50 rounded-xl p-4">
                                    {selected.message}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* toast */}
            {toast && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl text-sm text-white shadow-lg max-w-md"
                     style={{ background: toast.kind === 'err' ? '#DC2626' : '#111827' }}>
                    {toast.text}
                </div>
            )}
        </div>
    );
}