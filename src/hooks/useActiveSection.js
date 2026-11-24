import { useEffect, useRef, useState } from 'react';
import {
    clearProgrammaticScrolling,
    getPathForSection,
    isCvPath,
    isProgrammaticScrolling,
} from '../utils/scroll';

export function useActiveSection(sectionIds) {
    const [activeSection, setActiveSection] = useState(sectionIds[0] || '');
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);
    const activeSectionRef = useRef(sectionIds[0] || '');

    useEffect(() => {
        const elements = sectionIds
            .map((id) => document.getElementById(id))
            .filter(Boolean);

        if (elements.length === 0) return;

        const syncUrl = (nextSection) => {
            if (isProgrammaticScrolling() || isCvPath(window.location.pathname)) {
                return;
            }

            const nextPath =
                nextSection === 'inicio' && window.location.pathname === '/'
                    ? '/'
                    : getPathForSection(nextSection);

            if (window.location.pathname !== nextPath || window.location.hash) {
                window.history.replaceState({ sectionId: nextSection }, '', nextPath);
            }
        };

        const resolveActiveSection = () => {
            const scrollTop = window.scrollY;
            const viewportHeight = window.innerHeight;
            const totalHeight = document.documentElement.scrollHeight;

            if (scrollTop <= 10) {
                return elements[0].id;
            }

            if (scrollTop + viewportHeight >= totalHeight - 4) {
                return elements[elements.length - 1].id;
            }

            const referenceY = Math.max(120, Math.min(viewportHeight * 0.35, 280));
            let currentId = elements[0].id;

            for (const el of elements) {
                if (el.getBoundingClientRect().top <= referenceY) {
                    currentId = el.id;
                } else {
                    break;
                }
            }

            return currentId;
        };

        let ticking = false;
        const update = (shouldSyncUrl = true) => {
            const scrollTop = window.scrollY;
            const docHeight =
                document.documentElement.scrollHeight - window.innerHeight;
            const progress =
                docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;

            setScrollProgress(progress);
            setIsScrolled(scrollTop > 24);

            if (!isProgrammaticScrolling()) {
                const nextSection = resolveActiveSection();
                if (nextSection !== activeSectionRef.current) {
                    activeSectionRef.current = nextSection;
                    setActiveSection(nextSection);
                }

                if (shouldSyncUrl) {
                    syncUrl(nextSection);
                }
            }

            ticking = false;
        };

        const scheduleUpdate = () => {
            if (!ticking) {
                ticking = true;
                window.requestAnimationFrame(() => update(true));
            }
        };

        const handleNavigate = (event) => {
            const nextSection = event.detail?.sectionId;
            if (nextSection && sectionIds.includes(nextSection)) {
                activeSectionRef.current = nextSection;
                setActiveSection(nextSection);
            }
        };

        const handleUserScrollIntent = () => {
            clearProgrammaticScrolling();
        };

        update(false);

        window.addEventListener('scroll', scheduleUpdate, { passive: true });
        window.addEventListener('resize', scheduleUpdate, { passive: true });
        window.addEventListener('portfolio:navigate', handleNavigate);
        window.addEventListener('wheel', handleUserScrollIntent, { passive: true });
        window.addEventListener('touchstart', handleUserScrollIntent, { passive: true });
        return () => {
            window.removeEventListener('scroll', scheduleUpdate);
            window.removeEventListener('resize', scheduleUpdate);
            window.removeEventListener('portfolio:navigate', handleNavigate);
            window.removeEventListener('wheel', handleUserScrollIntent);
            window.removeEventListener('touchstart', handleUserScrollIntent);
        };
    }, [sectionIds]);

    return { activeSection, scrollProgress, isScrolled };
}
