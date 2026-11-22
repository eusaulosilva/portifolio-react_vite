import { useEffect, useState } from 'react';

export function useActiveSection(sectionIds) {
    const [activeSection, setActiveSection] = useState(sectionIds[0] || '');
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const elements = sectionIds
            .map((id) => document.getElementById(id))
            .filter(Boolean);

        if (elements.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntries = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

                if (visibleEntries.length > 0) {
                    setActiveSection(visibleEntries[0].target.id);
                }
            },
            {
                rootMargin: '-35% 0px -50% 0px',
                threshold: [0.1, 0.25, 0.5],
            }
        );

        elements.forEach((el) => observer.observe(el));

        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollTop = window.scrollY;
                    const docHeight =
                        document.documentElement.scrollHeight - window.innerHeight;
                    const progress =
                        docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
                    setScrollProgress(progress);
                    setIsScrolled(scrollTop > 24);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
        };
    }, [sectionIds]);

    return { activeSection, scrollProgress, isScrolled };
}
