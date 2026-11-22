import { navLinks, profileData, socialLinks } from '../../data';
import { scrollToSection } from '../../utils/scroll';
import { SocialIcon } from '../ui/Icons';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const footerSocials = socialLinks.filter((item) => item.showInFooter);
    const footerNav = navLinks.filter((item) => item.id !== 'inicio');

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
                <p>
                    &copy; {currentYear} {profileData.name}. Todos os direitos reservados.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
