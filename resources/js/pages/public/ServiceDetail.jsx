import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

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
        return <div className="text-center py-24 font-mono text-sm text-graphite">Loading...</div>;
    }

    if (notFound || !service) {
        return (
            <div className="max-w-3xl mx-auto px-6 py-24 text-center">
                <h1 className="font-display text-2xl font-semibold text-ink">Service not found</h1>
                <Link to="/services" className="text-signal hover:underline mt-4 inline-block font-mono text-sm">
                    ← Back to Services
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-6 py-20">
            <Link to="/services" className="font-mono text-xs uppercase tracking-wider text-signal hover:underline">
                ← Back to Services
            </Link>

            <div className="mt-8">
                <div className="text-5xl mb-5">{service.icon}</div>
                <h1 className="font-display text-3xl md:text-4xl font-semibold text-ink">
                    {service.name}
                </h1>
                <p className="text-graphite mt-4 text-lg leading-relaxed">
                    {service.description}
                </p>

                <div className="bg-signal-dim rounded-2xl p-8 mt-10">
                    <span className="font-mono text-xs uppercase tracking-wider text-signal">
                        What's included
                    </span>
                    <ul className="mt-5 space-y-3">
                        {service.features?.map((feature, i) => (
                            <li key={i} className="flex items-start gap-3 text-ink">
                                <span className="w-1.5 h-1.5 rounded-full bg-signal mt-2 flex-shrink-0"></span>
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>

                <Link
                    to={`/contact?service=${service.id}`}
                    className="inline-block mt-10 bg-ink text-paper px-6 py-3.5 rounded-lg font-medium hover:bg-signal transition"
                >
                    Request This Service
                </Link>
            </div>
        </div>
    );
}