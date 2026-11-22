import { scrollToSection } from '../../utils/scroll';
import { ExternalLinkIcon, GitHubIcon, MailIcon } from './Icons';

export default function ProjectCard({
    title,
    category,
    description,
    techs,
    link,
    img,
    demo,
    recursiveDemo,
    onRecursiveDemo,
}) {
    const handleRecursiveClick = (event) => {
        event.preventDefault();
        onRecursiveDemo?.();
    };

    return (
        <article className="card project-card">
            <div className="project-card-media">
                <img
                    src={img}
                    className="card-img-top"
                    alt={`Preview do projeto ${title}`}
                    loading="lazy"
                    decoding="async"
                />
                {category && <span className="project-category-badge">{category}</span>}
            </div>

            <div className="card-body">
                <h3 className="card-title">{title}</h3>
                <p className="card-text">{description}</p>

                <div className="tech-badges" aria-label={`Tecnologias utilizadas em ${title}`}>
                    {techs.map((tech) => (
                        <span key={tech} className="btn-skill">
                            {tech}
                        </span>
                    ))}
                </div>

                <div className="btn-card-container">
                    {link && (
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-card"
                            aria-label={`Ver código-fonte de ${title} no GitHub`}
                        >
                            <GitHubIcon size={16} />
                            <span>GitHub</span>
                        </a>
                    )}

                    {demo && recursiveDemo ? (
                        <a
                            href="/inicio"
                            onClick={handleRecursiveClick}
                            className="btn-card btn-card-outline"
                            aria-label={`Visualizar ${title} (volta ao topo da página)`}
                        >
                            <ExternalLinkIcon size={15} />
                            <span>Visualizar</span>
                        </a>
                    ) : (
                        demo && (
                            <a
                                href={demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-card btn-card-outline"
                                aria-label={`Abrir demonstração do projeto ${title}`}
                            >
                                <ExternalLinkIcon size={15} />
                                <span>Visualizar</span>
                            </a>
                        )
                    )}

                    {!link && !demo && (
                        <a
                            href="/contato"
                            onClick={(e) => scrollToSection('contato', e)}
                            className="btn-card btn-card-outline"
                            aria-label={`Solicitar detalhes sobre o projeto ${title}`}
                        >
                            <MailIcon size={15} />
                            <span>Solicitar detalhes</span>
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
}
