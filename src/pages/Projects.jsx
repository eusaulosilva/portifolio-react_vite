import ProjectCard from '../components/ProjectCard';
import { Helmet } from 'react-helmet-async';
import { projectsData } from '../data/content';

export default function Projects() {
    return (
        <section id="projetos" className="container-fluid">
            <Helmet>
                <title>Projetos | Saulo Silva - Full Stack & Data</title>
                <meta name="description" content="Confira os projetos de Saulo Silva: Job Finder (Node.js), ManScan e soluções de análise de dados." />
                <link rel="canonical" href="https://eusaulosilva.com.br/#projetos" />
            </Helmet>
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