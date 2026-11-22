import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { BackToTop, Footer, Navbar } from './components/layout';
import { About, Contact, Home, Projects, Resume, Skills } from './sections';
import { profileData, socialLinks } from './data';
import { getSectionFromPath, isCvPath, scrollToSection } from './utils/scroll';

const ResumeModal = lazy(() => import('./components/resume/ResumeModal'));

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
    const [isResumeOpen, setIsResumeOpen] = useState(
        () => typeof window !== 'undefined' && isCvPath(window.location.pathname)
    );
    const previousPathRef = useRef('/');

    useEffect(() => {
        const syncFromLocation = (fromPopState = false) => {
            if (isCvPath(window.location.pathname)) {
                setIsResumeOpen(true);
                return;
            }

            if (fromPopState) {
                setIsResumeOpen(false);
            }

            if (window.location.hash) {
                const hashSection = window.location.hash.slice(1);
                scrollToSection(hashSection, null, {
                    updateHistory: true,
                    replace: true,
                });
                return;
            }

            const sectionId = getSectionFromPath(window.location.pathname);
            if (sectionId && (sectionId !== 'inicio' || fromPopState)) {
                scrollToSection(sectionId, null, { updateHistory: false });
            }
        };

        if (!isCvPath(window.location.pathname)) {
            syncFromLocation(false);
        }

        const handlePopState = () => syncFromLocation(true);
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    const openResume = () => {
        if (!isCvPath(window.location.pathname)) {
            previousPathRef.current = window.location.pathname || '/';
            window.history.pushState({ modal: 'cv' }, '', '/cv');
        }
        setIsResumeOpen(true);
    };

    const closeResume = () => {
        setIsResumeOpen(false);
        if (isCvPath(window.location.pathname)) {
            const returnPath = isCvPath(previousPathRef.current)
                ? '/'
                : previousPathRef.current;
            window.history.replaceState(null, '', returnPath);
        }
    };

    const handleSkipToContent = (event) => {
        scrollToSection('conteudo-principal', event);
        document.getElementById('conteudo-principal')?.focus();
    };

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

                <a
                    className="skip-link"
                    href="/"
                    onClick={handleSkipToContent}
                >
                    Pular para o conteúdo principal
                </a>

                <Navbar />

                <main id="conteudo-principal" tabIndex={-1}>
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

            {isResumeOpen && (
                <Suspense fallback={null}>
                    <ResumeModal isOpen={isResumeOpen} onClose={closeResume} />
                </Suspense>
            )}
        </>
    );
}

export default App;
