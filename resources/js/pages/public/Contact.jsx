import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Mail, MapPin, Clock, CheckCircle2 } from 'lucide-react';
import Reveal from '../../components/ui/Reveal.jsx';

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
        'w-full bg-white border border-mist rounded-xl px-4 py-3 text-ink placeholder:text-graphite/50 focus:outline-none focus:ring-2 focus:ring-signal/30 focus:border-signal transition';
    const labelClass = 'block font-mono text-xs uppercase tracking-wider text-graphite mb-2';

    if (submitted) {
        return (
            <div className="relative bg-void text-paper min-h-[70vh] flex items-center overflow-hidden pt-24">
                <div className="mesh-bg">
                    <div className="aurora absolute left-1/2 top-1/2 w-[50vw] h-[50vw] rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
                         style={{ background: 'radial-gradient(circle, rgba(0,168,150,0.25), transparent 60%)' }} />
                </div>
                <div className="relative max-w-xl mx-auto px-6 text-center" style={{ animation: 'fadeInUp 0.6s ease' }}>
                    <div className="w-16 h-16 rounded-full bg-teal/20 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 size={32} className="text-teal" />
                    </div>
                    <h1 className="font-display text-3xl font-bold">Thank you!</h1>
                    <p className="text-white/60 mt-4 text-lg">
                        We've received your inquiry and will get back to you within 24 hours.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative bg-void text-paper min-h-screen overflow-hidden pt-32 pb-24">
            <div className="mesh-bg">
                <div className="grid-overlay-dark absolute inset-0" />
                <div className="aurora absolute w-[45vw] h-[45vw] rounded-full blur-3xl -top-10 -left-10"
                     style={{ background: 'radial-gradient(circle, rgba(91,95,239,0.22), transparent 60%)' }} />
                <div className="aurora absolute w-[40vw] h-[40vw] rounded-full blur-3xl bottom-0 right-0"
                     style={{ background: 'radial-gradient(circle, rgba(0,168,150,0.18), transparent 60%)', animationDelay: '-9s' }} />
            </div>

            <div className="relative max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-5 gap-12">
                {/* Left: intro + contact info */}
                <Reveal className="lg:col-span-2" direction="right">
                    <span className="font-mono text-xs uppercase tracking-wider text-teal">Get in touch</span>
                    <h1 className="font-display text-4xl md:text-5xl font-bold mt-4 leading-tight">
                        Let's talk about your <span className="text-gradient">project.</span>
                    </h1>
                    <p className="text-white/55 mt-5 leading-relaxed">
                        Fill out the form and we'll get back to you within 24 hours. No obligation, no pressure.
                    </p>

                    <div className="mt-10 space-y-5">
                        {[
                            { icon: Mail, label: 'Email', value: 'hello@akclnt.com' },
                            { icon: MapPin, label: 'Location', value: 'Rawalpindi, Pakistan' },
                            { icon: Clock, label: 'Response time', value: 'Within 24 hours' },
                        ].map((item) => {
                            const Icon = item.icon;
                            return (
                                <div key={item.label} className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl glass-dark flex items-center justify-center flex-shrink-0">
                                        <Icon size={17} className="text-teal" />
                                    </div>
                                    <div>
                                        <div className="font-mono text-[10px] uppercase tracking-wider text-white/40">{item.label}</div>
                                        <div className="text-white text-sm mt-0.5">{item.value}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Reveal>

                {/* Right: form */}
                <Reveal className="lg:col-span-3" delay={0.1}>
                    <div className="bg-paper rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label className={labelClass}>Full Name</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} className={inputClass} placeholder="Your name" />
                                    {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                                </div>
                                <div>
                                    <label className={labelClass}>Email</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClass} placeholder="you@example.com" />
                                    {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label className={labelClass}>Phone</label>
                                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} className={inputClass} placeholder="+92 3XX XXXXXXX" />
                                    {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
                                </div>
                                <div>
                                    <label className={labelClass}>Service</label>
                                    <select name="service_id" value={formData.service_id} onChange={handleChange} className={inputClass}>
                                        <option value="">Select a service</option>
                                        {services.map((s) => (
                                            <option key={s.id} value={s.id}>{s.name}</option>
                                        ))}
                                    </select>
                                    {errors.service_id && <p className="text-red-600 text-sm mt-1">{errors.service_id}</p>}
                                </div>
                            </div>

                            <div>
                                <label className={labelClass}>Budget (optional)</label>
                                <input type="text" name="budget" value={formData.budget} onChange={handleChange} className={inputClass} placeholder="e.g. PKR 50,000 - 100,000" />
                            </div>

                            <div>
                                <label className={labelClass}>Tell us about your project</label>
                                <textarea name="message" value={formData.message} onChange={handleChange} rows={4} className={inputClass} placeholder="Briefly describe what you need..." />
                                {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full bg-ink text-paper py-4 rounded-xl font-medium hover:bg-signal transition-colors disabled:opacity-50"
                            >
                                {submitting ? 'Submitting...' : 'Submit Inquiry'}
                            </button>
                        </form>
                    </div>
                </Reveal>
            </div>
        </div>
    );
}
