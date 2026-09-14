import React, { useEffect, useState } from 'react';

// Animates a number from 0 to target. Handles suffixes like "24h", "100%".
export default function CountUp({ value, duration = 1800 }) {
    const match = String(value).match(/^(\d+)(.*)$/);
    const target = match ? parseInt(match[1], 10) : 0;
    const suffix = match ? match[2] : '';
    const [n, setN] = useState(0);

    useEffect(() => {
        let raf;
        const start = performance.now() + 200;
        const tick = (now) => {
            const p = Math.min(Math.max(now - start, 0) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setN(Math.round(eased * target));
            if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [target, duration]);

    return <>{n}{suffix}</>;
}