import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import {
    additionalInfoData,
    educationData,
    experienceData,
    profileData,
    resumeProfiles,
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

function paginateByItem(container, maxPageHeight) {
    const pages = [];
    let currentPage = [];
    let currentHeight = 0;

    Array.from(container.children).forEach((el, index) => {
        const style = window.getComputedStyle(el);
        const marginTop = parseFloat(style.marginTop || '0');
        const marginBottom = parseFloat(style.marginBottom || '0');
        const blockHeight = el.offsetHeight;

        const effectiveTop = currentPage.length === 0 ? 0 : marginTop;
        const needed = effectiveTop + blockHeight + marginBottom;

        if (currentPage.length > 0 && currentHeight + needed > maxPageHeight) {
            pages.push(currentPage);
            currentPage = [index];
            currentHeight = blockHeight + marginBottom;
        } else {
            currentPage.push(index);
            currentHeight += needed;
        }
    });

    if (currentPage.length > 0) {
        pages.push(currentPage);
    }

    return pages;
}

export default function ResumeDocument({
    selectedProjects,
    selectedCourses = [],
    profile = resumeProfiles[0],
    theme = 'purple',
    density = 'comfortable',
    showAdditionalInfo = true,
}) {
    const linkedin = socialLinks.find((item) => item.id === 'linkedin');
    const github = socialLinks.find((item) => item.id === 'github');

    const isCompact = density === 'compact';
    // Regra dos 4+ projetos: 1 a 3 = 1 coluna; 4 a 8 = grid de 2 colunas
    const useTwoColProjects = selectedProjects.length >= 4;

    const skillGroups = profile.skillGroups || resumeSkillGroups;

    const orderedExperiences = useMemo(() => {
        const expOrder = profile.experienceOrder || [];
        return [...experienceData]
            .sort((a, b) => {
                const idxA = expOrder.indexOf(a.id);
                const idxB = expOrder.indexOf(b.id);
                return (idxA === -1 ? 99 : idxA) - (idxB === -1 ? 99 : idxB);
            })
            .map((exp) => ({
                ...exp,
                activeHighlights: exp.highlightsByProfile?.[profile.id] || exp.highlights,
            }));
    }, [profile]);

    const orderedEducation = useMemo(() => {
        const order = profile.educationOrder || [];
        return [...educationData].sort((a, b) => {
            const idxA = order.indexOf(a.id);
            const idxB = order.indexOf(b.id);
            return (idxA === -1 ? 99 : idxA) - (idxB === -1 ? 99 : idxB);
        });
    }, [profile]);

    // Quebra estritamente por ITEM individual (nunca trava seção inteira; título preso ao 1º item)
    const blocks = useMemo(() => {
        const list = [];

        // 1. Cabeçalho editorial fixo A4
        list.push({
            id: 'header',
            kind: 'header',
            node: (
                <>
                    <header className="resume-doc-header">
                        <div className="resume-doc-identity">
                            <h1 className="resume-doc-name">{profileData.fullName}</h1>
                            <p className="resume-doc-role">{profile.role || profileData.role}</p>
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

        const addExperienceBlocks = () => {
            orderedExperiences.forEach((exp, idx) => {
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
                            {exp.activeHighlights.map((bullet) => (
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
        };

        const addEducationBlocks = () => {
            orderedEducation.forEach((edu, idx) => {
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
        };

        const addSkillsBlocks = () => {
            skillGroups.forEach((group, idx) => {
                const isLast = idx === skillGroups.length - 1;
                const rowNode = (
                    <div className={`resume-skill-row ${isLast ? 'is-last-skill' : ''}`}>
                        <span className="resume-skill-cat">{group.label}</span>
                        <span className="resume-skill-values">
                            {group.items.join('  •  ')}
                        </span>
                    </div>
                );

                list.push({
                    id: `skill-${group.label}`,
                    kind: idx === 0 ? 'section-start' : 'skill-item',
                    node:
                        idx === 0 ? (
                            <div className="resume-flow-section-start">
                                <h2 className="resume-section-heading">Competências Técnicas</h2>
                                {rowNode}
                            </div>
                        ) : (
                            rowNode
                        ),
                });
            });
        };

        const addProjectsBlocks = () => {
            if (selectedProjects.length === 0) return;

            const projectRows = [];
            if (useTwoColProjects) {
                for (let i = 0; i < selectedProjects.length; i += 2) {
                    projectRows.push(selectedProjects.slice(i, i + 2));
                }
            } else {
                selectedProjects.forEach((p) => projectRows.push([p]));
            }

            const headingLabel = profile.projectsHeading || 'Projetos em Destaque';

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
                                <h2 className="resume-section-heading">{headingLabel}</h2>
                                {rowNode}
                            </div>
                        ) : (
                            <div className="resume-flow-proj-item">{rowNode}</div>
                        ),
                });
            });
        };

        // Cursos + Informações Adicionais: pareados linha a linha para quebrar por ITEM (sem vazio na folha 1)
        const addBottomBlocks = () => {
            const hasCourses = selectedCourses.length > 0;
            if (!hasCourses && !showAdditionalInfo) return;

            if (hasCourses && showAdditionalInfo) {
                const rowCount = Math.max(selectedCourses.length, additionalInfoData.length);
                for (let idx = 0; idx < rowCount; idx += 1) {
                    const curso = selectedCourses[idx] || null;
                    const info = additionalInfoData[idx] || null;

                    list.push({
                        id: `bottom-pair-${idx}`,
                        kind: idx === 0 ? 'section-start' : 'bottom-pair-item',
                        node: (
                            <div className="resume-bottom-pair-row">
                                <div className="resume-bottom-pair-col">
                                    {idx === 0 && (
                                        <h2 className="resume-section-heading">Cursos</h2>
                                    )}
                                    {curso && (
                                        <div className="resume-course-single-item">
                                            <strong>{curso.title}</strong>
                                            <span>{curso.meta}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="resume-bottom-pair-col">
                                    {idx === 0 && (
                                        <h2 className="resume-section-heading">
                                            Informações Adicionais
                                        </h2>
                                    )}
                                    {info && (
                                        <ul className="resume-bullets resume-additional-list">
                                            <li>
                                                <strong>{info.label}:</strong> {info.value}
                                            </li>
                                        </ul>
                                    )}
                                </div>
                            </div>
                        ),
                    });
                }
                return;
            }

            if (hasCourses) {
                selectedCourses.forEach((curso, idx) => {
                    const itemNode = (
                        <div className="resume-course-single-item">
                            <strong>{curso.title}</strong>
                            <span>{curso.meta}</span>
                        </div>
                    );
                    list.push({
                        id: `course-${curso.id}`,
                        kind: idx === 0 ? 'section-start' : 'course-item',
                        node:
                            idx === 0 ? (
                                <div className="resume-flow-section-start">
                                    <h2 className="resume-section-heading">Cursos</h2>
                                    {itemNode}
                                </div>
                            ) : (
                                itemNode
                            ),
                    });
                });
            }

            if (showAdditionalInfo) {
                additionalInfoData.forEach((info, idx) => {
                    const itemNode = (
                        <ul className="resume-bullets resume-additional-list">
                            <li>
                                <strong>{info.label}:</strong> {info.value}
                            </li>
                        </ul>
                    );
                    list.push({
                        id: `info-${info.id}`,
                        kind: idx === 0 ? 'section-start' : 'info-item',
                        node:
                            idx === 0 ? (
                                <div className="resume-flow-section-start">
                                    <h2 className="resume-section-heading">
                                        Informações Adicionais
                                    </h2>
                                    {itemNode}
                                </div>
                            ) : (
                                itemNode
                            ),
                    });
                });
            }
        };

        const sectionOrder = profile.sectionOrder || [
            'experience',
            'education',
            'skills',
            'projects',
            'bottom',
        ];

        sectionOrder.forEach((sectionKey) => {
            switch (sectionKey) {
                case 'experience':
                    addExperienceBlocks();
                    break;
                case 'education':
                    addEducationBlocks();
                    break;
                case 'skills':
                    addSkillsBlocks();
                    break;
                case 'projects':
                    addProjectsBlocks();
                    break;
                case 'bottom':
                    addBottomBlocks();
                    break;
                default:
                    break;
            }
        });

        return list;
    }, [
        profile,
        linkedin,
        github,
        orderedExperiences,
        orderedEducation,
        skillGroups,
        selectedProjects,
        useTwoColProjects,
        selectedCourses,
        showAdditionalInfo,
    ]);

    const measureContainerRef = useRef(null);
    const rulerRef = useRef(null);
    const [pageSplits, setPageSplits] = useState(null);

    const computePages = () => {
        const container = measureContainerRef.current;
        const ruler = rulerRef.current;
        if (!container || !ruler) return;

        const maxPageHeight = ruler.offsetHeight;
        if (!maxPageHeight || maxPageHeight < 200) return;
        if (container.children.length !== blocks.length) return;

        const pages = paginateByItem(container, maxPageHeight);
        setPageSplits((prev) => {
            const nextKey = pages.map((p) => p.join(',')).join('|');
            const prevKey = prev ? prev.map((p) => p.join(',')).join('|') : '';
            return nextKey === prevKey ? prev : pages;
        });
    };

    useLayoutEffect(() => {
        computePages();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [blocks, isCompact, theme]);

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
    }, [blocks, isCompact, theme]);

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

    const sheetClasses = [
        isCompact ? 'is-compact' : '',
        theme === 'classic' ? 'theme-classic' : '',
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div
            className={`resume-sheets-root ${sheetClasses}`}
            aria-label={`Currículo de ${profileData.fullName}`}
        >
            {/* Medidor oculto na escala fixa A4 (210mm, área útil 262mm) */}
            <div className="resume-measure-sandbox no-print" aria-hidden="true">
                <div className="resume-a4-ruler" ref={rulerRef} />
                <div
                    className={`resume-paper resume-measure-paper ${sheetClasses}`}
                    ref={measureContainerRef}
                >
                    {blocks.map((block) => (
                        <div key={block.id} className={`resume-block resume-block-${block.kind}`}>
                            {block.node}
                        </div>
                    ))}
                </div>
            </div>

            {/* Folhas A4 fixas (210mm x 297mm) */}
            <div className="resume-sheets-stack">
                {resolvedPages.map((pageIndices, pageIdx) => (
                    <article
                        key={`sheet-${pageIdx}`}
                        className={`resume-paper resume-sheet ${sheetClasses}`}
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

                        {/* Rodapé da prévia em cada folha A4 (na impressão o @page assume) */}
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
