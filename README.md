# 💻 Portfólio Pessoal - Saulo Silva

Este repositório contém o código-fonte do meu portfólio profissional (`eusaulosilva.com.br`), desenvolvido para centralizar minha trajetória acadêmica e profissional, competências técnicas, projetos em destaque e gerador dinâmico de currículo em PDF.

## 🛠️ Tecnologias

- **React 19**: Interface modular em componentes.
- **Vite 7**: Empacotamento e servidor de desenvolvimento de alta performance.
- **CSS Modular Nativo**: Design system dark glassmorphism, responsivo e `@page` nativo para impressão A4/PDF.
- **React Helmet Async + Vite Plugin Sitemap**: SEO, Open Graph, JSON-LD e `sitemap.xml`.
- **ESLint**: Padronização e qualidade de código.

## 📁 Estrutura do Projeto

```text
├── .github/workflows/deploy.yml   # CI/CD (lint, build e deploy FTP)
├── public/
│   ├── img/                       # Previews WebP/SVG dos projetos e capa Open Graph
│   ├── logo.png                   # Favicon
│   └── robots.txt
└── src/
    ├── assets/                    # Fundo otimizado do Hero gerenciado pelo Vite
    ├── components/
    │   ├── layout/                # Navbar, Footer e BackToTop
    │   ├── resume/                # ResumeModal, ResumeDocument, ResumeProjectPicker e TimelineItem
    │   └── ui/                    # Icons, ProjectCard, Reveal e SkillItem
    ├── data/                      # Dados separados por domínio (profile, skills, projects, resume)
    ├── hooks/                     # Hooks customizados (useActiveSection)
    ├── sections/                  # Seções da página (Home, About, Skills, Projects, Resume, Contact)
    ├── styles/                    # Estilos modulares (base, layout, sections, resume-modal)
    ├── App.jsx
    └── main.jsx
```

## 🔧 Como Executar Localmente

```bash
git clone https://github.com/eusaulosilva/portifolio-react_vite.git
cd portifolio-react_vite
npm ci
npm run dev
```

Para validar lint e gerar a build de produção:

```bash
npm run lint
npm run build
```
