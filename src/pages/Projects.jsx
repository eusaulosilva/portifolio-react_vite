import { useMemo, useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import Reveal from '../components/Reveal';
import { projectCategories, projectsData } from '../data/content';

export default function Projects() {
    const [selectedCategory, setSelectedCategory] = useState('Todos');

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
                                    onClick={() => setSelectedCategory(category)}
                                    aria-pressed={isActive}
                                >
                                    <span>{category}</span>
                                    <span className="filter-count">{categoryCounts[category] || 0}</span>
                                </button>
                            );
                        })}
                    </div>
                </Reveal>

                <div className="container-fluid container-projetos">
                    <div className="projeto-caixa">
                        {filteredProjects.map((projeto, index) => (
                            <Reveal
                                key={projeto.id}
                                delay={Math.min(index * 80, 240)}
                                className="project-card-reveal"
                            >
                                <ProjectCard {...projeto} />
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
