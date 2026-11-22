import {
    additionalInfoData,
    coursesData,
    educationData,
    experienceData,
    profileData,
    resumeSkillGroups,
    socialLinks,
} from '../../data';
import {
    ExternalLinkIcon,
    GitHubIcon,
    GlobeIcon,
    LinkedInIcon,
    MailIcon,
    MapPinIcon,
    PhoneIcon,
} from '../ui/Icons';

export default function ResumeDocument({ selectedProjects }) {
    const linkedin = socialLinks.find((item) => item.id === 'linkedin');
    const github = socialLinks.find((item) => item.id === 'github');
    const visibleCourses = coursesData.filter((course) => course.featuredInResume);
    const useCompactProjects = selectedProjects.length >= 5;

    return (
        <article
            className={`resume-paper ${useCompactProjects ? 'is-dense' : ''}`}
            aria-label={`Currículo de ${profileData.fullName}`}
        >
            <div className="resume-paper-content">
                {/* Cabeçalho Editorial */}
                <header className="resume-doc-header">
                    <div className="resume-doc-identity">
                        <h1 className="resume-doc-name">{profileData.fullName}</h1>
                        <p className="resume-doc-role">{profileData.role}</p>
                    </div>

                    <ul className="resume-doc-contacts">
                        {profileData.location && (
                            <li>
                                <MapPinIcon size={12} />
                                <span>{profileData.location}</span>
                            </li>
                        )}
                        {profileData.phone && (
                            <li>
                                <PhoneIcon size={12} />
                                <a href={`tel:${profileData.phoneHref}`}>{profileData.phone}</a>
                            </li>
                        )}
                        <li>
                            <MailIcon size={12} />
                            <a href={`mailto:${profileData.resumeEmail}`}>
                                {profileData.resumeEmail}
                            </a>
                        </li>
                        <li>
                            <GlobeIcon size={12} />
                            <a
                                href={profileData.siteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {profileData.siteDisplay}
                            </a>
                        </li>
                        {linkedin && (
                            <li>
                                <LinkedInIcon size={12} />
                                <a
                                    href={linkedin.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {linkedin.href.replace(/^https?:\/\/(www\.)?/, '')}
                                </a>
                            </li>
                        )}
                        {github && (
                            <li>
                                <GitHubIcon size={12} />
                                <a
                                    href={github.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {github.display}
                                </a>
                            </li>
                        )}
                    </ul>
                </header>

                <div className="resume-header-divider" aria-hidden="true" />

                {/* Experiência Profissional */}
                <section className="resume-doc-section">
                    <h3 className="resume-section-heading">Experiência Profissional</h3>
                    <div className="resume-exp-list">
                        {experienceData.map((exp) => (
                            <div key={exp.id} className="resume-entry">
                                <div className="resume-entry-top">
                                    <div className="resume-entry-main">
                                        <h4>{exp.title}</h4>
                                        <span className="resume-entry-company">
                                            {exp.institution}
                                        </span>
                                    </div>
                                    <span
                                        className={`resume-entry-date ${exp.current ? 'is-current' : ''}`}
                                    >
                                        {exp.date.replace(' - ', ' – ')}
                                    </span>
                                </div>
                                <ul className="resume-bullets">
                                    {exp.highlights.map((bullet) => (
                                        <li key={bullet}>{bullet}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Formação Acadêmica */}
                <section className="resume-doc-section">
                    <h3 className="resume-section-heading">Formação Acadêmica</h3>
                    <div className="resume-edu-list">
                        {educationData.map((edu) => (
                            <div key={edu.id} className="resume-entry">
                                <div className="resume-entry-top">
                                    <h4>{edu.title}</h4>
                                    <span
                                        className={`resume-entry-date ${edu.current ? 'is-current' : ''}`}
                                    >
                                        {edu.date}
                                    </span>
                                </div>
                                <p className="resume-entry-org">{edu.institution}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Competências Técnicas */}
                <section className="resume-doc-section">
                    <h3 className="resume-section-heading">Competências Técnicas</h3>
                    <div className="resume-skills-table">
                        {resumeSkillGroups.map((group) => (
                            <div key={group.label} className="resume-skill-row">
                                <span className="resume-skill-cat">{group.label}</span>
                                <span className="resume-skill-values">
                                    {group.items.join('  •  ')}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Projetos em Destaque */}
                {selectedProjects.length > 0 && (
                    <section className="resume-doc-section">
                        <h3 className="resume-section-heading">Projetos em Destaque</h3>
                        <div
                            className={`resume-projects-list ${useCompactProjects ? 'is-two-col' : ''}`}
                        >
                            {selectedProjects.map((project) => {
                                const projectUrl = project.demo || project.link;
                                return (
                                    <div key={project.id} className="resume-project-item">
                                        <div className="resume-project-head">
                                            <div className="resume-project-title-wrap">
                                                <h4>{project.resumeTitle || project.title}</h4>
                                                <span className="resume-project-techs">
                                                    {project.techs.join(' · ')}
                                                </span>
                                            </div>
                                            {projectUrl && (
                                                <a
                                                    href={projectUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="resume-project-link"
                                                >
                                                    <span>{project.demo ? 'Demo' : 'GitHub'}</span>
                                                    <ExternalLinkIcon size={10} />
                                                </a>
                                            )}
                                        </div>
                                        <p className="resume-project-desc">
                                            {project.resumeDescription || project.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                )}

                {/* Cursos + Informações Adicionais */}
                <div className="resume-bottom-columns">
                    <section className="resume-doc-section">
                        <h3 className="resume-section-heading">Cursos</h3>
                        <ul className="resume-courses-list">
                            {visibleCourses.map((curso) => (
                                <li key={curso.id}>
                                    <strong>{curso.title}</strong>
                                    <span>{curso.meta}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="resume-doc-section">
                        <h3 className="resume-section-heading">Informações Adicionais</h3>
                        <ul className="resume-bullets resume-additional-list">
                            {additionalInfoData.map((info) => (
                                <li key={info.id}>
                                    <strong>{info.label}:</strong> {info.value}
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
            </div>

            {/* Rodapé da prévia de tela (na impressão o @page assume em todas as páginas) */}
            <footer className="resume-paper-footer">
                <span>{profileData.fullName}</span>
                <span>{profileData.siteDisplay}</span>
            </footer>
        </article>
    );
}
