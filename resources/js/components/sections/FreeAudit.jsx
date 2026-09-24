import { useState } from "react";

const WEBHOOK = "/api/website-audit";

export default function FreeAudit() {
  const [form, setForm] = useState({ url: "", name: "", email: "" });
  const [status, setStatus] = useState("idle");
  const [msg, setMsg] = useState("");

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    if (!form.url || !form.email) {
      setStatus("error");
      setMsg("Enter your website address and email to get the report.");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setStatus("done");
      setMsg(data.message || "Audit started. Check your inbox in 1-2 minutes.");
    } catch {
      setStatus("error");
      setMsg("Check the website address and email, then try again.");
    }
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold">How is your website really doing?</h2>
        <p className="mt-3 text-gray-600">
          Get a free AI audit of speed, SEO and conversion basics. The full report lands in your inbox in about two minutes.
        </p>
        <div className="mt-8 grid gap-3">
          <input name="url" value={form.url} onChange={update} placeholder="yourwebsite.com"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          <div className="grid md:grid-cols-2 gap-3">
            <input name="name" value={form.name} onChange={update} placeholder="Your name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <input name="email" type="email" value={form.email} onChange={update} placeholder="you@company.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <button onClick={submit} disabled={status === "sending"}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-semibold rounded-lg px-6 py-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            {status === "sending" ? "Starting audit..." : "Get my free audit"}
          </button>
          {msg && (
            <p role="status" className={status === "error" ? "text-red-600" : "text-green-700"}>{msg}</p>
          )}
        </div>
      </div>
    </section>
  );
}
