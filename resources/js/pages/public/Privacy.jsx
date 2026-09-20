import Seo from '../../components/ui/Seo.jsx';
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '../../components/ui/Reveal.jsx';

const sections = [
    {
        title: 'Information We Collect',
        body: `We collect information you give us directly — your name, email address, phone number, and any project details you share through our contact forms or over email and WhatsApp. We also collect basic technical data automatically, such as your browser type, device, and how you use our site, through standard analytics tools.`,
    },
    {
        title: 'How We Use Your Information',
        body: `We use your information to respond to your enquiries, prepare quotes and proposals, deliver the services you hire us for, send project updates and invoices, and improve our website. We do not use your data for anything you would not reasonably expect from a software studio you contacted.`,
    },
    {
        title: 'Sharing Your Information',
        body: `We do not sell, rent, or trade your personal information. We only share data with third-party services we use to run our business — such as hosting providers, email services, and analytics platforms — and only to the extent needed to deliver our services. We may also disclose information if required by law.`,
    },
    {
        title: 'Cookies and Analytics',
        body: `Our site uses cookies and similar technologies to keep the site working properly and to understand how visitors use it. You can disable cookies in your browser settings, though some parts of the site may not work as intended.`,
    },
    {
        title: 'Data Security',
        body: `We take reasonable technical and organisational measures to protect your data, including secure hosting, encrypted connections, and restricted access. No method of transmission over the internet is completely secure, so we cannot guarantee absolute security.`,
    },
    {
        title: 'Data Retention',
        body: `We keep your information only as long as needed for the purpose it was collected — typically for the duration of our working relationship plus any period required for legal, tax, or accounting purposes.`,
    },
    {
        title: 'Your Rights',
        body: `You can ask us what personal data we hold about you, request corrections, or ask us to delete it. To make a request, email us and we will respond within a reasonable timeframe.`,
    },
    {
        title: 'Third-Party Links',
        body: `Our site may link to other websites. We are not responsible for the privacy practices or content of those sites, and we encourage you to read their policies.`,
    },
    {
        title: 'Changes to This Policy',
        body: `We may update this policy from time to time. Any changes will be posted on this page with an updated date. Continued use of our site after changes means you accept the updated policy.`,
    },
    {
        title: 'Contact Us',
        body: `If you have any questions about this Privacy Policy or how we handle your data, contact us at info@akclnt.com or +92 323 8559822.`,
    },
];

export default function Privacy() {
    return (
<>
        <Seo path="/privacy" title="Privacy Policy | AKCLNT" description="How AKCLNT collects, uses, and protects your data." />
        <div className="overflow-hidden">
            {/* Header */}
            <section className="relative bg-void text-paper pt-36 pb-24 overflow-hidden">
                <div className="grid-overlay-dark absolute inset-0 opacity-40" />
                <div className="aurora absolute w-[45vw] h-[45vw] rounded-full blur-3xl -top-20 right-0"
                     style={{ background: 'radial-gradient(circle, rgba(91,95,239,0.22), transparent 60%)' }} />
                <div className="relative max-w-4xl mx-auto px-6">
                    <Reveal>
                        <span className="font-mono text-xs uppercase tracking-wider text-teal">Legal</span>
                        <h1 className="font-display text-4xl md:text-6xl font-bold mt-4 leading-[1.05]">
                            Privacy <span className="text-gradient">Policy</span>
                        </h1>
                        <p className="text-white/55 mt-6 max-w-lg text-lg leading-relaxed">
                            How we collect, use, and protect your information when you work with us.
                        </p>
                        <p className="font-mono text-xs text-white/35 mt-6">
                            Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* Content */}
            <section className="max-w-4xl mx-auto px-6 py-20">
                <div className="space-y-10">
                    {sections.map((s, i) => (
                        <Reveal key={s.title} delay={(i % 3) * 0.05}>
                            <div>
                                <h2 className="font-display text-xl font-bold text-ink mb-3 flex items-baseline gap-3">
                                    <span className="font-mono text-xs text-signal">{String(i + 1).padStart(2, '0')}</span>
                                    {s.title}
                                </h2>
                                <p className="text-graphite leading-relaxed">{s.body}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>

                {/* CTA */}
                <Reveal>
                    <div className="relative bg-ink text-paper rounded-3xl p-10 md:p-14 mt-16 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 overflow-hidden">
                        <div className="aurora absolute right-0 top-0 w-72 h-72 rounded-full blur-3xl"
                             style={{ background: 'radial-gradient(circle, rgba(0,168,150,0.2), transparent 60%)' }} />
                        <h2 className="relative font-display text-2xl md:text-3xl font-semibold max-w-sm">
                            Questions about your data?
                        </h2>
                        <Link to="/contact" className="relative inline-flex items-center gap-2 bg-white text-ink px-6 py-3.5 rounded-full font-medium hover:bg-signal hover:text-white transition-colors whitespace-nowrap">
                            Get in Touch <ArrowUpRight size={16} />
                        </Link>
                    </div>
                </Reveal>
            </section>
        </div>
        </>
    );
}