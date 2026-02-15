import ProjectCard from '../components/ProjectCard';
import { projectsData } from '../data/content';

export default function Projects() {
    return (
        <section id="projetos" className="container-fluid">
            <div className="projetos-section">
                <div className="header">
                    <h2>Projetos</h2>
                </div>

                <div className="container-fluid container-projetos">
                    <div className="projeto-caixa">
                        {projectsData.map((projeto, index) => (
                            <ProjectCard
                                key={index}
                                {...projeto} // Passa todas as propriedades (title, img, svg, etc) de uma vez
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}