import React, { useState, useEffect } from 'react';

export default function Loader() {
    const seen = typeof window !== 'undefined' && sessionStorage.getItem('akclnt_loaded');
    const [show, setShow] = useState(!seen);
    const [progress, setProgress] = useState(0);
    const [leaving, setLeaving] = useState(false);
    const [time, setTime] = useState('00:00');

    useEffect(() => {
        if (!show) return;
        const updateTime = () => {
            const now = new Date();
            const hrs = String(now.getHours()).padStart(2, '0');
            const mins = String(now.getMinutes()).padStart(2, '0');
            setTime(`${hrs}:${mins}`);
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, [show]);

    useEffect(() => {
        if (!show) return;

        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduce) {
            sessionStorage.setItem('akclnt_loaded', '1');
            setShow(false);
            return;
        }

        let raf;
        const start = performance.now();
        const duration = 3000;

        const tick = (now) => {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setProgress(Math.round(eased * 100));
            if (t < 1) {
                raf = requestAnimationFrame(tick);
            } else {
                setLeaving(true);
                setTimeout(() => {
                    sessionStorage.setItem('akclnt_loaded', '1');
                    setShow(false);
                }, 600);
            }
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [show]);

    if (!show) return null;

    // Watch hands angles
    const now = new Date();
    const hrs = now.getHours() % 12;
    const mins = now.getMinutes();
    const secs = now.getSeconds();
    const hourDeg = ((hrs + mins / 60) / 12) * 360;
    const minDeg = ((mins + secs / 60) / 60) * 360;
    const secDeg = (secs / 60) * 360;

    return (
        <div
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
            style={{
                background: '#06070C',
                opacity: leaving ? 0 : 1,
                transition: 'opacity 0.7s ease',
            }}
            aria-hidden="true"
        >
            {/* Background aurora */}
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-3xl opacity-20"
                     style={{ background: 'radial-gradient(circle, rgba(91,95,239,0.15), transparent 70%)' }} />
            </div>

            {/* ===== LEFT ROBOT ===== */}
            <div 
                className="absolute left-[5%] lg:left-[12%] top-1/2 -translate-y-1/2"
                style={{
                    opacity: progress > 10 ? 1 : 0,
                    transition: 'opacity 0.5s ease',
                    animation: 'floatRobot 4s ease-in-out infinite'
                }}
            >
                <div className="relative">
                    {/* Robot Body */}
                    <div className="relative w-24 h-32 md:w-32 md:h-40">
                        {/* Base */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-6 md:w-28 md:h-8 rounded-lg"
                             style={{
                                 background: 'linear-gradient(180deg, rgba(40,45,60,0.9), rgba(20,25,40,0.95))',
                                 border: '1px solid rgba(91,95,239,0.15)',
                                 boxShadow: '0 4px 30px rgba(0,0,0,0.5)'
                             }} />
                        
                        {/* Body */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-16 h-20 md:w-24 md:h-28 rounded-xl"
                             style={{
                                 background: 'linear-gradient(180deg, rgba(60,65,85,0.9), rgba(30,35,50,0.95))',
                                 border: '1px solid rgba(91,95,239,0.1)',
                                 boxShadow: 'inset 0 0 30px rgba(91,95,239,0.05)'
                             }}>
                            {/* Body details */}
                            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-8 md:w-12 md:h-12 rounded-full"
                                 style={{
                                     background: 'radial-gradient(circle at 40% 30%, rgba(91,95,239,0.2), transparent)',
                                     border: '1px solid rgba(91,95,239,0.05)'
                                 }} />
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-white/5" />
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-white/5" />
                        </div>
                        
                        {/* Head */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full"
                             style={{
                                 background: 'radial-gradient(circle at 40% 30%, rgba(80,85,105,0.8), rgba(30,35,50,0.95))',
                                 border: '1px solid rgba(91,95,239,0.15)',
                                 boxShadow: '0 0 30px rgba(91,95,239,0.1)'
                             }}>
                            {/* Eye - glowing */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 rounded-full"
                                 style={{
                                     background: 'radial-gradient(circle, rgba(0,168,150,0.9), rgba(0,168,150,0.2))',
                                     boxShadow: '0 0 20px rgba(0,168,150,0.3)',
                                     animation: 'blinkEye 3s ease-in-out infinite'
                                 }} />
                        </div>

                        {/* ARM - holding board */}
                        <div className="absolute -right-8 md:-right-12 top-1/2 -translate-y-1/2"
                             style={{
                                 animation: 'armSwing 2s ease-in-out infinite'
                             }}>
                            <div className="relative">
                                {/* Arm */}
                                <div className="w-8 h-16 md:w-12 md:h-20 rounded-full"
                                     style={{
                                         background: 'linear-gradient(90deg, rgba(50,55,75,0.9), rgba(70,75,95,0.9))',
                                         border: '1px solid rgba(91,95,239,0.1)'
                                     }} />
                                
                                {/* Welcome Board */}
                                <div className="absolute -right-6 md:-right-8 top-1/2 -translate-y-1/2"
                                     style={{
                                         animation: 'boardFloat 3s ease-in-out infinite'
                                     }}>
                                    <div className="relative">
                                        {/* Board */}
                                        <div className="w-20 h-14 md:w-28 md:h-20 rounded-lg p-2"
                                             style={{
                                                 background: 'linear-gradient(135deg, rgba(91,95,239,0.15), rgba(139,123,247,0.1))',
                                                 border: '1px solid rgba(91,95,239,0.2)',
                                                 backdropFilter: 'blur(10px)',
                                                 boxShadow: '0 8px 32px rgba(91,95,239,0.15)'
                                             }}>
                                            {/* Glow effect */}
                                            <div className="absolute inset-0 rounded-lg"
                                                 style={{
                                                     background: 'radial-gradient(circle at 50% 50%, rgba(91,95,239,0.1), transparent)',
                                                     animation: 'boardGlow 2s ease-in-out infinite'
                                                 }} />
                                            
                                            {/* Welcome Text */}
                                            <div className="relative h-full flex flex-col items-center justify-center">
                                                <span className="text-[10px] md:text-xs font-mono text-white/40 tracking-widest uppercase">
                                                    Welcome
                                                </span>
                                                <span className="text-[8px] md:text-[10px] font-mono text-white/20 tracking-wider">
                                                    ✦ 2026 ✦
                                                </span>
                                            </div>
                                        </div>
                                        {/* Board handle */}
                                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-1 rounded-full bg-white/10" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Robot Label */}
                    <div className="text-center mt-4 text-[8px] md:text-[10px] font-mono text-white/20 tracking-widest uppercase">
                        UNIT-01
                    </div>
                </div>
            </div>

            {/* ===== RIGHT ROBOT ===== */}
            <div 
                className="absolute right-[5%] lg:right-[12%] top-1/2 -translate-y-1/2"
                style={{
                    opacity: progress > 10 ? 1 : 0,
                    transition: 'opacity 0.5s ease',
                    animation: 'floatRobot 4s ease-in-out 1s infinite'
                }}
            >
                <div className="relative">
                    {/* Robot Body */}
                    <div className="relative w-24 h-32 md:w-32 md:h-40">
                        {/* Base */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-6 md:w-28 md:h-8 rounded-lg"
                             style={{
                                 background: 'linear-gradient(180deg, rgba(40,45,60,0.9), rgba(20,25,40,0.95))',
                                 border: '1px solid rgba(91,95,239,0.15)',
                                 boxShadow: '0 4px 30px rgba(0,0,0,0.5)'
                             }} />
                        
                        {/* Body */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-16 h-20 md:w-24 md:h-28 rounded-xl"
                             style={{
                                 background: 'linear-gradient(180deg, rgba(60,65,85,0.9), rgba(30,35,50,0.95))',
                                 border: '1px solid rgba(91,95,239,0.1)',
                                 boxShadow: 'inset 0 0 30px rgba(91,95,239,0.05)'
                             }}>
                            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-8 md:w-12 md:h-12 rounded-full"
                                 style={{
                                     background: 'radial-gradient(circle at 40% 30%, rgba(139,123,247,0.2), transparent)',
                                     border: '1px solid rgba(139,123,247,0.05)'
                                 }} />
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-white/5" />
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-white/5" />
                        </div>
                        
                        {/* Head */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full"
                             style={{
                                 background: 'radial-gradient(circle at 40% 30%, rgba(80,85,105,0.8), rgba(30,35,50,0.95))',
                                 border: '1px solid rgba(139,123,247,0.15)',
                                 boxShadow: '0 0 30px rgba(139,123,247,0.1)'
                             }}>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 rounded-full"
                                 style={{
                                     background: 'radial-gradient(circle, rgba(139,123,247,0.9), rgba(139,123,247,0.2))',
                                     boxShadow: '0 0 20px rgba(139,123,247,0.3)',
                                     animation: 'blinkEye 3s ease-in-out 1.5s infinite'
                                 }} />
                        </div>

                        {/* ARM - holding board */}
                        <div className="absolute -left-8 md:-left-12 top-1/2 -translate-y-1/2"
                             style={{
                                 animation: 'armSwing 2s ease-in-out 1s infinite'
                             }}>
                            <div className="relative">
                                <div className="w-8 h-16 md:w-12 md:h-20 rounded-full"
                                     style={{
                                         background: 'linear-gradient(270deg, rgba(50,55,75,0.9), rgba(70,75,95,0.9))',
                                         border: '1px solid rgba(139,123,247,0.1)'
                                     }} />
                                
                                {/* Welcome Board */}
                                <div className="absolute -left-6 md:-left-8 top-1/2 -translate-y-1/2"
                                     style={{
                                         animation: 'boardFloat 3s ease-in-out 1s infinite'
                                     }}>
                                    <div className="relative">
                                        <div className="w-20 h-14 md:w-28 md:h-20 rounded-lg p-2"
                                             style={{
                                                 background: 'linear-gradient(135deg, rgba(139,123,247,0.15), rgba(91,95,239,0.1))',
                                                 border: '1px solid rgba(139,123,247,0.2)',
                                                 backdropFilter: 'blur(10px)',
                                                 boxShadow: '0 8px 32px rgba(139,123,247,0.15)'
                                             }}>
                                            <div className="absolute inset-0 rounded-lg"
                                                 style={{
                                                     background: 'radial-gradient(circle at 50% 50%, rgba(139,123,247,0.1), transparent)',
                                                     animation: 'boardGlow 2s ease-in-out 1s infinite'
                                                 }} />
                                            <div className="relative h-full flex flex-col items-center justify-center">
                                                <span className="text-[10px] md:text-xs font-mono text-white/40 tracking-widest uppercase">
                                                    To
                                                </span>
                                                <span className="text-[8px] md:text-[10px] font-mono text-white/20 tracking-wider">
                                                    ✦ AKCLNT ✦
                                                </span>
                                            </div>
                                        </div>
                                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-1 rounded-full bg-white/10" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-4 text-[8px] md:text-[10px] font-mono text-white/20 tracking-widest uppercase">
                        UNIT-02
                    </div>
                </div>
            </div>

            {/* ===== CSS 3D WATCH ===== */}
            <div className="relative z-10 flex flex-col items-center">
                <div 
                    className="relative w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80"
                    style={{
                        animation: 'floatWatch 4s ease-in-out infinite',
                        transformStyle: 'preserve-3d'
                    }}
                >
                    {/* Watch Outer Ring */}
                    <div 
                        className="absolute inset-0 rounded-full"
                        style={{
                            border: '2px solid rgba(91,95,239,0.2)',
                            boxShadow: 'inset 0 0 60px rgba(91,95,239,0.05), 0 0 60px rgba(91,95,239,0.05)',
                            background: 'radial-gradient(circle at 40% 35%, rgba(255,255,255,0.03), rgba(91,95,239,0.05) 60%, transparent)',
                            transform: 'scale(0.95) rotateX(10deg) rotateY(5deg)',
                            animation: 'rotateWatch 20s linear infinite'
                        }}
                    />

                    {/* Glow Ring */}
                    <div 
                        className="absolute inset-[-8px] rounded-full"
                        style={{
                            border: '1px solid rgba(91,95,239,0.08)',
                            boxShadow: '0 0 40px rgba(91,95,239,0.05)',
                            animation: 'pulseRing 3s ease-in-out infinite'
                        }}
                    />

                    {/* Tick Marks */}
                    <div className="absolute inset-0">
                        {Array.from({ length: 60 }).map((_, i) => {
                            const angle = (i / 60) * 360;
                            const isMain = i % 5 === 0;
                            return (
                                <div
                                    key={i}
                                    className="absolute top-0 left-1/2 -translate-x-1/2"
                                    style={{
                                        transform: `rotate(${angle}deg)`,
                                        transformOrigin: '50% 50%',
                                        height: '100%',
                                        width: '2px'
                                    }}
                                >
                                    <div
                                        className={`absolute top-2 left-1/2 -translate-x-1/2 rounded-full transition-all duration-1000`}
                                        style={{
                                            width: isMain ? '2px' : '1px',
                                            height: isMain ? '14px' : '8px',
                                            background: isMain 
                                                ? `rgba(255,255,255,${0.2 + (progress / 100) * 0.3})` 
                                                : `rgba(255,255,255,${0.05 + (progress / 100) * 0.15})`,
                                            opacity: progress > 20 + i * 0.5 ? 1 : 0,
                                            transition: `opacity 0.1s ease ${i * 0.02}s`
                                        }}
                                    />
                                </div>
                            );
                        })}
                    </div>

                    {/* Numbers */}
                    {['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'].map((num, i) => {
                        const angle = (i / 12) * 360 - 90;
                        const radius = 30;
                        return (
                            <div
                                key={num}
                                className="absolute font-mono text-xs md:text-sm font-light"
                                style={{
                                    top: `calc(50% + ${Math.sin((angle * Math.PI) / 180) * radius}px)`,
                                    left: `calc(50% + ${Math.cos((angle * Math.PI) / 180) * radius}px)`,
                                    transform: 'translate(-50%, -50%)',
                                    color: `rgba(255,255,255,${0.1 + (progress / 100) * 0.3})`,
                                    opacity: progress > 40 + i * 1.5 ? 1 : 0,
                                    transition: `opacity 0.15s ease ${i * 0.08}s`
                                }}
                            >
                                {num}
                            </div>
                        );
                    })}

                    {/* Hands */}
                    <div 
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] h-[28%] origin-bottom rounded-full"
                        style={{
                            background: 'linear-gradient(to top, rgba(91,95,239,0.8), rgba(255,255,255,0.4))',
                            transform: `rotate(${hourDeg}deg) translateY(-50%)`,
                            boxShadow: '0 0 20px rgba(91,95,239,0.2)',
                            opacity: progress > 65 ? 1 : 0,
                            transition: 'opacity 0.3s ease'
                        }}
                    />
                    <div 
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1.5px] h-[38%] origin-bottom rounded-full"
                        style={{
                            background: 'linear-gradient(to top, rgba(139,123,247,0.8), rgba(255,255,255,0.3))',
                            transform: `rotate(${minDeg}deg) translateY(-50%)`,
                            boxShadow: '0 0 15px rgba(139,123,247,0.2)',
                            opacity: progress > 65 ? 1 : 0,
                            transition: 'opacity 0.3s ease'
                        }}
                    />
                    <div 
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-[42%] origin-bottom rounded-full"
                        style={{
                            background: 'linear-gradient(to top, rgba(0,168,150,0.9), rgba(0,168,150,0.2))',
                            transform: `rotate(${secDeg}deg) translateY(-50%)`,
                            boxShadow: '0 0 30px rgba(0,168,150,0.2)',
                            opacity: progress > 80 ? 1 : 0,
                            transition: 'opacity 0.3s ease'
                        }}
                    />

                    {/* Center dot */}
                    <div 
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
                        style={{
                            background: 'radial-gradient(circle at 40% 35%, #FFFFFF, #5B5FEF)',
                            boxShadow: '0 0 30px rgba(91,95,239,0.3)',
                            opacity: progress > 65 ? 1 : 0,
                            transition: 'opacity 0.3s ease'
                        }}
                    />

                    {/* Progress Ring */}
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                        <circle
                            cx="50%"
                            cy="50%"
                            r="45%"
                            fill="none"
                            stroke="rgba(91,95,239,0.05)"
                            strokeWidth="1"
                        />
                        <circle
                            cx="50%"
                            cy="50%"
                            r="45%"
                            fill="none"
                            stroke="url(#watchGrad)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeDasharray={`${2 * Math.PI * 45}`}
                            strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                            style={{ transition: 'stroke-dashoffset 0.1s linear' }}
                        />
                        <defs>
                            <linearGradient id="watchGrad" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#8B7BF7" />
                                <stop offset="50%" stopColor="#5B5FEF" />
                                <stop offset="100%" stopColor="#00A896" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>

                {/* Logo */}
                <div 
                    className="mt-6 font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight transition-all duration-1000"
                    style={{
                        opacity: progress > 88 ? 1 : 0,
                        transform: progress > 88 ? 'scale(1)' : 'scale(0.7)',
                        transition: 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        background: 'linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0.6) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}
                >
                    akclnt<span className="text-gradient" style={{ WebkitTextFillColor: 'transparent' }}>.</span>
                </div>

                <div 
                    className="font-mono text-[10px] uppercase tracking-[0.4em] transition-all duration-700"
                    style={{
                        color: progress > 95 ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0)',
                        transform: progress > 95 ? 'translateY(0)' : 'translateY(15px)',
                        transition: 'color 0.5s ease, transform 0.5s ease'
                    }}
                >
                    {time} · System Ready
                </div>
            </div>

            {/* CSS Animations */}
            <style>{`
                @keyframes floatWatch {
                    0%, 100% { transform: translateY(0px) rotateX(5deg) rotateY(5deg); }
                    50% { transform: translateY(-8px) rotateX(5deg) rotateY(5deg); }
                }
                
                @keyframes rotateWatch {
                    0% { transform: scale(0.95) rotateX(10deg) rotateY(5deg) rotateZ(0deg); }
                    100% { transform: scale(0.95) rotateX(10deg) rotateY(5deg) rotateZ(360deg); }
                }
                
                @keyframes pulseRing {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 0.6; transform: scale(1.02); }
                }
                
                @keyframes floatRobot {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-8px); }
                }
                
                @keyframes armSwing {
                    0%, 100% { transform: rotate(0deg); }
                    50% { transform: rotate(-5deg); }
                }
                
                @keyframes boardFloat {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-4px) rotate(2deg); }
                }
                
                @keyframes boardGlow {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 0.7; }
                }
                
                @keyframes blinkEye {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    95% { opacity: 1; transform: scale(1); }
                    97% { opacity: 0.2; transform: scale(0.8); }
                    98% { opacity: 1; transform: scale(1); }
                }
            `}</style>
        </div>
    );
}