import React from 'react';
import { Link } from 'react-router-dom';

const values = [
    {
        title: 'We build to last',
        desc: 'Every system we ship is architected to scale, not patched together to demo well once.',
    },
    {
        title: 'We speak plainly',
        desc: 'No jargon-heavy pitches. We tell you what we can do, what it costs, and how long it takes.',
    },
    {
        title: 'We stay accountable',
        desc: 'You get a dashboard to track your project — not a black box you have to chase for updates.',
    },
];

export default function About() {
    return (
        <div>
            <section className="max-w-4xl mx-auto px-6 py-20 text-center">
                <span className="font-mono text-xs uppercase tracking-wider text-signal">
                    About akclnt
                </span>
                <h1 className="font-display text-4xl md:text-5xl font-semibold text-ink mt-4">
                    Software, built by people who actually write the code.
                </h1>
                <p className="text-graphite text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
                    Akclnt is a small software development team based in Rawalpindi,
                    Pakistan. We work with businesses that need real, working
                    software — websites, apps, and internal tools — without the
                    overhead of a large agency.
                </p>
            </section>

            <section className="bg-signal-dim py-20">
                <div className="max-w-6xl mx-auto px-6">
                    <span className="font-mono text-xs uppercase tracking-wider text-signal">
                        What we stand for
                    </span>
                    <h2 className="font-display text-3xl font-semibold text-ink mt-3 mb-12">
                        A few things that don't change.
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {values.map((value) => (
                            <div key={value.title} className="bg-paper rounded-xl p-6">
                                <h3 className="font-display text-lg font-semibold text-ink mb-2">
                                    {value.title}
                                </h3>
                                <p className="text-graphite text-sm leading-relaxed">
                                    {value.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="max-w-4xl mx-auto px-6 py-20 text-center">
                <h2 className="font-display text-2xl md:text-3xl font-semibold text-ink">
                    Want to work with us?
                </h2>
                <p className="text-graphite mt-3">
                    We'd love to hear what you're building.
                </p>
                <Link
                    to="/contact"
                    className="inline-block mt-6 bg-ink text-paper px-6 py-3 rounded-lg font-medium hover:bg-signal transition"
                >
                    Get in Touch
                </Link>
            </section>
        </div>
    );
}