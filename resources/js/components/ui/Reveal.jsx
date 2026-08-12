import React, { useRef, useState, useEffect } from 'react';

/**
 * Scroll-triggered reveal. Supports direction and a subtle offset.
 * Respects prefers-reduced-motion by rendering content immediately.
 */
export default function Reveal({
    children,
    delay = 0,
    className = '',
    direction = 'up',
    distance = 24,
    as: Tag = 'div',
}) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    const [reduced, setReduced] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        setReduced(mq.matches);
        if (mq.matches) {
            setVisible(true);
            return;
        }
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.12, rootMargin: '-40px' }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    const offset = {
        up: `translateY(${distance}px)`,
        down: `translateY(-${distance}px)`,
        left: `translateX(${distance}px)`,
        right: `translateX(-${distance}px)`,
        none: 'none',
    }[direction];

    return (
        <Tag
            ref={ref}
            className={className}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'none' : offset,
                transition: reduced
                    ? 'none'
                    : `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
            }}
        >
            {children}
        </Tag>
    );
}
