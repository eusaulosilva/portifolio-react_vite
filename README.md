# 💻 Portfólio Pessoal - Saulo Silva

Este repositório contém o código-fonte do meu portfólio profissional (`eusaulosilva.com.br`), desenvolvido para centralizar minha trajetória acadêmica e profissional, competências técnicas, projetos em destaque e gerador dinâmico de currículo A4 em PDF.

## 🛠️ Tecnologias

- **React 19**: Interface modular em componentes com code-splitting (`lazy`/`Suspense`).
- **Vite 7**: Empacotamento, versionamento automático de imagens (hash) e servidor de desenvolvimento.
- **CSS Modular Nativo**: Design system dark glassmorphism, responsivo e `@page` nativo para impressão A4/PDF.
- **React Helmet Async + Vite Plugin Sitemap**: SEO, Open Graph, JSON-LD e `sitemap.xml`.
- **ESLint**: Padronização e qualidade de código.

## 📄 Rotas de Currículo

- `/cv` (ou `/cv/geral`) — Currículo público completo em folha A4 fixa (pronto para leitura/PDF).
- `/cv/dados` — Currículo público focado em **Dados & BI**.
- `/cv/dev` — Currículo público focado em **Dev / Full Stack**.
- `/cv/:id` — Links curtos personalizados gerados pelo painel de criação.
- `/cv/criar` — Painel privado para montar e exportar versões personalizadas (também acessível via `Ctrl + Shift + E` ou 3 toques no nome no topo do `/cv` / copyright do rodapé).

## 📁 Estrutura do Projeto

```text
├── .github/workflows/deploy.yml   # CI/CD (lint, build e deploy FTP)
├── public/
│   ├── .htaccess                  # Fallback SPA, Gzip, cache e headers de segurança
│   ├── img/og-cover.jpg           # Capa Open Graph (1200×630)
│   ├── logo.png                   # Favicon
│   └── robots.txt
└── src/
    ├── assets/                    # Fundo do Hero e previews WebP dos projetos (hash via Vite)
    ├── components/
    │   ├── layout/                # Navbar, Footer e BackToTop
    │   ├── resume/                # ResumeModal, ResumeDocument, Pickers e TimelineItem
    │   └── ui/                    # Icons, ProjectCard, Reveal e SkillItem
    ├── data/                      # Dados separados por domínio (profile, skills, projects, resume)
    ├── hooks/                     # Hooks customizados (useActiveSection)
    ├── sections/                  # Seções da página (Home, About, Skills, Projects, Resume, Contact)
    ├── styles/                    # Estilos modulares (base, layout, sections, resume-modal)
    ├── utils/                     # Rotas/scroll (scroll.js) e codificação curta de CV (resumeCodec.js)
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
