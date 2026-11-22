import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import ResumeModal from './components/ResumeModal';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Resume from './pages/Resume';
import Contact from './pages/Contact';
import { profileData, socialLinks } from './data/content';

const personStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profileData.fullName,
    alternateName: profileData.name,
    url: profileData.siteUrl,
    jobTitle: profileData.role,
    email: `mailto:${profileData.email}`,
    address: {
        '@type': 'PostalAddress',
        addressLocality: 'Brasília',
        addressRegion: 'DF',
        addressCountry: 'BR',
    },
    sameAs: socialLinks
        .filter((item) => item.id === 'linkedin' || item.id === 'github')
        .map((item) => item.href),
    knowsAbout: [
        'Desenvolvimento Full Stack',
        'Análise de Dados',
        'React',
        'Vite',
        'Node.js',
        'APIs RESTful',
        'Python',
        'Streamlit',
        'Power BI',
        'Excel e VBA',
        'Flutter',
        'Firebase',
        'PostgreSQL',
        'SQLite',
    ],
};

function App() {
    const [isResumeOpen, setIsResumeOpen] = useState(false);

    const openResume = () => setIsResumeOpen(true);
    const closeResume = () => setIsResumeOpen(false);

    return (
        <>
            <div className={`App ${isResumeOpen ? 'no-print' : ''}`}>
                <Helmet>
                    <html lang="pt-BR" />
                    <title>{`${profileData.name} | ${profileData.role}`}</title>
                    <meta name="description" content={profileData.description} />
                    <link rel="canonical" href={profileData.siteUrl} />

                    <meta property="og:locale" content="pt_BR" />
                    <meta property="og:title" content={`${profileData.name} | Portfólio Profissional`} />
                    <meta property="og:description" content={profileData.description} />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content={profileData.siteUrl} />
                    <meta property="og:image" content={profileData.ogImage} />

                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content={`${profileData.name} | ${profileData.role}`} />
                    <meta name="twitter:description" content={profileData.description} />
                    <meta name="twitter:image" content={profileData.ogImage} />

                    <script type="application/ld+json">
                        {JSON.stringify(personStructuredData)}
                    </script>
                </Helmet>

                <a className="skip-link" href="#conteudo-principal">
                    Pular para o conteúdo principal
                </a>

                <Navbar />

                <main id="conteudo-principal">
                    <Home onOpenResume={openResume} />
                    <About />
                    <Skills />
                    <Projects />
                    <Resume onOpenResume={openResume} />
                    <Contact />
                </main>

                <Footer />
                <BackToTop />
            </div>

            <ResumeModal isOpen={isResumeOpen} onClose={closeResume} />
        </>
    );
}

export default App;
