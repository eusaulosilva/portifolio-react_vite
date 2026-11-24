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
        title: "Analista de Dados (Estágio)",
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
        id: "react-maestria",
        title: "React do Zero à Maestria (hooks, router, API e projetos)",
        provider: "Udemy",
        workload: "32h",
        status: "Em andamento",
        inProgress: true,
        meta: "Udemy • 32h • Em andamento",
        text: "React do Zero à Maestria (c/ hooks, router, API, Projetos) - Udemy (32h - em andamento).",
        featuredInResume: true,
    },
    {
        id: "js-node",
        title: "JavaScript do básico ao avançado (c/ Node.js e projetos)",
        provider: "Udemy",
        workload: "24,5h",
        status: "Concluído em 02/2026",
        inProgress: false,
        meta: "Udemy • 24,5h • Concluído em 02/2026",
        text: "JavaScript do básico ao avançado (c/ Node.js e projetos) - Udemy (24,5h - conclusão em 02/2026).",
        featuredInResume: true,
    },
    {
        id: "master-dax",
        title: "Master DAX - Power BI orientado a projeto",
        provider: "Udemy",
        workload: "17,5h",
        status: "Concluído em 11/2025",
        inProgress: false,
        meta: "Udemy • 17,5h • Concluído em 11/2025",
        text: "Master DAX - Power BI orientado a projeto - Udemy (17,5h - conclusão em 11/2025).",
        featuredInResume: true,
    },
    {
        id: "copilot-studio",
        title: "Copilot Studio: Multiagentes",
        provider: "Alura",
        workload: "",
        status: "Concluído",
        inProgress: false,
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

export const resumeProfiles = [
    {
        id: "geral",
        label: "Geral",
        role: "Desenvolvedor Full Stack & Analista de Dados",
        projectIds: ["job-finder", "dashboard-salarios", "portfolio-pessoal", "pobreoke"],
        skillOrder: ["Front-end & Mobile", "Back-end & Bancos", "Dados & Ferramentas"],
    },
    {
        id: "fullstack",
        label: "Full Stack",
        role: "Desenvolvedor Full Stack & Mobile",
        projectIds: [
            "job-finder",
            "portfolio-pessoal",
            "pobreoke",
            "manscan",
            "estudos-javascript",
        ],
        skillOrder: ["Front-end & Mobile", "Back-end & Bancos", "Dados & Ferramentas"],
    },
    {
        id: "dados",
        label: "Dados & BI",
        role: "Analista de Dados & Business Intelligence",
        projectIds: ["dashboard-salarios", "job-finder", "portfolio-pessoal"],
        skillOrder: ["Dados & Ferramentas", "Back-end & Bancos", "Front-end & Mobile"],
    },
];
