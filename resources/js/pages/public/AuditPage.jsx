import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../../components/ui/Seo.jsx';
import { Gauge, Search, Smartphone, Sparkles, Mail, Check, Loader2 } from 'lucide-react';

const WEBHOOK = '/api/website-audit';

const STEPS = [
  'Connecting to your website',
  'Running Google speed test on mobile',
  'Scanning SEO and on-page setup',
  'Checking WhatsApp, chat and analytics',
  'AI is writing your report',
  'Sending the report to your inbox',
];

const CHECKS = [
  { icon: Gauge, title: 'Speed', text: 'A real Google PageSpeed test on mobile: load time, layout shift and blocking scripts.' },
  { icon: Search, title: 'SEO basics', text: 'Page title, meta description, headings, image alt text and structured data.' },
  { icon: Smartphone, title: 'Mobile and trust', text: 'Mobile viewport, HTTPS, social share tags and accessibility score.' },
  { icon: Sparkles, title: 'Lead capture', text: 'WhatsApp button, chat assistant and analytics: what turns visitors into enquiries.' },
];

function ScoreRing({ value, label }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  const color = value >= 90 ? 'var(--color-teal)' : value >= 50 ? '#F5A524' : '#F04438';
  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="64" height="64" viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="32" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
        <circle cx="32" cy="32" r={r} fill="none" stroke={color} strokeWidth="5" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c * (1 - value / 100)} transform="rotate(-90 32 32)" />
        <text x="32" y="37" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor">{value}</text>
      </svg>
      <span className="text-xs text-mist/60">{label}</span>
    </div>
  );
}

export default function AuditPage() {
  const [form, setForm] = useState({ url: '', name: '', email: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | running | done
  const [error, setError] = useState('');
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (status !== 'running') return;
    if (step >= STEPS.length) { setStatus('done'); return; }
    const t = setTimeout(() => setStep((s) => s + 1), 1400);
    return () => clearTimeout(t);
  }, [status, step]);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    setError('');
    if (!form.url.includes('.')) return setError('Enter a website address, like yourbusiness.com');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return setError('Enter a valid email so we can send the report.');
    setStatus('sending');
    try {
      const res = await fetch(WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { setStatus("idle"); setError(data.message || "The audit could not start. Check the website address and try again."); return; }
      setStep(0);
      setStatus('running');
    } catch {
      setStatus('idle');
      setError('The audit could not start. Check the website address and try again.');
    }
  };

  const reset = () => { setForm({ url: '', name: '', email: '' }); setStatus('idle'); setStep(0); };

  const input = 'w-full rounded-xl bg-void border border-white/10 px-4 py-3.5 text-paper placeholder:text-mist/40 focus:outline-none focus:border-signal focus:ring-2 focus:ring-signal/40';

  return (
    <>
      <Seo path="/free-audit" title="Free AI Website Audit — AKCLNT"
        description="Get a free AI audit of your website's speed, SEO, mobile setup and lead capture. The full report reaches your inbox in about two minutes." />

      <main className="bg-void text-paper">
        {/* Hero + form */}
        <section className="relative overflow-hidden pt-32 pb-24 px-4">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
          <div aria-hidden="true" className="pointer-events-none absolute -top-40 right-0 h-[480px] w-[480px] rounded-full bg-signal/20 blur-[120px]" />

          <div className="relative max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
            <div>
              <h1 className="font-display text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight">
                Find out what your website is costing you.
              </h1>
              <p className="mt-6 max-w-xl text-lg text-mist/70 leading-relaxed">
                Slow pages, missing SEO basics and no way for visitors to reach you quietly lose customers every day.
                Enter your website and our AI audit shows you exactly where, in about two minutes.
              </p>
              <p className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-mist/60">
                <span className="inline-flex items-center gap-2"><Check size={16} className="text-teal" /> Free, no card needed</span>
                <span className="inline-flex items-center gap-2"><Check size={16} className="text-teal" /> Real Google speed data</span>
                <span className="inline-flex items-center gap-2"><Check size={16} className="text-teal" /> Report sent to your inbox</span>
              </p>
            </div>

            {/* Form / scan console */}
            <div className="rounded-3xl border border-white/10 bg-slate-panel p-6 md:p-8 shadow-2xl shadow-signal/10">
              {status === 'idle' || status === 'sending' ? (
                <div>
                  <h2 className="font-display text-2xl font-semibold">Run your free audit</h2>
                  <div className="mt-6 grid gap-4">
                    <label className="grid gap-2 text-sm text-mist/70">Website address
                      <input name="url" value={form.url} onChange={update} placeholder="yourbusiness.com" className={input} />
                    </label>
                    <label className="grid gap-2 text-sm text-mist/70">Your name
                      <input name="name" value={form.name} onChange={update} placeholder="Ali Khan" className={input} />
                    </label>
                    <label className="grid gap-2 text-sm text-mist/70">Email for the report
                      <input name="email" type="email" value={form.email} onChange={update} placeholder="you@company.com" className={input} />
                    </label>
                    {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
                    <button onClick={submit} disabled={status === 'sending'}
                      className="btn-primary mt-2 rounded-full px-7 py-4 font-semibold disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-signal focus:ring-offset-2 focus:ring-offset-slate-panel">
                      {status === 'sending' ? 'Starting audit...' : 'Audit my website'}
                    </button>
                    <p className="text-xs text-mist/40">We only use your email to send the report and follow up about it.</p>
                  </div>
                </div>
              ) : (
                <div aria-live="polite">
                  <p className="font-mono text-xs text-mist/50">auditing {form.url}</p>
                  <ul className="mt-5 grid gap-3 font-mono text-sm">
                    {STEPS.map((s, i) => {
                      const done = i < step || status === 'done';
                      const current = i === step && status === 'running';
                      return (
                        <li key={s} className={`flex items-center gap-3 transition-colors ${done ? 'text-paper' : current ? 'text-signal' : 'text-mist/30'}`}>
                          <span className="flex h-6 w-6 items-center justify-center">
                            {done ? <Check size={18} className="text-teal" />
                              : current ? <Loader2 size={18} className="animate-spin motion-reduce:animate-none" />
                              : <span className="h-1.5 w-1.5 rounded-full bg-current" />}
                          </span>
                          {s}
                        </li>
                      );
                    })}
                  </ul>
                  {status === 'done' && (
                    <div className="mt-8 rounded-2xl bg-teal/10 border border-teal/30 p-5">
                      <p className="flex items-center gap-2 font-semibold"><Mail size={18} className="text-teal" /> Your report is on its way</p>
                      <p className="mt-2 text-sm text-mist/70">It will reach <span className="text-paper">{form.email}</span> within about two minutes. Check your spam folder if you don't see it.</p>
                      <div className="mt-5 flex flex-wrap gap-3">
                        <button onClick={reset} className="btn-ghost rounded-full px-5 py-2.5 text-sm font-semibold">Audit another website</button>
                        <Link to="/contact" className="btn-primary rounded-full px-5 py-2.5 text-sm font-semibold">Talk to our team</Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Sample report + what we check */}
        <section className="px-4 pb-24">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
            <div className="rounded-3xl border border-white/10 bg-ink-soft p-6 md:p-8">
              <p className="text-sm text-mist/50">Example report</p>
              <p className="mt-1 font-display text-xl font-semibold">yourbusiness.com · Grade C</p>
              <div className="mt-6 grid grid-cols-4 gap-2 text-paper">
                <ScoreRing value={48} label="Performance" />
                <ScoreRing value={82} label="SEO" />
                <ScoreRing value={71} label="Accessibility" />
                <ScoreRing value={92} label="Best practices" />
              </div>
              <div className="mt-6 grid gap-3 text-sm">
                <div className="rounded-xl bg-void/60 p-4">
                  <p className="font-semibold">Page takes 5.8 s to show main content</p>
                  <p className="mt-1 text-mist/60">Most mobile visitors leave before it finishes loading.</p>
                </div>
                <div className="rounded-xl bg-void/60 p-4">
                  <p className="font-semibold">No WhatsApp button or chat</p>
                  <p className="mt-1 text-mist/60">Interested visitors have no quick way to ask a question.</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">What the audit checks</h2>
              <div className="mt-8 grid sm:grid-cols-2 gap-x-8 gap-y-8">
                {CHECKS.map(({ icon: Icon, title, text }) => (
                  <div key={title}>
                    <Icon size={22} className="text-signal" />
                    <h3 className="mt-3 font-semibold">{title}</h3>
                    <p className="mt-2 text-sm text-mist/60 leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="px-4 pb-28 border-t border-white/5 pt-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">How it works</h2>
            <ol className="mt-10 grid md:grid-cols-3 gap-10">
              {[
                ['Enter your website', 'Add your website address and the email where you want the report.'],
                ['We scan and analyse', 'Google measures your speed while our AI reviews SEO, mobile setup and lead capture.'],
                ['Get your action plan', 'A clear report with your biggest issues and quick wins lands in your inbox.'],
              ].map(([t, d], i) => (
                <li key={t}>
                  <span className="font-display text-5xl font-bold text-signal/40">{i + 1}</span>
                  <h3 className="mt-3 text-lg font-semibold">{t}</h3>
                  <p className="mt-2 text-sm text-mist/60 leading-relaxed">{d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>
    </>
  );
}
