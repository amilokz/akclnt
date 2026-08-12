import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '../../components/ui/Reveal.jsx';
import TiltCard from '../../components/ui/TiltCard.jsx';

export default function Services() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/services')
            .then((response) => {
                setServices(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching services:', error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="overflow-hidden">
            {/* Header */}
            <section className="relative bg-void text-paper pt-36 pb-24 overflow-hidden">
                <div className="mesh-bg">
                    <div className="grid-overlay-dark absolute inset-0" />
                    <div className="aurora absolute w-[45vw] h-[45vw] rounded-full blur-3xl -top-20 right-0"
                         style={{ background: 'radial-gradient(circle, rgba(91,95,239,0.25), transparent 60%)' }} />
                </div>
                <div className="relative max-w-6xl mx-auto px-6">
                    <Reveal>
                        <span className="font-mono text-xs uppercase tracking-wider text-teal">What we build</span>
                        <h1 className="font-display text-4xl md:text-6xl font-bold mt-4 max-w-2xl leading-[1.05]">
                            Services built around <span className="text-gradient">your goals</span>, not our templates.
                        </h1>
                        <p className="text-white/55 mt-6 max-w-lg text-lg leading-relaxed">
                            Every project starts with what your business actually needs. Here's where we
                            usually begin the conversation.
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* Services grid */}
            <section className="max-w-6xl mx-auto px-6 py-24">
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-52 rounded-2xl bg-mist/50 animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {services.map((service, i) => (
                            <Reveal key={service.id} delay={(i % 2) * 0.08}>
                                <TiltCard max={6} className="h-full">
                                    <Link
                                        to={`/services/${service.id}`}
                                        className="group relative h-full flex flex-col bg-white border border-mist rounded-2xl p-8 overflow-hidden hover:border-signal transition-colors shine-sweep"
                                    >
                                        <div className="flex items-start justify-between mb-5">
                                            <div className="text-4xl w-16 h-16 rounded-2xl bg-signal-dim flex items-center justify-center group-hover:scale-110 transition-transform">
                                                {service.icon}
                                            </div>
                                            <span className="font-mono text-xs text-graphite">0{i + 1}</span>
                                        </div>
                                        <h2 className="font-display text-xl font-semibold text-ink mb-2">{service.name}</h2>
                                        <p className="text-graphite text-sm leading-relaxed mb-5 flex-1">{service.description}</p>
                                        <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-signal">
                                            Learn more
                                            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                        </span>
                                    </Link>
                                </TiltCard>
                            </Reveal>
                        ))}
                    </div>
                )}

                {/* CTA */}
                <Reveal>
                    <div className="relative bg-ink text-paper rounded-3xl p-10 md:p-16 mt-20 text-center overflow-hidden">
                        <div className="aurora absolute left-1/2 top-1/2 w-[40vw] h-[40vw] rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
                             style={{ background: 'radial-gradient(circle, rgba(0,168,150,0.2), transparent 60%)' }} />
                        <div className="relative">
                            <h2 className="font-display text-2xl md:text-3xl font-semibold max-w-md mx-auto">
                                Not sure which service fits your project?
                            </h2>
                            <p className="text-white/55 mt-3">
                                Tell us what you're trying to build — we'll point you in the right direction.
                            </p>
                            <Link to="/contact" className="inline-block mt-7 bg-white text-ink px-7 py-3.5 rounded-full font-medium hover:bg-signal hover:text-white transition-colors">
                                Talk to Us
                            </Link>
                        </div>
                    </div>
                </Reveal>
            </section>
        </div>
    );
}
