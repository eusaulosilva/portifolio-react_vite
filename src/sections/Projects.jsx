import { useMemo, useState } from 'react';
import { ProjectCard, Reveal } from '../components/ui';
import { ChevronDownIcon } from '../components/ui/Icons';
import { projectCategories, projectsData } from '../data';
import { scrollToSection } from '../utils/scroll';

const INITIAL_VISIBLE_COUNT = 3;

export default function Projects() {
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [showAll, setShowAll] = useState(false);

    const categoryCounts = useMemo(() => {
        const counts = { Todos: projectsData.length };
        projectsData.forEach((project) => {
            counts[project.category] = (counts[project.category] || 0) + 1;
        });
        return counts;
    }, []);

    const filteredProjects = useMemo(() => {
        if (selectedCategory === 'Todos') return projectsData;
        return projectsData.filter((project) => project.category === selectedCategory);
    }, [selectedCategory]);

    const hasMoreProjects = filteredProjects.length > INITIAL_VISIBLE_COUNT;
    const visibleProjects = showAll
        ? filteredProjects
        : filteredProjects.slice(0, INITIAL_VISIBLE_COUNT);
    const remainingCount = filteredProjects.length - INITIAL_VISIBLE_COUNT;

    const handleSelectCategory = (category) => {
        setSelectedCategory(category);
        setShowAll(false);
    };

    const handleRecursivePortfolioDemo = () => {
        scrollToSection('inicio');
    };

    return (
        <section id="projetos" className="container-fluid">
            <div className="projetos-section">
                <Reveal>
                    <div className="header">
                        <span className="section-kicker">03 / Portfólio</span>
                        <h2>Projetos</h2>
                    </div>
                </Reveal>

                <Reveal delay={80}>
                    <div
                        className="project-filters"
                        role="group"
                        aria-label="Filtrar projetos por categoria"
                    >
                        {projectCategories.map((category) => {
                            const isActive = selectedCategory === category;
                            return (
                                <button
                                    key={category}
                                    type="button"
                                    className={`filter-pill ${isActive ? 'active' : ''}`}
                                    onClick={() => handleSelectCategory(category)}
                                    aria-pressed={isActive}
                                >
                                    <span>{category}</span>
                                    <span className="filter-count">
                                        {categoryCounts[category] || 0}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </Reveal>

                <div className="container-fluid container-projetos">
                    <div className="projeto-caixa">
                        {visibleProjects.map((projeto, index) => (
                            <Reveal
                                key={projeto.id}
                                delay={Math.min(index * 80, 240)}
                                className="project-card-reveal"
                            >
                                <ProjectCard
                                    {...projeto}
                                    onRecursiveDemo={
                                        projeto.recursiveDemo
                                            ? handleRecursivePortfolioDemo
                                            : undefined
                                    }
                                />
                            </Reveal>
                        ))}
                    </div>

                    {hasMoreProjects && (
                        <div className="projects-more-wrap">
                            <button
                                type="button"
                                className={`btn-projects-toggle ${showAll ? 'is-expanded' : ''}`}
                                onClick={() => setShowAll((prev) => !prev)}
                                aria-expanded={showAll}
                            >
                                <span>
                                    {showAll
                                        ? 'Mostrar menos'
                                        : `Ver mais projetos (+${remainingCount})`}
                                </span>
                                <ChevronDownIcon size={18} className="projects-toggle-icon" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
