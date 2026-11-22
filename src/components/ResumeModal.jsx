import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import '../styles/resume-modal.css';
import {
    additionalInfoData,
    coursesData,
    educationData,
    experienceData,
    profileData,
    projectsData,
    resumeSkillGroups,
    socialLinks,
} from '../data/content';
import {
    CheckIcon,
    CloseIcon,
    DownloadIcon,
    ExternalLinkIcon,
    GitHubIcon,
    GlobeIcon,
    LinkedInIcon,
    MailIcon,
    MapPinIcon,
    PhoneIcon,
} from './Icons';

const DEFAULT_PROJECT_IDS = projectsData
    .filter((project) => project.featuredInResume)
    .map((project) => project.id);

const ALL_PROJECT_IDS = projectsData.map((project) => project.id);

export default function ResumeModal({ isOpen, onClose }) {
    const [selectedProjectIds, setSelectedProjectIds] = useState(DEFAULT_PROJECT_IDS);
    const [isPickerOpen, setIsPickerOpen] = useState(true);

    const closeButtonRef = useRef(null);
    const previousFocusRef = useRef(null);

    useEffect(() => {
        if (!isOpen) return;

        previousFocusRef.current = document.activeElement;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        closeButtonRef.current?.focus();

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', handleKeyDown);
            if (previousFocusRef.current instanceof HTMLElement) {
                previousFocusRef.current.focus();
            }
        };
    }, [isOpen, onClose]);

    const selectedProjects = useMemo(
        () => projectsData.filter((project) => selectedProjectIds.includes(project.id)),
        [selectedProjectIds]
    );

    if (!isOpen) return null;

    const linkedin = socialLinks.find((item) => item.id === 'linkedin');
    const github = socialLinks.find((item) => item.id === 'github');
    const visibleCourses = coursesData.filter((course) => course.featuredInResume);

    const isAllSelected = selectedProjectIds.length === ALL_PROJECT_IDS.length;
    const isDefaultSelected =
        selectedProjectIds.length === DEFAULT_PROJECT_IDS.length &&
        DEFAULT_PROJECT_IDS.every((id) => selectedProjectIds.includes(id));

    const toggleProject = (projectId) => {
        setSelectedProjectIds((prev) =>
            prev.includes(projectId)
                ? prev.filter((id) => id !== projectId)
                : [...prev, projectId]
        );
    };

    const handleDownloadPdf = () => {
        const originalTitle = document.title;
        const safeName = profileData.fullName
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/\s+/g, '-');

        document.title = `Curriculo-${safeName}`;

        const restoreTitle = () => {
            document.title = originalTitle;
            window.removeEventListener('afterprint', restoreTitle);
        };

        window.addEventListener('afterprint', restoreTitle);
        window.print();

        setTimeout(() => {
            document.title = originalTitle;
        }, 1500);
    };

    const useCompactProjects = selectedProjects.length >= 5;

    const modalContent = (
        <div
            className="resume-modal-overlay"
            role="dialog"
            aria-modal="true"
            aria-labelledby="resume-modal-title"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="resume-modal-shell">
                <div className="resume-modal-toolbar">
                    <div className="resume-modal-toolbar-info">
                        <h2 id="resume-modal-title">Currículo — {profileData.name}</h2>
                        <span className="resume-modal-hint">
                            Folha A4 padronizada • Compatível com ATS • Atualizado automaticamente pelo portfólio
                        </span>
                    </div>

                    <div className="resume-modal-actions">
                        <button
                            type="button"
                            className={`resume-picker-toggle ${isPickerOpen ? 'is-open' : ''}`}
                            onClick={() => setIsPickerOpen((prev) => !prev)}
                            aria-expanded={isPickerOpen}
                            aria-controls="resume-project-picker"
                        >
                            <span>
                                Projetos ({selectedProjects.length}/{projectsData.length})
                            </span>
                        </button>

                        <button
                            type="button"
                            className="resume-btn-print"
                            onClick={handleDownloadPdf}
                        >
                            <DownloadIcon size={16} />
                            <span>Salvar em PDF</span>
                        </button>

                        <button
                            ref={closeButtonRef}
                            type="button"
                            className="resume-btn-close"
                            onClick={onClose}
                            aria-label="Fechar pré-visualização do currículo"
                        >
                            <CloseIcon size={20} />
                        </button>
                    </div>
                </div>

                {/* Seletor de Projetos do Currículo (oculto na impressão) */}
                {isPickerOpen && (
                    <div id="resume-project-picker" className="resume-project-picker">
                        <div className="resume-picker-presets">
                            <span className="resume-picker-label">Projetos no PDF:</span>
                            <button
                                type="button"
                                className={`resume-preset-btn ${isDefaultSelected ? 'active' : ''}`}
                                onClick={() => setSelectedProjectIds(DEFAULT_PROJECT_IDS)}
                            >
                                Destaques ({DEFAULT_PROJECT_IDS.length})
                            </button>
                            <button
                                type="button"
                                className={`resume-preset-btn ${isAllSelected ? 'active' : ''}`}
                                onClick={() => setSelectedProjectIds(ALL_PROJECT_IDS)}
                            >
                                Todos ({ALL_PROJECT_IDS.length})
                            </button>
                            {selectedProjectIds.length > 0 && (
                                <button
                                    type="button"
                                    className="resume-preset-btn resume-preset-clear"
                                    onClick={() => setSelectedProjectIds([])}
                                >
                                    Limpar
                                </button>
                            )}
                        </div>

                        <div
                            className="resume-picker-chips"
                            role="group"
                            aria-label="Selecionar projetos exibidos no currículo"
                        >
                            {projectsData.map((project) => {
                                const isSelected = selectedProjectIds.includes(project.id);
                                return (
                                    <button
                                        key={project.id}
                                        type="button"
                                        className={`resume-picker-chip ${isSelected ? 'selected' : ''}`}
                                        onClick={() => toggleProject(project.id)}
                                        aria-pressed={isSelected}
                                    >
                                        <span className="resume-chip-check" aria-hidden="true">
                                            {isSelected && <CheckIcon size={11} />}
                                        </span>
                                        <span>{project.title}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                <div className="resume-modal-body">
                    <article
                        className={`resume-paper ${useCompactProjects ? 'is-dense' : ''}`}
                        aria-label={`Currículo de ${profileData.fullName}`}
                    >
                        <div className="resume-paper-content">
                            {/* Cabeçalho Editorial */}
                            <header className="resume-doc-header">
                                <div className="resume-doc-identity">
                                    <h1 className="resume-doc-name">
                                        {profileData.fullName}
                                    </h1>
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
                                            <a href={`tel:${profileData.phoneHref}`}>
                                                {profileData.phone}
                                            </a>
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
                                <h3 className="resume-section-heading">
                                    Experiência Profissional
                                </h3>
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
                                <h3 className="resume-section-heading">
                                    Formação Acadêmica
                                </h3>
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
                                            <p className="resume-entry-org">
                                                {edu.institution}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Competências Técnicas */}
                            <section className="resume-doc-section">
                                <h3 className="resume-section-heading">
                                    Competências Técnicas
                                </h3>
                                <div className="resume-skills-table">
                                    {resumeSkillGroups.map((group) => (
                                        <div key={group.label} className="resume-skill-row">
                                            <span className="resume-skill-cat">
                                                {group.label}
                                            </span>
                                            <span className="resume-skill-values">
                                                {group.items.join('  •  ')}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Projetos em Destaque (dinâmico conforme seleção) */}
                            {selectedProjects.length > 0 && (
                                <section className="resume-doc-section">
                                    <h3 className="resume-section-heading">
                                        Projetos em Destaque
                                    </h3>
                                    <div
                                        className={`resume-projects-list ${useCompactProjects ? 'is-two-col' : ''}`}
                                    >
                                        {selectedProjects.map((project) => {
                                            const projectUrl =
                                                project.demo || project.link;
                                            return (
                                                <div
                                                    key={project.id}
                                                    className="resume-project-item"
                                                >
                                                    <div className="resume-project-head">
                                                        <div className="resume-project-title-wrap">
                                                            <h4>
                                                                {project.resumeTitle ||
                                                                    project.title}
                                                            </h4>
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
                                                                <span>
                                                                    {project.demo
                                                                        ? 'Demo'
                                                                        : 'GitHub'}
                                                                </span>
                                                                <ExternalLinkIcon size={10} />
                                                            </a>
                                                        )}
                                                    </div>
                                                    <p className="resume-project-desc">
                                                        {project.resumeDescription ||
                                                            project.description}
                                                    </p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </section>
                            )}

                            {/* Rodapé em 2 colunas: Cursos + Informações Adicionais */}
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
                                    <h3 className="resume-section-heading">
                                        Informações Adicionais
                                    </h3>
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

                        {/* Rodapé exibido na prévia de tela (na impressão o @page assume em todas as páginas) */}
                        <footer className="resume-paper-footer">
                            <span>{profileData.fullName}</span>
                            <span>{profileData.siteDisplay}</span>
                        </footer>
                    </article>
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}
