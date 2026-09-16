import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Eye, Users, TrendingUp, Globe } from 'lucide-react';

export default function Analytics() {
    const [data, setData] = useState(null);
    const [days, setDays] = useState(30);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios.get(`/api/admin/analytics?days=${days}`)
            .then((res) => setData(res.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [days]);

        const max = data?.series?.length ? Math.max(...data.series.map((d) => d.views), 1) : 1;

    const cards = data ? [
        { label: 'Views today',     value: data.today_views,    Icon: Eye,        accent: '#5B5FEF' },
        { label: 'Visitors today',  value: data.today_visitors, Icon: Users,      accent: '#00A896' },
        { label: `Views (${days}d)`,    value: data.total_views,    Icon: TrendingUp, accent: '#8B7BF7' },
        { label: `Visitors (${days}d)`, value: data.total_visitors, Icon: Globe,      accent: '#10B981' },
    ] : [];

    const fmtDate = (d) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    const hostOf = (url) => { try { return new URL(url).hostname.replace('www.', ''); } catch { return url; } };

    return (
        <div>
            <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
                <div>
                    <h1 className="font-display text-2xl font-bold text-gray-900">Analytics</h1>
                    <p className="text-gray-500 text-sm mt-1">Traffic on akclnt.com</p>
                </div>
                <div className="flex gap-2">
                    {[7, 30, 90].map((d) => (
                        <button key={d} onClick={() => setDays(d)}
                                className={`text-xs font-medium px-3.5 py-2 rounded-full border transition-colors ${
                                    days === d ? 'bg-gray-900 text-white border-gray-900'
                                               : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'}`}>
                            {d} days
                        </button>
                    ))}
                </div>
            </div>

            {/* stat cards */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
                {(loading ? [...Array(4)] : cards).map((c, i) => (
                    <div key={i} className="bg-white rounded-2xl p-6 border border-gray-200">
                        {c ? (
                            <>
                                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                                     style={{ background: `${c.accent}18`, border: `1.5px solid ${c.accent}30` }}>
                                    <c.Icon size={19} style={{ color: c.accent }} />
                                </div>
                                <div className="font-display text-3xl font-bold text-gray-900 leading-none">{c.value}</div>
                                <div className="font-mono text-[0.65rem] uppercase tracking-wider text-gray-400 mt-2">{c.label}</div>
                            </>
                        ) : <div className="h-24 bg-gray-100 rounded animate-pulse" />}
                    </div>
                ))}
            </div>

            {/* chart */}
                        <div className="bg-white rounded-2xl border border-gray-200 p-6 pl-12 mb-6">
                <h2 className="font-display font-bold text-gray-900 mb-6">Views over time</h2>
                {loading ? (
                    <div className="h-48 bg-gray-100 rounded animate-pulse" />
                                ) : !data?.series?.length || data.series.every((d) => d.views === 0) ? (
                    <div className="h-48 flex items-center justify-center text-gray-400 text-sm">
                        No visits recorded yet.
                    </div>
                ) : (
                                      <div className="relative h-48">
                        {/* gridlines */}
                        {[0, 25, 50, 75, 100].map((p) => (
                            <div key={p} className="absolute inset-x-0 border-t border-gray-100"
                                 style={{ bottom: `${p}%` }} />
                        ))}
                        {/* y-axis labels */}
                        <div className="absolute -left-1 inset-y-0 flex flex-col justify-between font-mono text-[0.58rem] text-gray-300 -translate-x-full pr-2">
                            <span>{max}</span>
                            <span>{Math.round(max / 2)}</span>
                            <span>0</span>
                        </div>

                        <div className="relative flex items-end gap-1 h-full">
                            {data.series.map((d) => (
                                <div key={d.date} className="flex-1 flex flex-col items-center justify-end group relative h-full">
                                    <div className="absolute -top-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                                        <div className="bg-gray-900 text-white text-[0.65rem] px-2.5 py-1.5 rounded-lg whitespace-nowrap shadow-lg">
                                            {fmtDate(d.date)} · {d.views} views · {d.visitors} visitors
                                        </div>
                                    </div>
                                    {/* track — so empty days still read as bars */}
                                    <div className="absolute inset-x-0 bottom-0 h-full rounded-t opacity-0 group-hover:opacity-100 transition-opacity"
                                         style={{ background: 'rgba(91,95,239,0.06)' }} />
                                    <div className="relative w-full rounded-t transition-all"
                                         style={{
                                             height: d.views > 0 ? `${(d.views / max) * 100}%` : '2px',
                                             minHeight: '2px',
                                             background: d.views > 0
                                                 ? 'linear-gradient(180deg, #5B5FEF, #8B7BF7)'
                                                 : '#E8EAF0',
                                         }} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                                {!loading && data?.series?.length > 0 && (
                    <div className="flex justify-between mt-3 font-mono text-[0.6rem] text-gray-400">
                        <span>{fmtDate(data.series[0].date)}</span>
                        <span>{fmtDate(data.series[data.series.length - 1].date)}</span>
                    </div>
                )}
            </div>

            {/* breakdowns */}
            <div className="grid md:grid-cols-2 gap-6">
                <Panel title="Top pages" loading={loading}
                       rows={data?.top_pages.map((p) => ({ label: p.path, value: p.views }))} />
                <Panel title="Where they came from" loading={loading}
                       rows={data?.referrers.map((r) => ({ label: hostOf(r.referrer), value: r.views }))}
                       empty="No referrers yet — visitors came directly." />
                <Panel title="Devices" loading={loading}
                       rows={data?.devices.map((d) => ({ label: d.device || 'unknown', value: d.views }))} />
                <Panel title="Countries" loading={loading}
                       rows={data?.countries.map((c) => ({ label: c.country, value: c.views }))}
                       empty="Country data comes from Cloudflare." />
            </div>
        </div>
    );
}

function Panel({ title, rows, loading, empty = 'No data yet.' }) {
    const total = rows?.reduce((s, r) => s + r.value, 0) || 1;
    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="font-display font-bold text-gray-900 mb-5">{title}</h2>
            {loading ? (
                <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="h-6 bg-gray-100 rounded animate-pulse" />)}</div>
            ) : !rows?.length ? (
                <p className="text-sm text-gray-400">{empty}</p>
            ) : (
                <div className="space-y-3">
                    {rows.map((r, i) => (
                        <div key={i}>
                            <div className="flex items-center justify-between text-sm mb-1">
                                <span className="text-gray-700 truncate mr-3">{r.label}</span>
                                <span className="font-medium text-gray-900 shrink-0">{r.value}</span>
                            </div>
                            <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                                <div className="h-full rounded-full"
                                     style={{ width: `${(r.value / total) * 100}%`, background: 'linear-gradient(90deg, #5B5FEF, #00A896)' }} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}