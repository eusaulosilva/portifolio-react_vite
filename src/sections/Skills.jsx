import { Reveal, SkillItem } from '../components/ui';
import { skillCategories, skillsData } from '../data';

export default function Skills() {
    return (
        <section id="skills" className="container-fluid">
            <div className="skills-section">
                <Reveal>
                    <div className="header">
                        <span className="section-kicker">02 / Stack Técnica</span>
                        <h2>Tecnologias</h2>
                    </div>
                </Reveal>

                <div className="skills-grid">
                    {skillCategories.map((category, index) => {
                        const categorySkills = skillsData.filter(
                            (skill) => skill.category === category
                        );
                        return (
                            <Reveal
                                key={category}
                                delay={index * 100}
                                className="skill-category-reveal"
                            >
                                <div className="category">
                                    <div className="category-header">
                                        <h3>{category}</h3>
                                        <span className="category-count">
                                            {categorySkills.length}
                                        </span>
                                    </div>
                                    <div className="category-items">
                                        {categorySkills.map((skill) => (
                                            <SkillItem
                                                key={skill.name}
                                                name={skill.name}
                                                icon={skill.icon}
                                                customIcon={skill.customIcon}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
