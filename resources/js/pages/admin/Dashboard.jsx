import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext.jsx';
import { Users, TrendingUp, CheckCircle2, Clock, ArrowUpRight } from 'lucide-react';

const statusMeta = {
    new:               { label: 'New',        cls: 'bg-blue-50 text-blue-700 border-blue-200' },
    contacted:         { label: 'Contacted',  cls: 'bg-amber-50 text-amber-700 border-amber-200' },
    meeting_scheduled: { label: 'Meeting',    cls: 'bg-purple-50 text-purple-700 border-purple-200' },
    deal_done:         { label: 'Deal Done',  cls: 'bg-green-50 text-green-700 border-green-200' },
    converted:         { label: 'Converted',  cls: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    lost:              { label: 'Lost',       cls: 'bg-red-50 text-red-700 border-red-200' },
};

export default function Dashboard() {
    const { user } = useAuth();
    const [leads, setLeads] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            axios.get('/api/admin/leads').catch(() => ({ data: [] })),
            axios.get('/api/admin/projects').catch(() => ({ data: [] })),
        ]).then(([l, p]) => {
            setLeads(Array.isArray(l.data) ? l.data : []);
            setProjects(Array.isArray(p.data) ? p.data : []);
        }).finally(() => setLoading(false));
    }, []);

    const count = (s) => leads.filter((l) => l.status === s).length;
    const thisMonth = leads.filter((l) => {
        const d = new Date(l.created_at);
        const n = new Date();
        return d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear();
    }).length;

    const cards = [
        { label: 'Total leads',    value: leads.length, Icon: Users,        accent: { from: '#5B5FEF', to: '#8B7BF7' } },
        { label: 'New this month', value: thisMonth,    Icon: TrendingUp,   accent: { from: '#00A896', to: '#5B5FEF' } },
        { label: 'Converted',      value: count('converted'), Icon: CheckCircle2, accent: { from: '#10B981', to: '#00A896' } },
        { label: 'Needs follow-up', value: count('new') + count('contacted'), Icon: Clock, accent: { from: '#8B7BF7', to: '#00A896' } },
    ];

    // status breakdown for the bar
    const total = leads.length || 1;
    const breakdown = Object.keys(statusMeta).map((k) => ({
        key: k, label: statusMeta[k].label, n: count(k), pct: (count(k) / total) * 100,
    })).filter((b) => b.n > 0);

    const barColors = {
        new: '#5B5FEF', contacted: '#F59E0B', meeting_scheduled: '#8B7BF7',
        deal_done: '#10B981', converted: '#00A896', lost: '#EF4444',
    };

    return (
        <div>
            {/* header */}
            <div className="mb-8">
                <h1 className="font-display text-2xl font-bold text-gray-900">
                    Welcome back, {user?.name?.split(' ')[0] || 'there'}.
                </h1>
                <p className="text-gray-500 text-sm mt-1">Here's what's happening with your leads and projects.</p>
            </div>

            {/* stat cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
                {cards.map(({ label, value, Icon, accent }) => (
                    <div key={label} className="bg-white rounded-2xl p-6 border border-gray-200"
                         style={{ boxShadow: `0 8px 30px -18px ${accent.from}55` }}>
                        <div className="flex items-start justify-between mb-5">
                            <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                                 style={{ background: `linear-gradient(135deg, ${accent.from}18, ${accent.to}18)`, border: `1.5px solid ${accent.from}30` }}>
                                <Icon size={19} style={{ color: accent.from }} />
                            </div>
                        </div>
                        <div className="font-display text-3xl font-bold text-gray-900 leading-none">
                            {loading ? '—' : value}
                        </div>
                        <div className="font-mono text-[0.65rem] uppercase tracking-wider text-gray-400 mt-2">{label}</div>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-[62fr_38fr] gap-6">
                {/* recent leads */}
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                        <h2 className="font-display font-bold text-gray-900">Recent leads</h2>
                        <Link to="/admin/leads" className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-800">
                            View all <ArrowUpRight size={13} />
                        </Link>
                    </div>
                    {loading ? (
                        <div className="p-6 space-y-3">
                            {[...Array(4)].map((_, i) => <div key={i} className="h-12 bg-gray-100 rounded-lg animate-pulse" />)}
                        </div>
                    ) : leads.length === 0 ? (
                        <div className="p-10 text-center text-gray-400 text-sm">No leads yet.</div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {leads.slice(0, 6).map((lead) => (
                                <div key={lead.id} className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                                         style={{ background: 'linear-gradient(135deg, #5B5FEF, #00A896)' }}>
                                        {lead.name?.charAt(0)?.toUpperCase()}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="font-medium text-gray-900 text-sm truncate">{lead.name}</div>
                                        <div className="text-xs text-gray-500 truncate">
                                            {lead.service?.name || 'General'} · {lead.email}
                                        </div>
                                    </div>
                                    <span className={`shrink-0 text-[0.65rem] font-medium px-2.5 py-1 rounded-full border ${statusMeta[lead.status]?.cls || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                                        {statusMeta[lead.status]?.label || lead.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* pipeline + projects */}
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl border border-gray-200 p-6">
                        <h2 className="font-display font-bold text-gray-900 mb-5">Pipeline</h2>
                        {breakdown.length === 0 ? (
                            <p className="text-sm text-gray-400">No data yet.</p>
                        ) : (
                            <>
                                <div className="flex h-2.5 rounded-full overflow-hidden mb-5">
                                    {breakdown.map((b) => (
                                        <div key={b.key} style={{ width: `${b.pct}%`, background: barColors[b.key] }} />
                                    ))}
                                </div>
                                <div className="space-y-2.5">
                                    {breakdown.map((b) => (
                                        <div key={b.key} className="flex items-center gap-2.5 text-sm">
                                            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: barColors[b.key] }} />
                                            <span className="text-gray-600 flex-1">{b.label}</span>
                                            <span className="font-medium text-gray-900">{b.n}</span>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="font-display font-bold text-gray-900">Projects</h2>
                            <Link to="/admin/projects" className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-800">
                                Manage <ArrowUpRight size={13} />
                            </Link>
                        </div>
                        <div className="font-display text-3xl font-bold text-gray-900">{loading ? '—' : projects.length}</div>
                        <p className="text-xs text-gray-500 mt-1.5">Active client projects</p>
                    </div>
                </div>
            </div>
        </div>
    );
}