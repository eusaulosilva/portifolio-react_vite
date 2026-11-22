export const profileData = {
    name: "Saulo Silva",
    fullName: "Saulo José da Silva Oliveira",
    brand: "Saulo",
    brandAccent: ".dev",
    role: "Desenvolvedor Full Stack & Analista de Dados",
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
    { id: "inicio", label: "Início", path: "/inicio" },
    { id: "sobre", label: "Sobre mim", path: "/sobre" },
    { id: "skills", label: "Skills", path: "/skills" },
    { id: "projetos", label: "Projetos", path: "/projetos" },
    { id: "curriculo", label: "Currículo", path: "/curriculo" },
    { id: "contato", label: "Contato", path: "/contato" },
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
];

export const aboutHighlights = [
    {
        id: "formacao",
        icon: "graduation",
        title: "Ciência da Computação",
        subtitle:
            "Bacharelado concluído (UDF) + Pós-Graduação em Ciência de Dados e Big Data (conclusão Jun/2027)",
    },
    {
        id: "dados",
        icon: "database",
        title: "Análise de Dados & BI",
        subtitle:
            "Experiência na BB Administradora de Consórcios S.A. e UDF com Power BI, SQL, Python, Streamlit e Excel/VBA",
    },
    {
        id: "fullstack",
        icon: "code",
        title: "Full Stack & Mobile",
        subtitle:
            "Aplicações web e mobile com React, Vite, Node.js, APIs RESTful, Firebase, SQLite e Flutter",
    },
];
