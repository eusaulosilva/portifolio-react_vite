import { useEffect, useRef, useState } from 'react';

const prefersReducedMotion = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function Reveal({ children, className = '', delay = 0 }) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(prefersReducedMotion);

    useEffect(() => {
        if (isVisible) return;
        const element = ref.current;
        if (!element || typeof IntersectionObserver === 'undefined') return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [isVisible]);

    return (
        <div
            ref={ref}
            className={`reveal ${isVisible ? 'show' : ''} ${className}`.trim()}
            style={delay ? { transitionDelay: `${delay}ms` } : undefined}
        >
            {children}
        </div>
    );
}
