import { profileData, socialLinks } from '../data/content';
import { ChevronDownIcon, SocialIcon } from '../components/Icons';

const Home = ({ onOpenResume }) => {
    return (
        <section id="inicio" className="hero-section container-fluid" aria-label="Apresentação">
            <div className="hero-grid-pattern" aria-hidden="true" />

            <div className="container-conteudo">
                <span className="hero-eyebrow">
                    <span className="hero-eyebrow-dot" aria-hidden="true" />
                    {profileData.eyebrow}
                </span>

                <h1 className="container-conteudo-titulo">{profileData.name}</h1>
                <p className="titulo-destaque">{profileData.role}</p>

                <div className="hero-cta-group">
                    <a href="#projetos" className="hero-btn-primary">
                        Ver Projetos
                    </a>
                    <button
                        type="button"
                        className="hero-btn-secondary"
                        onClick={onOpenResume}
                    >
                        Visualizar Currículo
                    </button>
                </div>

                <div className="container-conteudo-botao" aria-label="Links sociais e currículo">
                    {socialLinks.map((social) =>
                        social.action === 'open-resume' ? (
                            <button
                                key={social.id}
                                type="button"
                                className="container-conteudo-botao-link"
                                onClick={onOpenResume}
                                aria-label={social.label}
                                title={social.label}
                            >
                                <SocialIcon id={social.id} size={20} />
                            </button>
                        ) : (
                            <a
                                key={social.id}
                                className="container-conteudo-botao-link"
                                href={social.href}
                                target={social.external ? '_blank' : undefined}
                                rel={social.external ? 'noopener noreferrer' : undefined}
                                aria-label={social.label}
                                title={social.label}
                            >
                                <SocialIcon id={social.id} size={20} />
                            </a>
                        )
                    )}
                </div>
            </div>

            <a
                href="#sobre"
                className="scroll-indicator"
                aria-label="Rolar para a seção Sobre mim"
            >
                <ChevronDownIcon size={22} />
            </a>
        </section>
    );
};

export default Home;
