import React, { useState, useEffect } from 'react';

/**
 * Premium first-visit loader. Shows the brand mark with an animated
 * progress bar, then fades out. Gated by sessionStorage so it only
 * runs once per session — never artificially delays returning views.
 * Total on-screen time ~1.4s.
 */
export default function Loader() {
    const seen =
        typeof window !== 'undefined' && sessionStorage.getItem('akclnt_loaded');
    const [show, setShow] = useState(!seen);
    const [progress, setProgress] = useState(0);
    const [leaving, setLeaving] = useState(false);

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
        const duration = 1200;

        const tick = (now) => {
            const t = Math.min((now - start) / duration, 1);
            // easeOutCubic
            const eased = 1 - Math.pow(1 - t, 3);
            setProgress(Math.round(eased * 100));
            if (t < 1) {
                raf = requestAnimationFrame(tick);
            } else {
                setLeaving(true);
                setTimeout(() => {
                    sessionStorage.setItem('akclnt_loaded', '1');
                    setShow(false);
                }, 500);
            }
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [show]);

    if (!show) return null;

    return (
        <div
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
            style={{
                background: 'var(--color-void)',
                opacity: leaving ? 0 : 1,
                transition: 'opacity 0.5s ease',
            }}
            aria-hidden="true"
        >
            {/* ambient aurora */}
            <div
                className="aurora absolute w-[60vw] h-[60vw] rounded-full blur-3xl"
                style={{ background: 'radial-gradient(circle, rgba(91,95,239,0.35), transparent 60%)' }}
            />
            <div
                className="aurora absolute w-[45vw] h-[45vw] rounded-full blur-3xl"
                style={{ background: 'radial-gradient(circle, rgba(0,168,150,0.25), transparent 60%)', animationDelay: '-8s' }}
            />

            <div className="relative flex flex-col items-center">
                <div
                    className="font-display text-5xl md:text-6xl font-bold tracking-tight text-white"
                    style={{ animation: 'fadeInUp 0.6s ease' }}
                >
                    akclnt<span className="text-gradient">.</span>
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/40 mt-4">
                    Building the web, deliberately
                </div>

                <div className="mt-8 w-56 h-[3px] rounded-full bg-white/10 overflow-hidden">
                    <div
                        className="h-full rounded-full"
                        style={{
                            width: `${progress}%`,
                            background: 'linear-gradient(90deg, #8B7BF7, #5B5FEF, #00A896)',
                            transition: 'width 0.1s linear',
                        }}
                    />
                </div>
                <div className="font-mono text-[10px] text-white/30 mt-3 tabular-nums">
                    {progress}%
                </div>
            </div>
        </div>
    );
}
