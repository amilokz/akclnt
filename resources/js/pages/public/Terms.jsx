import Seo from '../../components/ui/Seo.jsx';
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '../../components/ui/Reveal.jsx';

const sections = [
    {
        title: 'Agreement to Terms',
        body: `By accessing akclnt.com or hiring us for any service, you agree to these Terms of Service. If you do not agree with any part of them, please do not use our website or services.`,
    },
    {
        title: 'Our Services',
        body: `We provide software development, automation, digital marketing, design, consulting, and related services. The exact scope, timeline, and cost of any project are agreed separately in writing before work begins.`,
    },
    {
        title: 'Quotes and Payments',
        body: `Quotes are valid for the period stated in the proposal. Projects typically require an advance payment before work starts, with the balance due at agreed milestones or on delivery. Invoices are payable within the timeframe stated on the invoice. Work may be paused on overdue accounts.`,
    },
    {
        title: 'Client Responsibilities',
        body: `You agree to provide the content, access, approvals, and feedback we need to do the work, in a reasonable timeframe. Delays in providing these may extend the project timeline. You confirm that any material you give us does not infringe anyone else's rights.`,
    },
    {
        title: 'Revisions and Scope',
        body: `Each project includes a reasonable number of revision rounds as agreed in the proposal. Work that falls outside the agreed scope will be quoted separately before we proceed.`,
    },
    {
        title: 'Intellectual Property',
        body: `Once a project is fully paid for, ownership of the final deliverables transfers to you. We retain the right to reuse general knowledge, techniques, and any reusable components or libraries we developed. We may also showcase the work in our portfolio unless you ask us not to.`,
    },
    {
        title: 'Third-Party Services',
        body: `Projects may rely on third-party services, APIs, hosting, or licences. Their costs, terms, and availability are outside our control, and we are not responsible for changes, outages, or price increases on their side.`,
    },
    {
        title: 'Warranties and Support',
        body: `We fix bugs in our own work free of charge for the support period agreed in the proposal. This does not cover new features, changes you or a third party make to the code, or issues caused by third-party services.`,
    },
    {
        title: 'Limitation of Liability',
        body: `We provide our services with reasonable care and skill, but we are not liable for indirect or consequential losses, including lost profits or data. Our total liability for any claim is limited to the amount you paid us for the project in question.`,
    },
    {
        title: 'Cancellation',
        body: `Either party may end a project in writing. You remain responsible for payment for all work completed up to the cancellation date. Advance payments are non-refundable once work has started.`,
    },
    {
        title: 'Changes to These Terms',
        body: `We may update these terms from time to time. The version published on this page at the time you engage us is the one that applies to your project.`,
    },
    {
        title: 'Contact Us',
        body: `Questions about these terms? Contact us at info@akclnt.com or +92 323 8559822.`,
    },
];

export default function Terms() {
    return (
           <>
           <Seo path="/terms" title="Terms of Service | AKCLNT" description="The terms and conditions for using AKCLNT's website and services." />
        <div className="overflow-hidden">
            {/* Header */}
            <section className="relative bg-void text-paper pt-36 pb-24 overflow-hidden">
                <div className="grid-overlay-dark absolute inset-0 opacity-40" />
                <div className="aurora absolute w-[45vw] h-[45vw] rounded-full blur-3xl -top-20 -left-10"
                     style={{ background: 'radial-gradient(circle, rgba(0,168,150,0.22), transparent 60%)' }} />
                <div className="relative max-w-4xl mx-auto px-6">
                    <Reveal>
                        <span className="font-mono text-xs uppercase tracking-wider text-teal">Legal</span>
                        <h1 className="font-display text-4xl md:text-6xl font-bold mt-4 leading-[1.05]">
                            Terms of <span className="text-gradient">Service</span>
                        </h1>
                        <p className="text-white/55 mt-6 max-w-lg text-lg leading-relaxed">
                            The terms that apply when you use our website or hire us for a project.
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
                             style={{ background: 'radial-gradient(circle, rgba(91,95,239,0.2), transparent 60%)' }} />
                        <h2 className="relative font-display text-2xl md:text-3xl font-semibold max-w-sm">
                            Ready to start a project?
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