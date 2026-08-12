import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useMotionPrefs } from '../../hooks/useMotionPrefs.js';

/**
 * A CTA that gently leans toward the cursor. Renders as a react-router
 * <Link> when `to` is provided, otherwise a <button>. Magnetism is
 * disabled on touch / reduced-motion.
 */
export default function MagneticButton({
    to,
    onClick,
    children,
    className = '',
    strength = 0.35,
    ...rest
}) {
    const ref = useRef(null);
    const { canHover, reduced } = useMotionPrefs();
    const enabled = canHover && !reduced;

    const handleMove = (e) => {
        if (!enabled || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * strength;
        const y = (e.clientY - rect.top - rect.height / 2) * strength;
        ref.current.style.transform = `translate(${x}px, ${y}px)`;
    };

    const reset = () => {
        if (ref.current) ref.current.style.transform = 'translate(0,0)';
    };

    const commonProps = {
        ref,
        onMouseMove: handleMove,
        onMouseLeave: reset,
        className,
        style: { transition: 'transform 0.3s cubic-bezier(0.22,1,0.36,1)' },
        ...rest,
    };

    if (to) {
        return (
            <Link to={to} {...commonProps}>
                {children}
            </Link>
        );
    }

    return (
        <button onClick={onClick} {...commonProps}>
            {children}
        </button>
    );
}
