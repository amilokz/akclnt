import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
        <div className="max-w-6xl mx-auto px-6 py-20">
            <span className="font-mono text-xs uppercase tracking-wider text-signal">
                What we build
            </span>
            <h1 className="font-display text-4xl font-semibold text-ink mt-3 max-w-xl">
                Services built around your goals, not our templates.
            </h1>
            <p className="text-graphite mt-4 max-w-lg">
                Every project starts with what your business actually needs. Here's
                where we usually start the conversation.
            </p>

            {loading ? (
                <p className="text-graphite mt-16 font-mono text-sm">Loading services...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                    {services.map((service, i) => (
                        <Link
                            key={service.id}
                            to={`/services/${service.id}`}
                            className="group border border-mist rounded-xl p-8 hover:border-signal hover:shadow-sm transition"
                        >
                            <div className="flex items-start justify-between">
                                <div className="text-4xl mb-4">{service.icon}</div>
                                <span className="font-mono text-xs text-graphite">
                                    0{i + 1}
                                </span>
                            </div>
                            <h2 className="font-display text-xl font-semibold text-ink mb-2">
                                {service.name}
                            </h2>
                            <p className="text-graphite text-sm leading-relaxed mb-4">
                                {service.description}
                            </p>
                            <span className="font-mono text-xs uppercase tracking-wider text-signal group-hover:underline">
                                Learn more →
                            </span>
                        </Link>
                    ))}
                </div>
            )}

            <div className="bg-signal-dim rounded-2xl p-10 md:p-14 mt-20 text-center">
                <h2 className="font-display text-2xl md:text-3xl font-semibold text-ink max-w-md mx-auto">
                    Not sure which service fits your project?
                </h2>
                <p className="text-graphite mt-3">
                    Tell us what you're trying to build — we'll point you in the right direction.
                </p>
                <Link
                    to="/contact"
                    className="inline-block mt-6 bg-ink text-paper px-6 py-3 rounded-lg font-medium hover:bg-signal transition"
                >
                    Talk to Us
                </Link>
            </div>
        </div>
    );
}