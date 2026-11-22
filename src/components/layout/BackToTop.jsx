import { useEffect, useState } from 'react';
import { scrollToSection } from '../../utils/scroll';
import { ArrowUpIcon } from '../ui/Icons';

export default function BackToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setVisible(window.scrollY > 450);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        scrollToSection('inicio');
    };

    return (
        <button
            type="button"
            className={`back-to-top ${visible ? 'visible' : ''}`}
            onClick={scrollToTop}
            aria-label="Voltar ao topo"
            title="Voltar ao topo"
            tabIndex={visible ? 0 : -1}
        >
            <ArrowUpIcon size={20} />
        </button>
    );
}
