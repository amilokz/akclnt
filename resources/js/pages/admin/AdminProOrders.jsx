import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Copy, Check, X, ExternalLink } from 'lucide-react';

const statusMeta = {
    pending:  { label: 'Pending',  cls: 'bg-amber-50 text-amber-700 border-amber-200' },
    approved: { label: 'Approved', cls: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    rejected: { label: 'Rejected', cls: 'bg-red-50 text-red-700 border-red-200' },
};
const packageLabel = { website: 'Website', app: 'App', combo: 'Website + App' };
const toHref = (u) => (/^https?:\/\//i.test(u) ? u : `https://${u}`);
const fmtDate = (d) => new Date(d).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });

export default function AdminProOrders() {
    const [orders, setOrders] = useState([]);
    const [meta, setMeta] = useState({ current_page: 1, last_page: 1, total: 0 });
    const [filter, setFilter] = useState('pending');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [busy, setBusy] = useState(null);
    const [copied, setCopied] = useState(null);
    const [error, setError] = useState('');

    const load = () => {
        setLoading(true);
        setError('');
        const params = { page };
        if (filter !== 'all') params.status = filter;
        axios.get('/api/admin/pro-orders', { params })
            .then(({ data }) => {
                setOrders(data.data);
                setMeta({ current_page: data.current_page, last_page: data.last_page, total: data.total });
            })
            .catch(() => setError('Could not load orders. Refresh the page or log in again.'))
            .finally(() => setLoading(false));
    };

    useEffect(() => { load(); }, [filter, page]);

    const changeFilter = (f) => { setFilter(f); setPage(1); };

    const copyTid = (order) => {
        navigator.clipboard?.writeText(order.tid);
        setCopied(order.id);
        setTimeout(() => setCopied(null), 1500);
    };

    const setStatus = async (order, status) => {
        let admin_note;
        if (status === 'approved' && !window.confirm(
            `Approve order #${order.id}?\n\nFirst confirm in JazzCash:\nTID: ${order.tid}\nAmount: Rs ${order.amount}`
        )) return;
        if (status === 'rejected') {
            admin_note = window.prompt('Reason for rejecting (for your records):', 'Payment not found');
            if (admin_note === null) return;
        }
        setBusy(order.id);
        try {
            const { data } = await axios.patch(`/api/admin/pro-orders/${order.id}/status`, { status, admin_note });
            setOrders((list) => (filter === 'all' || filter === status)
                ? list.map((o) => (o.id === order.id ? data.order : o))
                : list.filter((o) => o.id !== order.id));
        } catch {
            setError(`Could not update order #${order.id}. Try again.`);
        } finally {
            setBusy(null);
        }
    };

    return (
        <div>
            {/* header */}
            <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
                <div>
                    <h1 className="font-display text-2xl font-bold text-gray-900">Pro Orders</h1>
                    <p className="text-gray-500 text-sm mt-1">{meta.total} {filter === 'all' ? 'total' : filter}</p>
                </div>
            </div>

            {/* filters */}
            <div className="flex flex-wrap gap-2 mb-6">
                {['pending', 'approved', 'rejected', 'all'].map((s) => (
                    <button
                        key={s}
                        onClick={() => changeFilter(s)}
                        className={`text-xs font-medium px-3.5 py-2 rounded-full border transition-colors ${
                            filter === s
                                ? 'bg-gray-900 text-white border-gray-900'
                                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                        }`}
                    >
                        {s === 'all' ? 'All' : statusMeta[s].label}
                    </button>
                ))}
            </div>

            {error && <p role="alert" className="mb-4 text-sm text-red-600">{error}</p>}

            {/* table */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                {loading ? (
                    <div className="p-6 space-y-3">
                        {[...Array(4)].map((_, i) => <div key={i} className="h-14 bg-gray-100 rounded-lg animate-pulse" />)}
                    </div>
                ) : orders.length === 0 ? (
                    <div className="p-14 text-center">
                        <p className="text-gray-400 text-sm">
                            {filter === 'pending' ? 'No orders waiting for payment check.' : 'No orders here yet.'}
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr className="text-left text-gray-500">
                                    <th className="px-6 py-3.5 font-medium">Customer</th>
                                    <th className="px-6 py-3.5 font-medium">Package</th>
                                    <th className="px-6 py-3.5 font-medium hidden md:table-cell">Audit target</th>
                                    <th className="px-6 py-3.5 font-medium">TID</th>
                                    <th className="px-6 py-3.5 font-medium hidden lg:table-cell">Received</th>
                                    <th className="px-6 py-3.5 font-medium">Status</th>
                                    <th className="px-6 py-3.5 font-medium text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {orders.map((o) => (
                                    <tr key={o.id} className="hover:bg-gray-50 transition-colors align-top">
                                        <td className="px-6 py-4">
                                            <p className="font-medium text-gray-900">{o.name}</p>
                                            <p className="text-gray-500">{o.email}</p>
                                            {o.phone && <p className="text-gray-400 text-xs mt-0.5">{o.phone}</p>}
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-gray-900">{packageLabel[o.package] || o.package}</p>
                                            <p className="text-gray-500">Rs {Number(o.amount).toLocaleString()}</p>
                                        </td>
                                        <td className="px-6 py-4 hidden md:table-cell">
                                            {o.website_url && (
                                                <a href={toHref(o.website_url)} target="_blank" rel="noreferrer"
                                                    className="flex items-center gap-1 text-indigo-600 hover:underline">
                                                    {o.website_url} <ExternalLink size={12} />
                                                </a>
                                            )}
                                            {o.app_url && (
                                                <a href={o.app_url} target="_blank" rel="noreferrer"
                                                    className="flex items-center gap-1 text-indigo-600 hover:underline mt-1">
                                                    {o.app_url.includes('apple') ? 'App Store link' : 'Google Play link'} <ExternalLink size={12} />
                                                </a>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button onClick={() => copyTid(o)} title="Copy TID"
                                                className="inline-flex items-center gap-1.5 font-mono text-gray-900 hover:text-indigo-600">
                                                {o.tid}
                                                {copied === o.id ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} className="text-gray-400" />}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 hidden lg:table-cell whitespace-nowrap">{fmtDate(o.created_at)}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full border ${statusMeta[o.status]?.cls}`}>
                                                {statusMeta[o.status]?.label || o.status}
                                            </span>
                                            {o.admin_note && <p className="text-xs text-gray-400 mt-1 max-w-[160px]">{o.admin_note}</p>}
                                        </td>
                                        <td className="px-6 py-4 text-right whitespace-nowrap">
                                            {o.status === 'pending' ? (
                                                <div className="inline-flex gap-2">
                                                    <button disabled={busy === o.id} onClick={() => setStatus(o, 'approved')}
                                                        className="inline-flex items-center gap-1 text-xs font-medium px-3 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50">
                                                        <Check size={14} /> Approve
                                                    </button>
                                                    <button disabled={busy === o.id} onClick={() => setStatus(o, 'rejected')}
                                                        className="inline-flex items-center gap-1 text-xs font-medium px-3 py-2 rounded-lg border border-gray-200 text-gray-600 hover:border-red-300 hover:text-red-600 disabled:opacity-50">
                                                        <X size={14} /> Reject
                                                    </button>
                                                </div>
                                            ) : (
                                                <button disabled={busy === o.id} onClick={() => setStatus(o, 'pending')}
                                                    className="text-xs text-gray-400 hover:text-gray-700 disabled:opacity-50">
                                                    Move to pending
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* pagination */}
            {meta.last_page > 1 && (
                <div className="flex items-center justify-end gap-3 mt-4 text-sm">
                    <button disabled={page <= 1} onClick={() => setPage(page - 1)}
                        className="px-3 py-1.5 rounded-lg border border-gray-200 disabled:opacity-40">Previous</button>
                    <span className="text-gray-500">Page {meta.current_page} of {meta.last_page}</span>
                    <button disabled={page >= meta.last_page} onClick={() => setPage(page + 1)}
                        className="px-3 py-1.5 rounded-lg border border-gray-200 disabled:opacity-40">Next</button>
                </div>
            )}
        </div>
    );
}
