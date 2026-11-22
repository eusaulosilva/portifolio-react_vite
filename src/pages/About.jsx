import Reveal from '../components/Reveal';
import { CodeIcon, DatabaseIcon, GraduationCapIcon } from '../components/Icons';
import { aboutHighlights } from '../data/content';

function HighlightIcon({ icon }) {
    switch (icon) {
        case 'graduation':
            return <GraduationCapIcon size={20} />;
        case 'database':
            return <DatabaseIcon size={20} />;
        case 'code':
            return <CodeIcon size={20} />;
        default:
            return null;
    }
}

const About = () => {
    return (
        <section id="sobre" className="container-fluid">
            <div className="sobre-section">
                <Reveal>
                    <div className="header">
                        <span className="section-kicker">01 / Perfil</span>
                        <h2>Sobre mim</h2>
                    </div>
                </Reveal>

                <div className="about-layout">
                    <Reveal delay={80}>
                        <div className="sobre-conteudo">
                            <p className="container-conteudo-texto container-conteudo-lead">
                                Sou bacharel em Ciência da Computação pelo UDF, pós-graduando em{' '}
                                <strong>Ciência de Dados e Big Data Analytics</strong> pela Cruzeiro do
                                Sul Virtual e possuo um perfil híbrido que une o{' '}
                                <strong>Desenvolvimento Full Stack</strong> à{' '}
                                <strong>Análise de Dados</strong>.
                            </p>
                            <p className="container-conteudo-texto">
                                Com experiência prática como Analista de Dados na{' '}
                                <strong>BB Administradora de Consórcios S.A.</strong> e atuação em
                                gestão e automação de processos no UDF, trabalho com indicadores
                                financeiros e operacionais usando SQL, Python, Power BI, Streamlit e
                                Excel/VBA.
                            </p>
                            <p className="container-conteudo-texto">
                                No desenvolvimento de software, construo aplicações modernas e
                                escaláveis com <strong>React, Vite e Node.js</strong>, bancos de dados{' '}
                                <strong>PostgreSQL, SQLite e Firebase</strong> e apps mobile em{' '}
                                <strong>Flutter</strong> — aplicados em projetos como o Job Finder, o
                                Pobreokê e o ManScan.
                            </p>
                            <p className="container-conteudo-texto">
                                Também valorizo comunidade e liderança técnica, tendo atuado como{' '}
                                <strong>Líder de Comunidade e Caravana na Campus Party (2023–2025)</strong>,
                                monitor acadêmico e representante de turma na UDF. Meu foco é entregar
                                produtos que unam alta performance, design intuitivo e inteligência de
                                dados.
                            </p>
                        </div>
                    </Reveal>

                    <div className="about-highlights">
                        {aboutHighlights.map((item, index) => (
                            <Reveal
                                key={item.id}
                                delay={120 + index * 90}
                                className="about-highlight-reveal"
                            >
                                <article className="about-highlight-card">
                                    <div className="about-highlight-icon">
                                        <HighlightIcon icon={item.icon} />
                                    </div>
                                    <div className="about-highlight-body">
                                        <h3>{item.title}</h3>
                                        <p>{item.subtitle}</p>
                                    </div>
                                </article>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
