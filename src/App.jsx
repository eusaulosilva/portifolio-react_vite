
import Navbar from './components/Navbar'
import About from './pages/About'
import Home from './pages/Home';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Resume from './pages/Resume';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import { Helmet } from 'react-helmet-async';

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>Saulo Silva | Analista de Dados & Desenvolvedor Full Stack</title>
        <meta name="description" content="Portfólio profissional de Saulo Silva, Analista de Dados e Desenvolvedor Full Stack." />
        <link rel="canonical" href="https://eusaulosilva.com.br/" />

        {/* Open Graph para redes sociais */}
        <meta property="og:title" content="Saulo Silva | Portfólio Profissional" />
        <meta property="og:description" content="Analista de Dados no Banco do Brasil e Desenvolvedor Full Stack." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://eusaulosilva.com.br/" />
      </Helmet>
      <Navbar />
      <main>
        <Home />
        <About />
        <Skills />
        <Projects />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
