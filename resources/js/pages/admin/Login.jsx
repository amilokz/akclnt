import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { Eye, EyeOff, Lock, Mail, ShieldCheck } from 'lucide-react';

export default function Login() {
    const { login, user } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPw, setShowPw] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Already signed in? Skip the login screen.
    useEffect(() => {
        if (user) {
            navigate(user.role === 'client' ? '/client/dashboard' : '/admin/dashboard', { replace: true });
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const loggedInUser = await login(email, password);
            navigate(loggedInUser.role === 'client' ? '/client/dashboard' : '/admin/dashboard', { replace: true });
        } catch (err) {
            const status = err?.response?.status;
            if (status === 429) {
                setError('Too many attempts. Please wait a minute and try again.');
            } else {
                setError('Invalid email or password.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden"
             style={{ background: 'linear-gradient(160deg, #06070C, #10121C)' }}>

            {/* backdrop */}
            <div className="absolute inset-0 opacity-[0.07] pointer-events-none"
                 style={{
                     backgroundImage: 'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)',
                     backgroundSize: '48px 48px',
                 }} />
            <div className="absolute -top-32 left-1/4 w-[38rem] h-[38rem] rounded-full blur-3xl pointer-events-none"
                 style={{ background: 'radial-gradient(circle, rgba(91,95,239,0.22), transparent 62%)' }} />
            <div className="absolute -bottom-40 right-0 w-[32rem] h-[32rem] rounded-full blur-3xl pointer-events-none"
                 style={{ background: 'radial-gradient(circle, rgba(0,168,150,0.16), transparent 62%)' }} />

            <div className="relative w-full max-w-[400px]">
                {/* brand */}
                <div className="text-center mb-8">
                    <div className="font-display text-3xl font-black tracking-tight"
                         style={{
                             background: 'linear-gradient(90deg, #5B5FEF, #8B7BF7, #00A896)',
                             WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                         }}>
                        akclnt
                    </div>
                    <div className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-white/35 mt-2">
                        Admin Panel
                    </div>
                </div>

                {/* card */}
                <div className="rounded-3xl p-px"
                     style={{ background: 'linear-gradient(160deg, rgba(91,95,239,0.5), rgba(255,255,255,0.05) 55%)' }}>
                    <div className="rounded-3xl p-8"
                         style={{ background: 'linear-gradient(180deg, #10121C, #0B0D14)' }}>

                        <h1 className="font-display text-xl font-bold text-white">Sign in</h1>
                        <p className="text-white/45 text-sm mt-1.5 mb-7">Enter your credentials to continue.</p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* email */}
                            <div>
                                <label className="block font-mono text-[0.62rem] uppercase tracking-wider text-white/45 mb-2">
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        autoComplete="email"
                                        placeholder="you@akclnt.com"
                                        className="w-full rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-colors focus:border-indigo-400"
                                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}
                                        required
                                    />
                                </div>
                            </div>

                            {/* password */}
                            <div>
                                <label className="block font-mono text-[0.62rem] uppercase tracking-wider text-white/45 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                                    <input
                                        type={showPw ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        autoComplete="current-password"
                                        placeholder="••••••••"
                                        className="w-full rounded-xl pl-11 pr-11 py-3 text-sm text-white placeholder-white/25 outline-none transition-colors focus:border-indigo-400"
                                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPw(!showPw)}
                                        aria-label={showPw ? 'Hide password' : 'Show password'}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
                                    >
                                        {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <div className="rounded-xl px-4 py-3 text-sm"
                                     style={{ background: 'rgba(220,38,38,0.12)', border: '1px solid rgba(220,38,38,0.3)', color: '#FCA5A5' }}>
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3.5 rounded-xl font-medium text-white text-sm transition-all hover:opacity-90 disabled:opacity-50"
                                style={{ background: 'linear-gradient(135deg, #5B5FEF, #8B7BF7)', boxShadow: '0 8px 24px -8px rgba(91,95,239,0.6)' }}
                            >
                                {loading ? 'Signing in...' : 'Sign in'}
                            </button>
                        </form>

                        <div className="flex items-center justify-center gap-2 mt-7 pt-6"
                             style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                            <ShieldCheck size={13} className="text-teal" />
                            <span className="font-mono text-[0.6rem] uppercase tracking-wider text-white/35">
                                Secure area · authorised access only
                            </span>
                        </div>
                    </div>
                </div>

                <p className="text-center font-mono text-[0.6rem] text-white/25 mt-6">
                    © {new Date().getFullYear()} akclnt
                </p>
            </div>
        </div>
    );
}