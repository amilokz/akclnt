import { useState, useEffect } from 'react';

/**
 * Returns { reduced, canHover } — used to gate expensive parallax/3D
 * so touch devices and reduced-motion users get a calm experience.
 */
export function useMotionPrefs() {
    const [prefs, setPrefs] = useState({ reduced: false, canHover: true });

    useEffect(() => {
        const reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        const hoverQuery = window.matchMedia('(hover: hover) and (pointer: fine)');

        const update = () =>
            setPrefs({ reduced: reduceQuery.matches, canHover: hoverQuery.matches });

        update();
        reduceQuery.addEventListener('change', update);
        hoverQuery.addEventListener('change', update);
        return () => {
            reduceQuery.removeEventListener('change', update);
            hoverQuery.removeEventListener('change', update);
        };
    }, []);

    return prefs;
}
