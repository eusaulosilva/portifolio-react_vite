# 💻 Portfólio Pessoal - Saulo Silva

Este repositório contém o código-fonte do meu portfólio profissional (`eusaulosilva.com.br`), desenvolvido para centralizar minha trajetória acadêmica e profissional, competências técnicas e projetos em destaque nas áreas de **Desenvolvimento Full Stack** e **Análise de Dados**.

## 🛠️ Tecnologias e Dependências

- **React 19**: Construção da interface modular.
- **Vite 7**: Empacotamento e servidor de desenvolvimento de alta performance.
- **CSS Modular Nativo (Glassmorphism + Grid/Flexbox)**: Zero overhead de CSS externo não utilizado.
- **React Helmet Async + Vite Plugin Sitemap**: SEO, Open Graph, JSON-LD e geração de `sitemap.xml`.
- **ESLint**: Padronização e qualidade de código.

## 📁 Estrutura do Repositório

- **`.github/workflows/deploy.yml`**: CI/CD automatizado via GitHub Actions (lint, build e deploy FTP).
- **`public/`**: Ativos estáticos otimizados em WebP, favicon, imagem Open Graph e `robots.txt`.
- **`src/assets/`**: Imagem de fundo otimizada do Hero gerenciada pelo Vite.
- **`src/components/`**: Componentes reutilizáveis (`Navbar`, `Footer`, `ProjectCard`, `SkillItem`, `TimelineItem`, `Icons`, `Reveal`, `BackToTop`, `ResumeModal` para geração dinâmica de currículo A4/PDF).
- **`src/hooks/`**: Hooks customizados (`useActiveSection` para scroll spy e barra de progresso).
- **`src/pages/`**: Seções da aplicação (`Home`, `About`, `Skills`, `Projects`, `Resume`, `Contact`).
- **`src/data/content.js`**: Fonte centralizada de dados (perfil, navegação, redes sociais, skills, projetos, educação, experiência e cursos).

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
