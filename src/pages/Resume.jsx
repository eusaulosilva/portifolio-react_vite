import TimelineItem from '../components/TimelineItem';
import { coursesData } from '../data/content';

export default function Resume() {
    return (
        <section id="curriculo" className="container-fluid">
            <div className="curriculo-section">
                <div className="header">
                    <h2>Educação & Experiência</h2>
                </div>

                <div className="resume-grid">
                    {/* Coluna de Educação */}
                    <div className="resume-column">
                        <div className="column-title">
                            <span className="icon-box">🎓</span>
                            <h3>Educação</h3>
                        </div>

                        <div className="timeline">
                            <TimelineItem
                                date="Conclusão: Dez/2025"
                                title="Ciência da Computação (Bacharelado)"
                                institution="UDF (Centro Universitário do Distrito Federal)"
                                description="Formação concluída com foco em desenvolvimento e análise de dados."
                            />
                        </div>

                        {/* Inclusão dos Cursos Especializados com as classes originais */}
                        <div className="complementary-courses">
                            <h4>Cursos Especializados</h4>
                            <div className="course-tags">
                                {coursesData.map((curso, index) => (
                                    <span key={index}>{curso}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Coluna de Experiência */}
                    <div className="resume-column">
                        <div className="column-title">
                            <span className="icon-box">💼</span>
                            <h3>Experiência</h3>
                        </div>
                        <div className="timeline">
                            <TimelineItem
                                date="Fev/2024 - Dez/2025"
                                title="Analista de Dados (Estagiário)"
                                institution="Banco do Brasil"
                                description="Extração de informações estratégicas e análise de indicadores financeiros utilizando SQL e Power BI."
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}