import { useEffect, useMemo, useState } from 'react';
import { navLinks, profileData } from '../../data';
import { useActiveSection } from '../../hooks/useActiveSection';
import { scrollToSection } from '../../utils/scroll';

const Navbar = () => {
    const [isNavExpanded, setIsNavExpanded] = useState(false);
    const sectionIds = useMemo(() => navLinks.map((item) => item.id), []);
    const { activeSection, scrollProgress, isScrolled } = useActiveSection(sectionIds);

    const closeMenu = () => setIsNavExpanded(false);

    const handleNavigate = (sectionId, event) => {
        scrollToSection(sectionId, event);
        closeMenu();
    };

    useEffect(() => {
        if (!isNavExpanded) return;

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setIsNavExpanded(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isNavExpanded]);

    return (
        <header>
            <nav
                className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}
                aria-label="Navegação principal"
            >
                <div className="navbar-inner">
                    <a
                        className="navbar-brand-custom"
                        href="/inicio"
                        onClick={(e) => handleNavigate('inicio', e)}
                        aria-label={`${profileData.name} - Voltar ao início`}
                    >
                        {profileData.brand}
                        <span>{profileData.brandAccent}</span>
                    </a>

                    <button
                        className="navbar-toggler"
                        type="button"
                        onClick={() => setIsNavExpanded((prev) => !prev)}
                        aria-controls="navbarNav"
                        aria-expanded={isNavExpanded}
                        aria-label={
                            isNavExpanded
                                ? 'Fechar menu de navegação'
                                : 'Abrir menu de navegação'
                        }
                    >
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div
                        className={`navbar-collapse ${isNavExpanded ? 'show' : ''}`}
                        id="navbarNav"
                    >
                        <ul className="navbar-nav">
                            {navLinks.map((link) => {
                                const isActive = activeSection === link.id;
                                return (
                                    <li className="nav-item" key={link.id}>
                                        <a
                                            className={`nav-link ${isActive ? 'active' : ''}`}
                                            href={link.path}
                                            onClick={(e) => handleNavigate(link.id, e)}
                                            aria-current={isActive ? 'location' : undefined}
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>

                <div
                    className="scroll-progress-bar"
                    style={{ width: `${scrollProgress}%` }}
                    aria-hidden="true"
                />
            </nav>

            {isNavExpanded && (
                <div
                    className="navbar-backdrop"
                    onClick={closeMenu}
                    aria-hidden="true"
                />
            )}
        </header>
    );
};

export default Navbar;
