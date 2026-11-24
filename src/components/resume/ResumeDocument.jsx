import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
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

function ProjectCardBlock({ project }) {
    return (
        <div className="resume-project-item">
            <div className="resume-project-head">
                <div className="resume-project-title-wrap">
                    <h3>{project.resumeTitle || project.title}</h3>
                    <span className="resume-project-techs">
                        {project.techs.join(' · ')}
                    </span>
                </div>

                {(project.demo || project.link) && (
                    <div className="resume-project-links">
                        {project.demo && (
                            <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="resume-project-link"
                            >
                                <span>Demo</span>
                                <ExternalLinkIcon size={10} />
                            </a>
                        )}
                        {project.demo && project.link && (
                            <span className="resume-project-link-sep" aria-hidden="true">
                                ·
                            </span>
                        )}
                        {project.link && (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="resume-project-link"
                            >
                                <span>Código</span>
                                <ExternalLinkIcon size={10} />
                            </a>
                        )}
                    </div>
                )}
            </div>
            <p className="resume-project-desc">
                {project.resumeDescription || project.description}
            </p>
        </div>
    );
}

export default function ResumeDocument({
    selectedProjects,
    roleTitle = profileData.role,
    skillGroups = resumeSkillGroups,
    theme = 'purple',
    density = 'comfortable',
    includeAllCourses = false,
    showAdditionalInfo = true,
}) {
    const linkedin = socialLinks.find((item) => item.id === 'linkedin');
    const github = socialLinks.find((item) => item.id === 'github');
    const visibleCourses = useMemo(
        () =>
            includeAllCourses
                ? coursesData
                : coursesData.filter((course) => course.featuredInResume),
        [includeAllCourses]
    );

    const isDense = density === 'compact' || selectedProjects.length >= 5;
    const useTwoColProjects =
        selectedProjects.length >= 5 ||
        (density === 'compact' && selectedProjects.length >= 4);

    // Blocos atômicos ordenados (títulos de seção ficam sempre agrupados ao 1º item para evitar títulos órfãos)
    const blocks = useMemo(() => {
        const list = [];

        // 1. Cabeçalho editorial
        list.push({
            id: 'header',
            kind: 'header',
            node: (
                <>
                    <header className="resume-doc-header">
                        <div className="resume-doc-identity">
                            <h1 className="resume-doc-name">{profileData.fullName}</h1>
                            <p className="resume-doc-role">{roleTitle}</p>
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
                </>
            ),
        });

        // 2. Experiência Profissional (título + 1ª experiência juntos, depois cada item)
        experienceData.forEach((exp, idx) => {
            const entryNode = (
                <div className="resume-entry">
                    <div className="resume-entry-top">
                        <div className="resume-entry-main">
                            <h3>{exp.title}</h3>
                            <span className="resume-entry-company">{exp.institution}</span>
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
            );

            list.push({
                id: `exp-${exp.id}`,
                kind: idx === 0 ? 'section-start' : 'exp-item',
                node:
                    idx === 0 ? (
                        <div className="resume-flow-section-start">
                            <h2 className="resume-section-heading">Experiência Profissional</h2>
                            {entryNode}
                        </div>
                    ) : (
                        <div className="resume-flow-exp-item">{entryNode}</div>
                    ),
            });
        });

        // 3. Formação Acadêmica
        educationData.forEach((edu, idx) => {
            const eduNode = (
                <div className="resume-entry">
                    <div className="resume-entry-top">
                        <h3>{edu.title}</h3>
                        <span
                            className={`resume-entry-date ${edu.current ? 'is-current' : ''}`}
                        >
                            {edu.date}
                        </span>
                    </div>
                    <p className="resume-entry-org">{edu.institution}</p>
                </div>
            );

            list.push({
                id: `edu-${edu.id}`,
                kind: idx === 0 ? 'section-start' : 'edu-item',
                node:
                    idx === 0 ? (
                        <div className="resume-flow-section-start">
                            <h2 className="resume-section-heading">Formação Acadêmica</h2>
                            {eduNode}
                        </div>
                    ) : (
                        <div className="resume-flow-edu-item">{eduNode}</div>
                    ),
            });
        });

        // 4. Competências Técnicas
        list.push({
            id: 'skills',
            kind: 'section-start',
            node: (
                <section className="resume-flow-section-start">
                    <h2 className="resume-section-heading">Competências Técnicas</h2>
                    <div className="resume-skills-table">
                        {skillGroups.map((group) => (
                            <div key={group.label} className="resume-skill-row">
                                <span className="resume-skill-cat">{group.label}</span>
                                <span className="resume-skill-values">
                                    {group.items.join('  •  ')}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            ),
        });

        // 5. Projetos em Destaque (em linhas individuais ou pares quando 2 colunas)
        if (selectedProjects.length > 0) {
            const projectRows = [];
            if (useTwoColProjects) {
                for (let i = 0; i < selectedProjects.length; i += 2) {
                    projectRows.push(selectedProjects.slice(i, i + 2));
                }
            } else {
                selectedProjects.forEach((p) => projectRows.push([p]));
            }

            projectRows.forEach((row, idx) => {
                const rowNode = (
                    <div
                        className={`resume-projects-row ${useTwoColProjects ? 'is-two-col' : ''}`}
                    >
                        {row.map((project) => (
                            <ProjectCardBlock key={project.id} project={project} />
                        ))}
                    </div>
                );

                list.push({
                    id: `proj-row-${row.map((p) => p.id).join('-')}`,
                    kind: idx === 0 ? 'section-start' : 'proj-item',
                    node:
                        idx === 0 ? (
                            <div className="resume-flow-section-start">
                                <h2 className="resume-section-heading">Projetos em Destaque</h2>
                                {rowNode}
                            </div>
                        ) : (
                            <div className="resume-flow-proj-item">{rowNode}</div>
                        ),
                });
            });
        }

        // 6. Cursos + Informações Adicionais
        list.push({
            id: 'bottom-columns',
            kind: 'section-start',
            node: (
                <div
                    className={`resume-flow-section-start resume-bottom-columns ${showAdditionalInfo ? '' : 'is-single-col'}`}
                >
                    <section className="resume-doc-section">
                        <h2 className="resume-section-heading">Cursos</h2>
                        <ul className="resume-courses-list">
                            {visibleCourses.map((curso) => (
                                <li key={curso.id}>
                                    <strong>{curso.title}</strong>
                                    <span>{curso.meta}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {showAdditionalInfo && (
                        <section className="resume-doc-section">
                            <h2 className="resume-section-heading">Informações Adicionais</h2>
                            <ul className="resume-bullets resume-additional-list">
                                {additionalInfoData.map((info) => (
                                    <li key={info.id}>
                                        <strong>{info.label}:</strong> {info.value}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                </div>
            ),
        });

        return list;
    }, [
        roleTitle,
        linkedin,
        github,
        skillGroups,
        selectedProjects,
        useTwoColProjects,
        visibleCourses,
        showAdditionalInfo,
    ]);

    const measureContainerRef = useRef(null);
    const rulerRef = useRef(null);
    const [pageSplits, setPageSplits] = useState(null);

    const computePages = () => {
        const container = measureContainerRef.current;
        const ruler = rulerRef.current;
        if (!container || !ruler) return;

        // Usa offsetHeight (sempre em CSS px reais, imune ao transform: scale do zoom)
        const maxPageHeight = ruler.offsetHeight;
        if (!maxPageHeight || maxPageHeight < 200) return;

        const blockEls = Array.from(container.children);
        if (blockEls.length !== blocks.length) return;

        const pages = [];
        let currentPage = [];
        let currentHeight = 0;

        blockEls.forEach((el, index) => {
            const style = window.getComputedStyle(el);
            const marginTop = parseFloat(style.marginTop || '0');
            const marginBottom = parseFloat(style.marginBottom || '0');
            const blockHeight = el.offsetHeight;

            // O primeiro bloco de uma folha não precisa do margin-top de separação entre seções
            const effectiveMarginTop = currentPage.length === 0 ? 0 : marginTop;
            const neededHeight = effectiveMarginTop + blockHeight + marginBottom;

            if (currentPage.length > 0 && currentHeight + neededHeight > maxPageHeight) {
                pages.push(currentPage);
                currentPage = [index];
                currentHeight = blockHeight + marginBottom;
            } else {
                currentPage.push(index);
                currentHeight += neededHeight;
            }
        });

        if (currentPage.length > 0) {
            pages.push(currentPage);
        }

        setPageSplits((prev) => {
            const nextKey = pages.map((p) => p.join(',')).join('|');
            const prevKey = prev ? prev.map((p) => p.join(',')).join('|') : '';
            return nextKey === prevKey ? prev : pages;
        });
    };

    useLayoutEffect(() => {
        computePages();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [blocks, isDense, theme]);

    useEffect(() => {
        let active = true;
        if (document.fonts?.ready) {
            document.fonts.ready.then(() => {
                if (active) computePages();
            });
        }

        const handleResize = () => computePages();
        window.addEventListener('resize', handleResize);
        return () => {
            active = false;
            window.removeEventListener('resize', handleResize);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [blocks, isDense, theme]);

    const themeClasses = [
        isDense ? 'is-dense' : '',
        theme === 'classic' ? 'theme-classic' : '',
    ]
        .filter(Boolean)
        .join(' ');

    const resolvedPages = useMemo(() => {
        if (!pageSplits) {
            return [blocks.map((_, i) => i)];
        }
        const valid = pageSplits.every((page) =>
            page.every((idx) => idx >= 0 && idx < blocks.length)
        );
        const total = pageSplits.reduce((sum, p) => sum + p.length, 0);
        if (!valid || total !== blocks.length) {
            return [blocks.map((_, i) => i)];
        }
        return pageSplits;
    }, [pageSplits, blocks]);

    return (
        <div
            className={`resume-sheets-root ${themeClasses}`}
            aria-label={`Currículo de ${profileData.fullName}`}
        >
            {/* Régua oculta em mm exatos (260mm úteis dentro de A4 297mm com margens 12mm/16mm) */}
            <div className="resume-measure-sandbox no-print" aria-hidden="true">
                <div className="resume-a4-ruler" ref={rulerRef} />
                <div
                    className={`resume-paper resume-measure-paper ${themeClasses}`}
                    ref={measureContainerRef}
                >
                    {blocks.map((block) => (
                        <div key={block.id} className={`resume-block resume-block-${block.kind}`}>
                            {block.node}
                        </div>
                    ))}
                </div>
            </div>

            {/* Folhas A4 individuais renderizadas na tela e na impressão */}
            <div className="resume-sheets-stack">
                {resolvedPages.map((pageIndices, pageIdx) => (
                    <article
                        key={`sheet-${pageIdx}`}
                        className={`resume-paper resume-sheet ${themeClasses}`}
                    >
                        <div className="resume-paper-content">
                            {pageIndices.map((blockIdx, posInPage) => {
                                const block = blocks[blockIdx];
                                return (
                                    <div
                                        key={block.id}
                                        className={`resume-block resume-block-${block.kind} ${posInPage === 0 ? 'is-sheet-first' : ''}`}
                                    >
                                        {block.node}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Rodapé da prévia de tela em cada folha (na impressão o @page assume) */}
                        <footer className="resume-paper-footer">
                            <span>{profileData.fullName}</span>
                            <span>{profileData.siteDisplay}</span>
                        </footer>
                    </article>
                ))}
            </div>
        </div>
    );
}
