import React, { useRef } from 'react';
import { useMotionPrefs } from '../../hooks/useMotionPrefs.js';

/**
 * Lightweight CSS-3D tilt on pointer move. No dependencies.
 * Automatically disabled on touch devices and for reduced-motion users.
 */
export default function TiltCard({
    children,
    className = '',
    max = 10,
    glare = true,
    scale = 1.02,
    style = {},
}) {
    const ref = useRef(null);
    const glareRef = useRef(null);
    const { canHover, reduced } = useMotionPrefs();
    const enabled = canHover && !reduced;

    const handleMove = (e) => {
        if (!enabled || !ref.current) return;
        const el = ref.current;
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const rx = (0.5 - py) * max * 2;
        const ry = (px - 0.5) * max * 2;
        el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale})`;
        if (glareRef.current) {
            glareRef.current.style.opacity = '1';
            glareRef.current.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.35), transparent 55%)`;
        }
    };

    const reset = () => {
        if (!ref.current) return;
        ref.current.style.transform =
            'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)';
        if (glareRef.current) glareRef.current.style.opacity = '0';
    };

    return (
        <div
            ref={ref}
            onMouseMove={handleMove}
            onMouseLeave={reset}
            className={`relative will-change-transform ${className}`}
            style={{ transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1)', ...style }}
        >
            {children}
            {glare && enabled && (
                <div
                    ref={glareRef}
                    className="pointer-events-none absolute inset-0 rounded-[inherit]"
                    style={{ opacity: 0, transition: 'opacity 0.3s ease', mixBlendMode: 'overlay' }}
                    aria-hidden="true"
                />
            )}
        </div>
    );
}
