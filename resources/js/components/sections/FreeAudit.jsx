import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Gauge, Search, MessageCircle, Mail } from "lucide-react";

const WEBHOOK = "/api/website-audit";

const RINGS = [
  { value: 92, label: "Speed", color: "var(--color-teal)" },
  { value: 78, label: "SEO", color: "#F5A524" },
  { value: 64, label: "Mobile", color: "#F5A524" },
];

function Ring({ value, label, color }) {
  const r = 24;
  const c = 2 * Math.PI * r;
  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="60" height="60" viewBox="0 0 60 60" aria-hidden="true">
        <circle cx="30" cy="30" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
        <circle cx="30" cy="30" r={r} fill="none" stroke={color} strokeWidth="5" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c * (1 - value / 100)} transform="rotate(-90 30 30)" />
        <text x="30" y="35" textAnchor="middle" fontSize="14" fontWeight="700" fill="currentColor">{value}</text>
      </svg>
      <span className="font-mono text-[0.6rem] uppercase tracking-wider text-white/50">{label}</span>
    </div>
  );
}

export default function FreeAudit() {
  const [form, setForm] = useState({ url: "", name: "", email: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [msg, setMsg] = useState("");

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    if (!form.url.includes(".") || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setStatus("error");
      setMsg("Enter your website address and a valid email to get the report.");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setMsg(data.message || "Check the website address and email, then try again.");
        return;
      }
      setStatus("done");
      setMsg(data.message || "Audit started. Check your inbox in 1-2 minutes.");
    } catch {
      setStatus("error");
      setMsg("Check your connection and try again.");
    }
  };

  const input = "w-full rounded-xl bg-void border border-white/10 px-4 py-3.5 text-paper placeholder:text-white/30 focus:outline-none focus:border-signal focus:ring-2 focus:ring-signal/40";

  return (
    <section className="py-24 px-4" style={{ backgroundColor: "#f0f4f8" }}>
      <div className="relative max-w-6xl mx-auto rounded-[2rem] bg-void text-paper overflow-hidden shadow-[0_40px_100px_-40px_rgba(91,95,239,0.55)]">
        <div aria-hidden="true" className="pointer-events-none absolute -top-32 -left-24 h-96 w-96 rounded-full bg-signal/25 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-teal/15 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

        <div className="relative grid lg:grid-cols-2">
          {/* Left: pitch + live preview */}
          <div className="p-8 md:p-12">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-teal">Free AI website audit</p>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight mt-4 leading-[1.05]">
              How is your website <span className="text-gradient">really</span> doing?
            </h2>
            <p className="mt-5 text-white/60 leading-relaxed max-w-md">
              Real Google speed data plus an AI review of your SEO and lead capture. The full report lands in your inbox in about two minutes.
            </p>

            <div className="mt-8 rounded-2xl border border-white/10 bg-slate-panel/80 p-5 max-w-md">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-white/50">scanning yourbusiness.com</span>
                <span className="flex items-center gap-1.5 font-mono text-[0.65rem] text-teal">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-teal opacity-60 animate-ping motion-reduce:animate-none" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
                  </span>
                  live
                </span>
              </div>
              <div className="mt-5 grid grid-cols-3 text-paper">
                {RINGS.map((r) => <Ring key={r.label} {...r} />)}
              </div>
            </div>

            <ul className="mt-8 grid gap-3 text-sm text-white/70">
              <li className="flex items-center gap-3"><Gauge size={18} className="text-teal" /> Mobile speed test by Google PageSpeed</li>
              <li className="flex items-center gap-3"><Search size={18} className="text-teal" /> SEO basics: titles, descriptions, headings</li>
              <li className="flex items-center gap-3"><MessageCircle size={18} className="text-teal" /> Lead capture: WhatsApp, chat and analytics</li>
            </ul>
          </div>

          {/* Right: form */}
          <div className="p-8 md:p-12 lg:border-l border-t lg:border-t-0 border-white/10 flex flex-col justify-center">
            {status === "done" ? (
              <div aria-live="polite">
                <span className="w-12 h-12 rounded-2xl bg-teal/15 flex items-center justify-center"><Mail size={22} className="text-teal" /></span>
                <h3 className="font-display text-2xl font-bold mt-5">Your report is on its way</h3>
                <p className="mt-3 text-white/65 leading-relaxed">{msg}</p>
                <p className="mt-2 text-sm text-white/45">Check your spam folder if it does not show up.</p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <button onClick={() => { setForm({ url: "", name: "", email: "" }); setStatus("idle"); setMsg(""); }}
                    className="btn-ghost rounded-full px-5 py-2.5 text-sm font-semibold">Audit another website</button>
                  <Link to="/pro-audit" className="btn-primary rounded-full px-5 py-2.5 text-sm font-semibold">See the Pro Audit</Link>
                </div>
              </div>
            ) : (
              <div className="grid gap-4">
                <h3 className="font-display text-2xl font-bold">Run your free audit</h3>
                <label className="grid gap-2 text-sm text-white/60">Website address
                  <input name="url" value={form.url} onChange={update} placeholder="yourbusiness.com" className={input} />
                </label>
                <label className="grid gap-2 text-sm text-white/60">Your name
                  <input name="name" value={form.name} onChange={update} placeholder="Ali Khan" className={input} />
                </label>
                <label className="grid gap-2 text-sm text-white/60">Email for the report
                  <input name="email" type="email" value={form.email} onChange={update} placeholder="you@company.com" className={input} />
                </label>
                {status === "error" && (
                  <p role="alert" className="text-sm text-red-400">
                    {msg}{" "}
                    {msg.includes("free audits") && <Link to="/pro-audit" className="font-semibold text-signal hover:underline">See the Pro Audit</Link>}
                  </p>
                )}
                <button onClick={submit} disabled={status === "sending"}
                  className="btn-primary mt-2 rounded-full px-7 py-4 font-semibold disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-signal focus:ring-offset-2 focus:ring-offset-void">
                  {status === "sending" ? "Starting audit..." : "Audit my website free"}
                </button>
                <p className="flex items-center gap-2 text-xs text-white/40">
                  <Check size={14} className="text-teal" /> Free, no card needed. 3 audits per month.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
