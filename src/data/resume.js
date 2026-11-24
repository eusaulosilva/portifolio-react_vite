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
        highlightsByProfile: {
            geral: [
                "Suporte administrativo a coordenações e lançamento de dados em sistemas acadêmicos.",
                "Otimização de fluxos de trabalho e padronização de documentos utilizando Excel e VBA.",
                "Extração e análise de indicadores operacionais para suporte à decisão e melhoria de processos.",
            ],
            dev: [
                "Automação de rotinas, otimização de fluxos internos e padronização de documentos com Excel e VBA.",
                "Operação, consistência e lançamento estruturado de dados em sistemas acadêmicos corporativos.",
                "Extração de indicadores operacionais e suporte técnico-administrativo às coordenações de curso.",
            ],
            dados: [
                "Extração e análise de indicadores operacionais para suporte à decisão e melhoria contínua de processos.",
                "Estruturação de planilhas, padronização de bases e automação de fluxos de trabalho com Excel e VBA.",
                "Validação e lançamento de dados em sistemas acadêmicos com foco em integridade e rastreabilidade.",
            ],
        },
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
        highlightsByProfile: {
            geral: [
                "Análise de indicadores financeiros e operacionais para apoio à tomada de decisão estratégica.",
                "Extração, tratamento e visualização de dados utilizando Power BI, SQL e Excel Avançado.",
                "Identificação de padrões e tendências para otimização de processos internos.",
            ],
            dev: [
                "Extração e tratamento de dados com SQL e automação de rotinas de consolidação em Excel Avançado.",
                "Mapeamento de padrões e gargalos operacionais para otimização de processos internos.",
                "Construção de visualizações e painéis de indicadores financeiros e operacionais em Power BI.",
            ],
            dados: [
                "Análise de indicadores financeiros e operacionais para apoio direto à tomada de decisão estratégica.",
                "Extração, tratamento, modelagem e visualização de dados utilizando Power BI, SQL e Excel Avançado.",
                "Identificação de padrões, desvios e tendências para otimização de processos internos.",
            ],
        },
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
        tags: ["dev", "frontend"],
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
        tags: ["dev", "fullstack"],
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
        tags: ["dados", "bi"],
    },
    {
        id: "copilot-studio",
        title: "Copilot Studio: Multiagentes",
        provider: "Alura",
        workload: "",
        status: "Concluído",
        inProgress: false,
        meta: "Alura • Concluído",
        text: "Copilot Studio: Multiagentes - Alura.",
        tags: ["automacao", "dados", "ia"],
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
        slug: "geral",
        role: "Desenvolvedor Full Stack & Analista de Dados",
        summaryHint: "Currículo completo com todos os projetos, cursos e skills do site",
        projectsHeading: "Projetos em Destaque",
        sectionOrder: ["experience", "education", "skills", "projects", "bottom"],
        experienceOrder: ["udf-assistente", "bb-analista-dados"],
        educationOrder: ["pos-ciencia-dados", "bacharelado-cc"],
        skillGroups: [
            {
                label: "Desenvolvimento",
                items: [
                    "HTML5",
                    "CSS3",
                    "JavaScript",
                    "TypeScript",
                    "React",
                    "Vite",
                    "Angular",
                    "Flutter",
                ],
            },
            {
                label: "Back-end & Outras",
                items: ["Node.js", "APIs RESTful", "Python", "Java", "PHP", "Firebase"],
            },
            {
                label: "Dados & Ferramentas",
                items: [
                    "PostgreSQL",
                    "SQLite",
                    "Power BI",
                    "Streamlit",
                    "Excel & VBA",
                    "Git",
                    "GitHub",
                ],
            },
        ],
        projectIds: [
            "job-finder",
            "dashboard-salarios",
            "portfolio-pessoal",
            "pobreoke",
            "manscan",
            "jogo-adivinhacao",
            "estudos-javascript",
        ],
        courseIds: ["react-maestria", "js-node", "master-dax", "copilot-studio"],
    },
    {
        id: "dev",
        label: "Dev",
        slug: "dev",
        role: "Desenvolvedor Full Stack & Mobile",
        summaryHint: "Ênfase em desenvolvimento Full Stack, Mobile, APIs e projetos web",
        projectsHeading: "Projetos em Destaque",
        sectionOrder: ["experience", "education", "skills", "projects", "bottom"],
        experienceOrder: ["udf-assistente", "bb-analista-dados"],
        educationOrder: ["pos-ciencia-dados", "bacharelado-cc"],
        skillGroups: [
            {
                label: "Front-end & Mobile",
                items: ["React", "JavaScript", "TypeScript", "Vite", "HTML5/CSS3", "Flutter"],
            },
            {
                label: "Back-end & APIs",
                items: ["Node.js", "Express", "APIs RESTful", "PostgreSQL", "SQLite", "Firebase"],
            },
            {
                label: "Versionamento & Dados",
                items: ["Git", "GitHub", "GitHub Actions", "Python", "Excel & VBA"],
            },
        ],
        projectIds: [
            "job-finder",
            "portfolio-pessoal",
            "pobreoke",
            "manscan",
            "estudos-javascript",
        ],
        courseIds: ["react-maestria", "js-node"],
    },
    {
        id: "dados",
        label: "Dados & BI",
        slug: "dados",
        role: "Analista de Dados & Business Intelligence",
        summaryHint: "Ênfase em Power BI, SQL, Python, indicadores e análise de dados",
        projectsHeading: "Projetos em Destaque",
        sectionOrder: ["experience", "education", "skills", "projects", "bottom"],
        experienceOrder: ["udf-assistente", "bb-analista-dados"],
        educationOrder: ["pos-ciencia-dados", "bacharelado-cc"],
        skillGroups: [
            {
                label: "BI & Análise de Dados",
                items: ["Power BI", "DAX", "Python", "Pandas", "Streamlit", "Excel Avançado & VBA"],
            },
            {
                label: "Bancos & Consultas",
                items: ["SQL", "PostgreSQL", "SQLite", "Firebase"],
            },
            {
                label: "Automação & Web",
                items: ["JavaScript", "React", "Node.js", "APIs RESTful", "Git", "GitHub"],
            },
        ],
        projectIds: ["dashboard-salarios", "job-finder", "portfolio-pessoal"],
        courseIds: ["master-dax", "copilot-studio", "js-node"],
    },
];
