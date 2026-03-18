import SkillItem from '../components/SkillItem';
import { Helmet } from 'react-helmet-async';
import { skillsData } from '../data/content';

export default function Skills() {
    // Agrupa as skills por categoria para manter a estrutura do seu HTML original
    const categories = ["Desenvolvimento", "Backend & Outras", "Dados & Ferramentas"];

    return (
        <section id="skill" className="container-fluid">
            <Helmet>
                <title>Skills e Tecnologias | Saulo Silva</title>
                <meta name="description" content="Conheça a stack técnica de Saulo Silva: especialidade em React, Node.js, Dart/Flutter e Python para análise de dados e Business Intelligence." />
                <link rel="canonical" href="https://eusaulosilva.com.br/#skills" />
            </Helmet>
            <div className="skills-section">
                <div className="header">
                    <h2>Tecnologias</h2>
                </div>

                {/* Mantendo a classe original que organiza o layout em colunas */}
                <div className="skills-grid">
                    {categories.map((cat) => (
                        <div key={cat} className="category">
                            <h3>{cat}</h3>
                            {skillsData
                                .filter(skill => skill.category === cat)
                                .map((skill, index) => (
                                    <SkillItem
                                        key={index}
                                        name={skill.name}
                                        icon={skill.icon}
                                    />
                                ))
                            }
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}