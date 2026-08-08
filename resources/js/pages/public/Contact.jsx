import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

export default function Contact() {
    const [searchParams] = useSearchParams();
    const preselectedService = searchParams.get('service') || '';

    const [services, setServices] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service_id: preselectedService,
        budget: '',
        message: '',
    });

    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        axios.get('/api/services')
            .then((response) => setServices(response.data))
            .catch((error) => console.error('Error fetching services:', error));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);
        setErrors({});

        axios.post('/api/leads', formData)
            .then(() => {
                setSubmitted(true);
                setSubmitting(false);
            })
            .catch((error) => {
                setSubmitting(false);
                if (error.response && error.response.status === 422) {
                    const serverErrors = {};
                    const errorData = error.response.data.errors;
                    for (const field in errorData) {
                        serverErrors[field] = errorData[field][0];
                    }
                    setErrors(serverErrors);
                } else {
                    console.error('Error submitting form:', error);
                }
            });
    };

    const inputClass =
        'w-full border border-mist rounded-lg px-4 py-2.5 text-ink focus:outline-none focus:ring-2 focus:ring-signal focus:border-signal transition';
    const labelClass = 'block font-mono text-xs uppercase tracking-wider text-graphite mb-2';

    if (submitted) {
        return (
            <div className="max-w-xl mx-auto px-6 py-28 text-center">
                <div className="w-12 h-12 rounded-full bg-signal-dim flex items-center justify-center mx-auto mb-6">
                    <span className="text-signal text-xl">✓</span>
                </div>
                <h1 className="font-display text-2xl font-semibold text-ink">Thank you!</h1>
                <p className="text-graphite mt-3">
                    We've received your inquiry and will get back to you within 24 hours.
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-xl mx-auto px-6 py-20">
            <span className="font-mono text-xs uppercase tracking-wider text-signal block text-center">
                Get in touch
            </span>
            <h1 className="font-display text-3xl md:text-4xl font-semibold text-ink text-center mt-3">
                Let's talk about your project.
            </h1>
            <p className="text-graphite text-center mt-3">
                Fill this out and we'll get back to you within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="mt-12 space-y-6">
                <div>
                    <label className={labelClass}>Full Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Your name"
                    />
                    {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                    <label className={labelClass}>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="you@example.com"
                    />
                    {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                    <label className={labelClass}>Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="+92 3XX XXXXXXX"
                    />
                    {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div>
                    <label className={labelClass}>Service</label>
                    <select
                        name="service_id"
                        value={formData.service_id}
                        onChange={handleChange}
                        className={inputClass}
                    >
                        <option value="">Select a service</option>
                        {services.map((s) => (
                            <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                    </select>
                    {errors.service_id && <p className="text-red-600 text-sm mt-1">{errors.service_id}</p>}
                </div>

                <div>
                    <label className={labelClass}>Budget (optional)</label>
                    <input
                        type="text"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="e.g. PKR 50,000 - 100,000"
                    />
                </div>

                <div>
                    <label className={labelClass}>Tell us about your project</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className={inputClass}
                        placeholder="Briefly describe what you need..."
                    />
                    {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message}</p>}
                </div>

                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-ink text-paper py-3.5 rounded-lg font-medium hover:bg-signal transition disabled:opacity-50"
                >
                    {submitting ? 'Submitting...' : 'Submit Inquiry'}
                </button>
            </form>
        </div>
    );
}