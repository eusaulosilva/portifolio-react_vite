import SkillItem from '../components/SkillItem';
import { skillsData } from '../data/content';

export default function Skills() {
    // Agrupa as skills por categoria para manter a estrutura do seu HTML original
    const categories = ["Desenvolvimento", "Backend & Outras", "Dados & Ferramentas"];

    return (
        <section id="skill" className="container-fluid">
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