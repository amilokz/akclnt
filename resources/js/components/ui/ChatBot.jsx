import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const SUGGESTIONS = [
    'What services do you offer?',
    'I need a website for my business',
    'How do I get a quote?',
    'What tech do you work with?',
];

const GREETING = "Hi! I'm the akclnt assistant. Ask me about our services, how we work, or tell me what you're trying to build.";

export default function ChatBot() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([{ role: 'assistant', text: GREETING }]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const endRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, loading, open]);

    useEffect(() => {
        if (open) setTimeout(() => inputRef.current?.focus(), 300);
    }, [open]);

    const send = async (text) => {
        const msg = (text ?? input).trim();
        if (!msg || loading) return;

        const nextMessages = [...messages, { role: 'user', text: msg }];
        setMessages(nextMessages);
        setInput('');
        setLoading(true);

        try {
            const { data } = await axios.post('/api/chat', {
                message: msg,
                // send last 10 turns for context (excluding the greeting)
                history: nextMessages.slice(1, -1).slice(-10).map((m) => ({ role: m.role, text: m.text })),
            });
            setMessages((prev) => [...prev, { role: 'assistant', text: data.reply }]);
        } catch (err) {
            setMessages((prev) => [...prev, {
                role: 'assistant',
                text: "I couldn't reach the server. Please email info@akclnt.com or message us on WhatsApp.",
            }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* ===== Launcher ===== */}
            <button
                onClick={() => setOpen(!open)}
                aria-label={open ? 'Close chat' : 'Open chat'}
                className="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
                style={{
                    background: 'linear-gradient(135deg, #5B5FEF, #8B7BF7)',
                    boxShadow: '0 8px 24px -6px rgba(91,95,239,0.7)',
                }}
            >
                {open ? (
                    <svg width="22" height="22" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                ) : (
                    <svg width="24" height="24" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                )}
            </button>

            {/* ===== Panel ===== */}
            <div
                className="fixed bottom-40 right-6 z-50 w-[min(92vw,380px)] rounded-2xl overflow-hidden flex flex-col"
                style={{
                    height: open ? 'min(70vh, 560px)' : 0,
                    opacity: open ? 1 : 0,
                    pointerEvents: open ? 'auto' : 'none',
                    transform: open ? 'translateY(0)' : 'translateY(16px)',
                    transition: 'opacity .3s ease, transform .3s ease, height .3s ease',
                    background: '#0B0D14',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 24px 60px -20px rgba(0,0,0,0.8)',
                }}
            >
                {/* header */}
                <div className="px-5 py-4 flex items-center gap-3 shrink-0"
                     style={{ background: 'linear-gradient(135deg, rgba(91,95,239,0.25), rgba(0,168,150,0.12))', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                         style={{ background: 'linear-gradient(135deg, #5B5FEF, #8B7BF7)' }}>
                        <svg width="18" height="18" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
                            <rect x="3" y="8" width="18" height="12" rx="3" />
                            <path d="M12 8V4M8 14h.01M16 14h.01" />
                        </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="font-display text-sm font-bold text-white">akclnt Assistant</div>
                        <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal" />
                            <span className="font-mono text-[0.6rem] uppercase tracking-wider text-white/50">Online</span>
                        </div>
                    </div>
                </div>

                {/* messages */}
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                    {messages.map((m, i) => (
                        <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div
                                className="max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap"
                                style={
                                    m.role === 'user'
                                        ? { background: 'linear-gradient(135deg, #5B5FEF, #8B7BF7)', color: '#fff', borderBottomRightRadius: 6 }
                                        : { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.85)', borderBottomLeftRadius: 6 }
                                }
                            >
                                {m.text}
                            </div>
                        </div>
                    ))}

                    {loading && (
                        <div className="flex justify-start">
                            <div className="px-4 py-3 rounded-2xl flex gap-1.5" style={{ background: 'rgba(255,255,255,0.06)', borderBottomLeftRadius: 6 }}>
                                {[0, 1, 2].map((d) => (
                                    <span key={d} className="w-1.5 h-1.5 rounded-full bg-white/50"
                                          style={{ animation: `chatDot 1.2s ease-in-out ${d * 0.15}s infinite` }} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* suggestions (only before first user message) */}
                    {messages.length === 1 && !loading && (
                        <div className="flex flex-wrap gap-2 pt-2">
                            {SUGGESTIONS.map((s) => (
                                <button
                                    key={s}
                                    onClick={() => send(s)}
                                    className="text-xs px-3 py-1.5 rounded-full text-white/70 hover:text-white transition-colors text-left"
                                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    )}

                    <div ref={endRef} />
                </div>

                {/* input */}
                <div className="p-3 shrink-0" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                    <div className="flex items-end gap-2">
                        <textarea
                            ref={inputRef}
                            rows={1}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    send();
                                }
                            }}
                            placeholder="Ask anything..."
                            className="flex-1 resize-none rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/35 outline-none max-h-28"
                            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                        />
                        <button
                            onClick={() => send()}
                            disabled={loading || !input.trim()}
                            aria-label="Send"
                            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 disabled:opacity-40 transition-opacity"
                            style={{ background: 'linear-gradient(135deg, #5B5FEF, #8B7BF7)' }}
                        >
                            <svg width="17" height="17" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" />
                            </svg>
                        </button>
                    </div>
                    <p className="font-mono text-[0.58rem] text-white/25 text-center mt-2">
                        AI assistant — may make mistakes. For anything important, contact the team.
                    </p>
                </div>
            </div>

            <style>{`
                @keyframes chatDot {
                    0%, 60%, 100% { opacity: .3; transform: translateY(0); }
                    30% { opacity: 1; transform: translateY(-3px); }
                }
            `}</style>
        </>
    );
}