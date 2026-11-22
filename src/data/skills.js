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
