import { useRef } from 'react';
import { navLinks, profileData, socialLinks } from '../../data';
import { scrollToSection } from '../../utils/scroll';
import { SocialIcon } from '../ui/Icons';

const Footer = ({ onOpenBuilder }) => {
    const currentYear = new Date().getFullYear();
    const footerSocials = socialLinks.filter((item) => item.showInFooter);
    const footerNav = navLinks.filter((item) => item.id !== 'inicio');
    const tapTrackerRef = useRef({ count: 0, lastAt: 0 });

    // Acesso discreto ao /builder (3 toques/cliques rápidos no copyright, invisível para recrutadores)
    const handleSecretTrigger = () => {
        if (!onOpenBuilder) return;
        const now = Date.now();
        if (now - tapTrackerRef.current.lastAt > 900) {
            tapTrackerRef.current = { count: 1, lastAt: now };
            return;
        }
        const nextCount = tapTrackerRef.current.count + 1;
        if (nextCount >= 3) {
            tapTrackerRef.current = { count: 0, lastAt: 0 };
            onOpenBuilder();
        } else {
            tapTrackerRef.current = { count: nextCount, lastAt: now };
        }
    };

    return (
        <footer className="footer-wrapper">
            <div className="footer-container">
                <div className="footer-brand">
                    <a
                        href="/inicio"
                        className="footer-brand-logo"
                        onClick={(e) => scrollToSection('inicio', e)}
                    >
                        {profileData.brand}
                        <span>{profileData.brandAccent}</span>
                    </a>
                    <p>{profileData.role}</p>
                </div>

                <nav className="footer-nav-links" aria-label="Navegação do rodapé">
                    {footerNav.map((link) => (
                        <a
                            key={link.id}
                            href={link.path}
                            onClick={(e) => scrollToSection(link.id, e)}
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                <div className="footer-social-group">
                    {footerSocials.map((social) => (
                        <a
                            key={social.id}
                            href={social.href}
                            target={social.external ? '_blank' : undefined}
                            rel={social.external ? 'noopener noreferrer' : undefined}
                            className="footer-social-icon"
                            aria-label={social.label}
                            title={social.label}
                        >
                            <SocialIcon id={social.id} size={16} />
                        </a>
                    ))}
                </div>
            </div>

            <div className="footer-bottom">
                <p onClick={handleSecretTrigger}>
                    &copy; {currentYear} {profileData.name}. Todos os direitos reservados.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
