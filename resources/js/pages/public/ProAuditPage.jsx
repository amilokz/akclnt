import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../../components/ui/Seo.jsx';
import { Check, Copy, Globe, Smartphone, Layers, Minus, FileText } from 'lucide-react';

const ICONS = { website: Globe, app: Smartphone, combo: Layers };
const DETAILS = {
  website: ['Mobile and desktop speed tests', 'Up to 5 key pages audited', 'Step-by-step fix plan by priority', 'Branded PDF report'],
  app: ['Google Play or App Store listing review', 'AI analysis of user reviews: top complaints and praise', 'App Store Optimization (ASO) check', 'Branded PDF report'],
  combo: ['Everything in Website Pro', 'Everything in App Pro', 'One combined action plan', 'Branded PDF report'],
};
const COMPARE = [
  ['Mobile speed test', true, true],
  ['Desktop speed test', false, true],
  ['Pages audited', '1', 'Up to 5'],
  ['AI summary and quick wins', true, true],
  ['Step-by-step fix plan', false, true],
  ['App store and review analysis', false, 'App and Combo'],
  ['Downloadable PDF report', false, true],
];
const FAQ = [
  ['How long does it take?', 'We verify your payment and email the PDF report within 24 hours, usually much sooner.'],
  ['What if I sent the wrong amount?', 'Submit the form anyway with your transaction ID. We will contact you on email or WhatsApp to sort it out.'],
  ['Can I get help fixing the issues?', 'Yes. Every report ends with a clear action plan, and our team can fix everything for you if you want.'],
];

const Cell = ({ v }) => v === true ? <Check size={18} className="text-teal mx-auto" />
  : v === false ? <Minus size={18} className="text-mist/30 mx-auto" />
  : <span className="text-sm">{v}</span>;

export default function ProAuditPage() {
  const [pkgs, setPkgs] = useState(null);
  const [payment, setPayment] = useState(null);
  const [selected, setSelected] = useState('combo');
  const [form, setForm] = useState({ name: '', email: '', phone: '', website_url: '', app_url: '', tid: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | done
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [orderId, setOrderId] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch('/api/pro-audit/packages')
      .then((r) => r.json())
      .then((d) => { setPkgs(d.packages); setPayment(d.payment); })
      .catch(() => setMessage('Prices could not load. Refresh the page.'));
  }, []);

  const needsWebsite = selected === 'website' || selected === 'combo';
  const needsApp = selected === 'app' || selected === 'combo';
  const price = pkgs?.[selected]?.price;
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const err = (k) => errors[k]?.[0];

  const choose = (key) => {
    setSelected(key);
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' });
  };

  const copyNumber = () => {
    navigator.clipboard?.writeText(payment?.account_number || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const submit = async () => {
    setErrors({}); setMessage(''); setStatus('sending');
    const payload = { package: selected, name: form.name, email: form.email, phone: form.phone, tid: form.tid.trim() };
    if (needsWebsite) payload.website_url = form.website_url;
    if (needsApp) payload.app_url = form.app_url;
    try {
      const res = await fetch('/api/pro-audit/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErrors(data.errors || {});
        setMessage(data.message || 'The order could not be sent. Try again in a minute.');
        setStatus('idle');
        return;
      }
      setOrderId(data.order_id);
      setStatus('done');
    } catch {
      setMessage('The order could not be sent. Check your connection and try again.');
      setStatus('idle');
    }
  };

  const input = 'w-full rounded-xl bg-void border border-white/10 px-4 py-3.5 text-paper placeholder:text-mist/40 focus:outline-none focus:border-signal focus:ring-2 focus:ring-signal/40';
  const Field = ({ label, name, hint, ...rest }) => (
    <label className="grid gap-2 text-sm text-mist/70">{label}
      <input name={name} value={form[name]} onChange={update} className={input} {...rest} />
      {hint && !err(name) && <span className="text-xs text-mist/40">{hint}</span>}
      {err(name) && <span className="text-xs text-red-400">{err(name)}</span>}
    </label>
  );

  return (
    <>
      <Seo path="/pro-audit" title="Pro Website and App Audit — AKCLNT"
        description="A detailed PDF audit of your website and mobile app: desktop and mobile speed, five key pages, app store reviews and a step-by-step fix plan." />

      <main className="bg-void text-paper">
        {/* Hero + pricing */}
        <section className="relative overflow-hidden pt-32 pb-20 px-4">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
          <div aria-hidden="true" className="pointer-events-none absolute -top-40 left-1/3 h-[480px] w-[480px] rounded-full bg-violet/20 blur-[120px]" />

          <div className="relative max-w-6xl mx-auto">
            <h1 className="font-display text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight max-w-3xl">
              The full picture of your website and app, in one report.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-mist/70 leading-relaxed">
              The free audit shows you the headlines. The Pro Audit goes page by page, checks desktop and mobile,
              reads what your app users are saying, and gives you a fix plan your team can follow.
            </p>

            <div className="mt-14 grid md:grid-cols-3 gap-5">
              {['website', 'app', 'combo'].map((key) => {
                const Icon = ICONS[key];
                const active = selected === key;
                return (
                  <div key={key}
                    className={`relative rounded-3xl border p-7 flex flex-col transition-colors ${
                      active ? 'border-signal bg-slate-panel shadow-2xl shadow-signal/20' : 'border-white/10 bg-ink-soft'
                    }`}>
                    {key === 'combo' && (
                      <span className="absolute -top-3 left-7 rounded-full bg-teal px-3 py-1 text-xs font-semibold text-void">Best value</span>
                    )}
                    <Icon size={24} className="text-signal" />
                    <h2 className="mt-4 font-display text-xl font-semibold">{pkgs?.[key]?.label || '...'}</h2>
                    <p className="mt-3 font-display text-4xl font-bold">
                      {pkgs ? `Rs ${pkgs[key].price.toLocaleString()}` : '...'}
                    </p>
                    <ul className="mt-6 grid gap-3 text-sm text-mist/70 flex-1">
                      {DETAILS[key].map((d) => (
                        <li key={d} className="flex gap-2"><Check size={16} className="text-teal shrink-0 mt-0.5" />{d}</li>
                      ))}
                    </ul>
                    <button onClick={() => choose(key)} aria-pressed={active}
                      className={`mt-8 rounded-full px-6 py-3.5 font-semibold ${active ? 'btn-primary' : 'btn-ghost'}`}>
                      {active ? 'Selected' : 'Choose this'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Order */}
        <section id="order" className="px-4 pb-24 scroll-mt-28">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_1.1fr] gap-10 items-start">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">Place your order</h2>
              <ol className="mt-8 grid gap-8">
                <li className="flex gap-4">
                  <span className="font-display text-3xl font-bold text-signal/50">1</span>
                  <div>
                    <h3 className="font-semibold">Send the payment</h3>
                    <p className="mt-1 text-sm text-mist/60">
                      Send <span className="text-paper font-semibold">{price ? `Rs ${price.toLocaleString()}` : '...'}</span> for {pkgs?.[selected]?.label || 'your package'} via {payment?.method || 'JazzCash'}.
                    </p>
                    <div className="mt-4 rounded-2xl border border-white/10 bg-slate-panel p-5">
                      <p className="text-xs text-mist/50">Account title</p>
                      <p className="font-semibold">{payment?.account_title || '...'}</p>
                      <p className="mt-3 text-xs text-mist/50">{payment?.method || 'JazzCash'} number</p>
                      <button onClick={copyNumber} className="mt-0.5 inline-flex items-center gap-2 font-mono text-lg hover:text-signal">
                        {payment?.account_number || '...'}
                        {copied ? <Check size={16} className="text-teal" /> : <Copy size={16} className="text-mist/50" />}
                      </button>
                    </div>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="font-display text-3xl font-bold text-signal/50">2</span>
                  <div>
                    <h3 className="font-semibold">Copy the transaction ID</h3>
                    <p className="mt-1 text-sm text-mist/60">After paying, JazzCash shows a TID (transaction ID) on the receipt and in the SMS. You will need it in the form.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="font-display text-3xl font-bold text-signal/50">3</span>
                  <div>
                    <h3 className="font-semibold">Submit the form</h3>
                    <p className="mt-1 text-sm text-mist/60">We verify the payment and email your PDF report within 24 hours.</p>
                  </div>
                </li>
              </ol>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-panel p-6 md:p-8">
              {status === 'done' ? (
                <div aria-live="polite">
                  <FileText size={28} className="text-teal" />
                  <h3 className="mt-4 font-display text-2xl font-semibold">Order #{orderId} received</h3>
                  <p className="mt-3 text-mist/70 leading-relaxed">
                    We will verify your payment and send the Pro report to <span className="text-paper">{form.email}</span> within 24 hours.
                    Keep your JazzCash receipt until then.
                  </p>
                  <Link to="/contact" className="btn-ghost mt-6 inline-block rounded-full px-5 py-2.5 text-sm font-semibold">Questions? Talk to our team</Link>
                </div>
              ) : (
                <div className="grid gap-4">
                  <h3 className="font-display text-2xl font-semibold">
                    {pkgs?.[selected]?.label || 'Pro Audit'}{price ? ` · Rs ${price.toLocaleString()}` : ''}
                  </h3>
                  {Field({ label: 'Your name', name: 'name', placeholder: 'Ali Khan' })}
                  {Field({ label: 'Email for the report', name: 'email', type: 'email', placeholder: 'you@company.com' })}
                  {Field({ label: 'WhatsApp number (optional)', name: 'phone', placeholder: '03XX XXXXXXX', hint: 'Only used if we need to confirm your payment.' })}
                  {needsWebsite && Field({ label: 'Website address', name: 'website_url', placeholder: 'yourbusiness.com' })}
                  {needsApp && Field({ label: 'App link (Google Play or App Store)', name: 'app_url', placeholder: 'https://play.google.com/store/apps/details?id=...' })}
                  {Field({ label: 'JazzCash transaction ID (TID)', name: 'tid', placeholder: 'e.g. 012345678901', hint: 'Found on your JazzCash receipt and SMS.' })}
                  {message && !Object.keys(errors).length && <p role="alert" className="text-sm text-red-400">{message}</p>}
                  <button onClick={submit} disabled={status === 'sending' || !pkgs}
                    className="btn-primary mt-2 rounded-full px-7 py-4 font-semibold disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-signal focus:ring-offset-2 focus:ring-offset-slate-panel">
                    {status === 'sending' ? 'Sending order...' : 'Submit order'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Free vs Pro */}
        <section className="px-4 pb-24">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">Free audit or Pro?</h2>
            <div className="mt-8 overflow-x-auto rounded-2xl border border-white/10">
              <table className="w-full text-left">
                <thead className="bg-slate-panel text-sm text-mist/60">
                  <tr>
                    <th className="px-5 py-4 font-medium">What you get</th>
                    <th className="px-5 py-4 font-medium text-center">Free</th>
                    <th className="px-5 py-4 font-medium text-center text-paper">Pro</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {COMPARE.map(([label, free, pro]) => (
                    <tr key={label}>
                      <td className="px-5 py-4 text-sm">{label}</td>
                      <td className="px-5 py-4 text-center text-mist/60"><Cell v={free} /></td>
                      <td className="px-5 py-4 text-center"><Cell v={pro} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-mist/50">
              Not sure yet? <Link to="/free-audit" className="text-signal hover:underline">Run the free audit first</Link>.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-4 pb-28 border-t border-white/5 pt-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">Questions</h2>
            <div className="mt-8 grid gap-6">
              {FAQ.map(([q, a]) => (
                <div key={q}>
                  <h3 className="font-semibold">{q}</h3>
                  <p className="mt-2 text-sm text-mist/60 leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
