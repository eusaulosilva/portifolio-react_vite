# 💻 Portfólio Pessoal - Saulo Silva

Este repositório contém o código-fonte do meu portfólio, desenvolvido para centralizar a minha trajetória profissional, competências técnicas e projetos em destaque nas áreas de **Desenvolvimento Front-End** e **Análise de Dados**.

## 🛠️ Tecnologias e Dependências

O projeto utiliza as seguintes tecnologias principais:

- **React 19**: Biblioteca para construção de interfaces.
- **Vite**: Build tool otimizada para performance.
- **Bootstrap 5**: Estilização e componentes responsivos.
- **React Router Dom**: Gestão de rotas da aplicação.
- **ESLint**: Padronização e qualidade de código.

## 📁 Estrutura do Repositório

Com base na arquitetura do projeto, a estrutura está organizada da seguinte forma:

- **`.github/workflows/`**: Contém o ficheiro `deploy.yml` para CI/CD automatizado via FTP.
- **`public/img/`**: Armazena os assets estáticos, incluindo imagens de projetos como *ManScan*, *Job Finder* e *Número Secreto*.
- **`src/components/`**: Componentes React modulares (Navbar, ProjectCard, SkillItem, TimelineItem).
- **`src/pages/`**: Páginas principais da aplicação (Home, About, Projects, Resume, Skills, Contact).
- **`src/data/`**: Contém o ficheiro `content.js`, que serve como a "base de dados" de texto do site, facilitando a manutenção de conteúdo sem mexer na estrutura lógica.
- **`vite.config.js`**: Configuração do ambiente de build do Vite.

## 🚀 Fluxo de Deploy Automatizado

Este projeto possui um workflow de **GitHub Actions** configurado. Sempre que um `push` é realizado na branch principal:
1. O GitHub Actions inicia o processo de build.
2. Os ficheiros gerados na pasta `dist/` são transferidos automaticamente para o servidor via FTP, garantindo que o site esteja sempre atualizado com a última versão do código.

## 🔧 Como Executar Localmente

1. Clone o repositório:
    ```bash
    git clone https://github.com/eusaulosilva/portifolio-react_vite.git
    ```
2. Instale as dependências:
    ```bash
    npm install
    ```
3. Inicie o ambiente de desenvolvimento:
    ```bash
    npm run dev
    ```
4. Para gerar a build de produção:
    ```bash
    npm run build
    ```
