import Seo from '../../components/ui/Seo.jsx';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Check, ArrowUpRight } from 'lucide-react';
import Reveal from '../../components/ui/Reveal.jsx';

export default function ServiceDetail() {
    const { id } = useParams();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        axios.get(`/api/services/${id}`)
            .then((response) => {
                setService(response.data);
                setLoading(false);
            })
            .catch(() => {
                setNotFound(true);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="max-w-3xl mx-auto px-6 pt-40 pb-24">
                <div className="h-8 w-40 bg-mist/60 rounded animate-pulse mb-8" />
                <div className="h-16 w-16 bg-mist/60 rounded-2xl animate-pulse mb-6" />
                <div className="h-10 w-2/3 bg-mist/60 rounded animate-pulse mb-4" />
                <div className="h-40 bg-mist/40 rounded-2xl animate-pulse" />
            </div>
        );
    }

    if (notFound || !service) {
        return (
            <div className="max-w-3xl mx-auto px-6 pt-40 pb-24 text-center">
                <h1 className="font-display text-2xl font-semibold text-ink">Service not found</h1>
                <Link to="/services" className="text-signal hover:underline mt-4 inline-flex items-center gap-1.5 font-mono text-sm">
                    <ArrowLeft size={14} /> Back to Services
                </Link>
            </div>
        );
    }

    return (
          <>
            <Seo
            path={`/services/${id}`}
            title={`${service.name} in Pakistan | AKCLNT`}
            description={service.description}
        />
        <div className="overflow-hidden">
            {/* Hero header */}
            <section className="relative bg-void text-paper pt-36 pb-20 overflow-hidden">
                <div className="mesh-bg">
                    <div className="grid-overlay-dark absolute inset-0" />
                    <div className="aurora absolute w-[40vw] h-[40vw] rounded-full blur-3xl -top-10 right-0"
                         style={{ background: 'radial-gradient(circle, rgba(139,123,247,0.25), transparent 60%)' }} />
                </div>
                <div className="relative max-w-3xl mx-auto px-6">
                    <Link to="/services" className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-white/60 hover:text-white transition-colors">
                        <ArrowLeft size={14} /> Back to Services
                    </Link>
                    <Reveal>
                        <div className="text-6xl mt-8 mb-6">{service.icon}</div>
                        <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight">{service.name}</h1>
                        <p className="text-white/60 mt-5 text-lg leading-relaxed">{service.description}</p>
                    </Reveal>
                </div>
            </section>

            {/* Body */}
            <section className="max-w-3xl mx-auto px-6 py-20">
                <Reveal>
                    <div className="bg-white border border-mist rounded-2xl p-8 md:p-10">
                        <span className="font-mono text-xs uppercase tracking-wider text-signal">What's included</span>
                        <ul className="mt-6 space-y-4">
                            {service.features?.map((feature, i) => (
                                <li key={i} className="flex items-start gap-3.5 text-ink">
                                    <span className="w-6 h-6 rounded-full bg-signal-dim flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <Check size={13} className="text-signal" />
                                    </span>
                                    <span className="leading-relaxed">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Reveal>

                <Reveal delay={0.1}>
                    <div className="relative bg-ink text-paper rounded-2xl p-8 md:p-10 mt-8 overflow-hidden">
                        <div className="aurora absolute right-0 top-0 w-64 h-64 rounded-full blur-3xl"
                             style={{ background: 'radial-gradient(circle, rgba(0,168,150,0.25), transparent 60%)' }} />
                        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                            <div>
                                <h2 className="font-display text-xl font-semibold">Ready to get started?</h2>
                                <p className="text-white/55 text-sm mt-1">We'll reply within 24 hours.</p>
                            </div>
                            <Link
                                to={`/contact?service=${service.id}`}
                                className="group inline-flex items-center gap-2 bg-white text-ink px-6 py-3.5 rounded-full font-medium hover:bg-signal hover:text-white transition-colors whitespace-nowrap"
                            >
                                Request This Service
                                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </Link>
                        </div>
                    </div>
                </Reveal>
            </section>
        </div>
        </>
    );
}
