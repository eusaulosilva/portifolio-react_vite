export const profileData = {
    name: "Saulo Silva",
    fullName: "Saulo José da Silva Oliveira",
    brand: "Saulo",
    brandAccent: ".dev",
    role: "Desenvolvedor Full Stack & Analista de Dados",
    eyebrow: "Ciência da Computação • Full Stack & Dados",
    location: "Taguatinga, Brasília-DF",
    phone: "61 99834-0336",
    phoneHref: "+5561998340336",
    siteUrl: "https://eusaulosilva.com.br/",
    siteDisplay: "www.eusaulosilva.com.br",
    ogImage: "https://eusaulosilva.com.br/img/og-cover.jpg",
    email: "contato@eusaulosilva.com.br",
    resumeEmail: "saulo.oliveira209939@gmail.com",
    apiContactUrl: "https://api.eusaulosilva.com.br/api/enviar-email",
    description:
        "Portfólio profissional de Saulo José da Silva Oliveira — Desenvolvedor Full Stack e Analista de Dados. Bacharel em Ciência da Computação e pós-graduando em Ciência de Dados e Big Data Analytics.",
};

export const navLinks = [
    { id: "inicio", label: "Início", href: "#inicio" },
    { id: "sobre", label: "Sobre mim", href: "#sobre" },
    { id: "skills", label: "Skills", href: "#skills" },
    { id: "projetos", label: "Projetos", href: "#projetos" },
    { id: "curriculo", label: "Currículo", href: "#curriculo" },
    { id: "contato", label: "Contato", href: "#contato" },
];

export const socialLinks = [
    {
        id: "linkedin",
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/eusaulosilva",
        display: "www.linkedin.com/in/eusaulosilva",
        external: true,
        showInFooter: true,
    },
    {
        id: "github",
        label: "GitHub",
        href: "https://github.com/eusaulosilva",
        display: "github.com/eusaulosilva",
        external: true,
        showInFooter: true,
    },
    {
        id: "email",
        label: "E-mail",
        href: "mailto:contato@eusaulosilva.com.br",
        external: false,
        showInFooter: true,
    },
    {
        id: "resume",
        label: "Visualizar Currículo",
        action: "open-resume",
        external: false,
        showInFooter: false,
    },
];

export const aboutHighlights = [
    {
        id: "formacao",
        icon: "graduation",
        title: "Ciência da Computação",
        subtitle: "Bacharelado concluído (UDF) + Pós-Graduação em Ciência de Dados e Big Data (conclusão Jun/2027)",
    },
    {
        id: "dados",
        icon: "database",
        title: "Análise de Dados & BI",
        subtitle: "Experiência na BB Administradora de Consórcios S.A. e UDF com Power BI, SQL, Python, Streamlit e Excel/VBA",
    },
    {
        id: "fullstack",
        icon: "code",
        title: "Full Stack & Mobile",
        subtitle: "Aplicações web e mobile com React, Vite, Node.js, APIs RESTful, Firebase, SQLite e Flutter",
    },
];

export const skillCategories = [
    "Desenvolvimento",
    "Backend & Outras",
    "Dados & Ferramentas",
];

export const skillsData = [
    // Desenvolvimento
    { name: "HTML5", icon: "html", category: "Desenvolvimento" },
    { name: "CSS3", icon: "css", category: "Desenvolvimento" },
    { name: "JavaScript", icon: "js", category: "Desenvolvimento" },
    { name: "TypeScript", icon: "ts", category: "Desenvolvimento" },
    { name: "React", icon: "react", category: "Desenvolvimento" },
    { name: "Vite", icon: "vite", category: "Desenvolvimento" },
    { name: "Angular", icon: "angular", category: "Desenvolvimento" },
    { name: "Flutter", icon: "flutter", category: "Desenvolvimento" },

    // Backend & Outras
    { name: "Node.js", icon: "nodejs", category: "Backend & Outras" },
    { name: "APIs RESTful", icon: "api", category: "Backend & Outras", customIcon: true },
    { name: "Python", icon: "python", category: "Backend & Outras" },
    { name: "Java", icon: "java", category: "Backend & Outras" },
    { name: "PHP", icon: "php", category: "Backend & Outras" },
    { name: "Firebase", icon: "firebase", category: "Backend & Outras" },

    // Dados & Ferramentas
    { name: "PostgreSQL", icon: "postgres", category: "Dados & Ferramentas" },
    { name: "SQLite", icon: "sqlite", category: "Dados & Ferramentas" },
    { name: "Power BI", icon: "powerbi", category: "Dados & Ferramentas", customIcon: true },
    { name: "Streamlit", icon: "streamlit", category: "Dados & Ferramentas", customIcon: true },
    { name: "Excel & VBA", icon: "excel", category: "Dados & Ferramentas", customIcon: true },
    { name: "Git", icon: "git", category: "Dados & Ferramentas" },
    { name: "GitHub", icon: "github", category: "Dados & Ferramentas" },
];

// Competências agrupadas para leitura rápida por recrutadores e sistemas ATS
export const resumeSkillGroups = [
    {
        label: "Front-end & Mobile",
        items: ["React", "JavaScript", "Vite", "Flutter"],
    },
    {
        label: "Back-end & Bancos",
        items: ["Node.js", "APIs RESTful", "PostgreSQL", "SQLite", "Firebase"],
    },
    {
        label: "Dados & Ferramentas",
        items: ["Python", "Power BI", "Streamlit", "Excel & VBA", "Git", "GitHub"],
    },
];

export const projectCategories = ["Todos", "Full Stack", "Mobile", "Dados", "Front-end"];

export const projectsData = [
    {
        id: "job-finder",
        title: "Job Finder",
        resumeTitle: "Job Finder (Web Full Stack)",
        category: "Full Stack",
        description: "Portal de vagas desenvolvido com Node.js, Express e SQLite para busca e visualização de oportunidades.",
        resumeDescription: "Portal de vagas desenvolvido com Node.js, Express e SQLite.",
        techs: ["Node.js", "Express", "SQLite", "JavaScript"],
        link: "https://github.com/eusaulosilva/job-finder",
        demo: "https://job-finder-two-delta.vercel.app/",
        img: "./img/job-finder.webp",
        featuredInResume: true,
    },
    {
        id: "dashboard-salarios",
        title: "Dashboard de Salários",
        resumeTitle: "Dashboard de Salários (Data Science)",
        category: "Dados",
        description: "Painel interativo para análise de mercado e salários na área de dados feito com Python, Streamlit e Pandas.",
        resumeDescription: "Painel interativo para análise de mercado feito com Python, Streamlit e Pandas.",
        techs: ["Python", "Streamlit", "Pandas"],
        link: "https://github.com/eusaulosilva/imersao-dados-python-alura",
        demo: "https://imersaodados-python-2025-alura.streamlit.app/",
        img: "./img/imersao-python.webp",
        featuredInResume: true,
    },
    {
        id: "portfolio-pessoal",
        title: "Portfólio Pessoal",
        resumeTitle: "Portfólio Pessoal",
        category: "Full Stack",
        description: "Site responsivo desenvolvido com React e Vite, integrado a backend em Node.js para envio de e-mails e CI/CD via GitHub Actions.",
        resumeDescription: "Desenvolvimento de site responsivo utilizando React e Vite, com backend em Node.js.",
        techs: ["React", "Vite", "Node.js", "GitHub Actions"],
        link: "https://github.com/eusaulosilva/portifolio-react_vite",
        demo: "https://eusaulosilva.com.br/",
        img: "./img/projeto-portfolio.webp",
        featuredInResume: true,
    },
    {
        id: "pobreoke",
        title: "Pobreokê",
        resumeTitle: "Pobreokê",
        category: "Full Stack",
        description: "Sistema de gerenciamento de karaokê baseado na web, desenvolvido com React e Firebase para controle de filas e músicas em tempo real.",
        resumeDescription: "Sistema de gerenciamento de karaokê baseado na web, desenvolvido com React e Firebase para controle de filas e músicas em tempo real.",
        techs: ["React", "Firebase", "Tempo Real"],
        img: "./img/pobreoke.svg",
        featuredInResume: true,
    },
    {
        id: "manscan",
        title: "ManScan",
        resumeTitle: "ManScan (Mobile)",
        category: "Mobile",
        description: "Aplicativo voltado para o monitoramento da saúde masculina, desenvolvido como projeto de TCC.",
        resumeDescription: "Aplicativo mobile para monitoramento da saúde masculina desenvolvido em Flutter e Firebase.",
        techs: ["Flutter", "Firebase", "Dart"],
        link: "https://github.com/eusaulosilva/manscanapp",
        img: "./img/manscan.webp",
        featuredInResume: false,
    },
    {
        id: "jogo-adivinhacao",
        title: "Jogo de Adivinhação",
        resumeTitle: "Jogo de Adivinhação",
        category: "Front-end",
        description: "Jogo interativo de adivinhação de números desenvolvido para praticar manipulação do DOM e lógica.",
        resumeDescription: "Jogo interativo de adivinhação de números feito com JavaScript, HTML5 e CSS3.",
        techs: ["JavaScript", "HTML5", "CSS3"],
        link: "https://github.com/eusaulosilva/Jogo-de-adivinha-o-numero",
        demo: "https://adivinheonumero-five.vercel.app/",
        img: "./img/numero-secreto.webp",
        featuredInResume: false,
    },
    {
        id: "estudos-javascript",
        title: "Estudos JavaScript",
        resumeTitle: "Estudos JavaScript",
        category: "Front-end",
        description: "Repositório dedicado ao estudo de algoritmos, lógica de programação e fundamentos da linguagem.",
        resumeDescription: "Repositório de estudos de algoritmos, lógica de programação e ES6+.",
        techs: ["JavaScript", "Lógica", "ES6+"],
        link: "https://github.com/eusaulosilva/Projeto-JavaScript",
        demo: "https://projetojavascript2022.vercel.app/",
        img: "./img/projeto-javascript.webp",
        featuredInResume: false,
    },
];

export const experienceData = [
    {
        id: "udf-assistente",
        date: "Abr 2026 - Atual",
        current: true,
        title: "Assistente Administrativo",
        institution: "UDF - Centro Universitário do Distrito Federal",
        highlights: [
            "Suporte administrativo a coordenações e lançamento de dados em sistemas acadêmicos.",
            "Otimização de fluxos de trabalho e padronização de documentos utilizando Excel e VBA.",
            "Extração e análise de indicadores operacionais para suporte à decisão e melhoria de processos.",
        ],
    },
    {
        id: "bb-analista-dados",
        date: "Fev 2024 - Dez 2025",
        current: false,
        title: "Analista de dados (Estágio)",
        institution: "BB Administradora de Consórcios S.A.",
        highlights: [
            "Análise de indicadores financeiros e operacionais para apoio à tomada de decisão estratégica.",
            "Extração, tratamento e visualização de dados utilizando Power BI, SQL e Excel Avançado.",
            "Identificação de padrões e tendências para otimização de processos internos.",
        ],
    },
];

export const educationData = [
    {
        id: "pos-ciencia-dados",
        date: "Conclusão em Jun 2027",
        current: true,
        title: "Pós-graduação em Ciência de Dados e Big Data Analytics",
        institution: "Cruzeiro do Sul Virtual (EAD)",
        description:
            "Especialização voltada à análise avançada de dados, engenharia de dados e modelos preditivos.",
    },
    {
        id: "bacharelado-cc",
        date: "Concluído em Dez 2025",
        current: false,
        title: "Bacharelado em Ciência da Computação",
        institution: "UDF - Centro Universitário do Distrito Federal - Brasília-DF",
        description:
            "Formação concluída com foco em desenvolvimento de software e análise de dados.",
    },
];

export const coursesData = [
    {
        id: "master-dax",
        title: "Master DAX - Power BI orientado a projeto",
        meta: "Udemy • 17,5h • Concluído em 11/2025",
        text: "Master DAX - Power BI orientado a projeto - Udemy (17,5h - conclusão em 11/2025).",
        featuredInResume: true,
    },
    {
        id: "js-node",
        title: "JavaScript do básico ao avançado (c/ Node.js e projetos)",
        meta: "Udemy • 24,5h • Concluído em 02/2026",
        text: "JavaScript do básico ao avançado (c/ Node.js e projetos) - Udemy (24,5h - conclusão em 02/2026).",
        featuredInResume: true,
    },
    {
        id: "react-maestria",
        title: "React do Zero à Maestria (hooks, router, API e projetos)",
        meta: "Udemy • 32h • Em andamento",
        text: "React do Zero à Maestria (c/ hooks, router, API, Projetos) - Udemy (32h - em andamento).",
        featuredInResume: true,
    },
    {
        id: "copilot-studio",
        title: "Copilot Studio: Multiagentes",
        meta: "Alura",
        text: "Copilot Studio: Multiagentes - Alura.",
        featuredInResume: false,
    },
];

export const additionalInfoData = [
    {
        id: "idiomas",
        label: "Idiomas",
        value: "Inglês Técnico",
    },
    {
        id: "voluntario",
        label: "Trabalho Voluntário",
        value: "Líder de Comunidade e Caravana na Campus Party (2023-2025) e Staff no IGXP/InovaShow.",
    },
    {
        id: "monitoria",
        label: "Monitoria Acadêmica",
        value: "Auxílio técnico e teórico a estudantes em disciplinas do curso de computação na UDF.",
    },
    {
        id: "representante",
        label: "Representante de Turma",
        value: "Mediação entre corpo discente e coordenação do curso na UDF.",
    },
];
