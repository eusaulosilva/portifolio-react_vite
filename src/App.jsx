import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { BackToTop, Footer, Navbar } from './components/layout';
import { About, Contact, Home, Projects, Resume, Skills } from './sections';
import { profileData, socialLinks } from './data';
import { getCvRouteInfo, getSectionFromPath, isCvPath, scrollToSection } from './utils/scroll';

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

function getInitialCvState() {
    if (typeof window === 'undefined') {
        return { isOpen: false, mode: 'viewer', routeProfileId: null, versionSlug: null };
    }
    const route = getCvRouteInfo(window.location.pathname);
    if (!route) {
        return { isOpen: false, mode: 'viewer', routeProfileId: null, versionSlug: null };
    }
    return {
        isOpen: true,
        mode: route.mode,
        routeProfileId: route.profileId,
        versionSlug: route.versionSlug,
    };
}

function App() {
    const [cvState, setCvState] = useState(getInitialCvState);
    const previousPathRef = useRef('/');

    // Painel privado (/cv/criar): acessível via URL, Ctrl+Shift+E ou 3 toques no rodapé / nome no topo do CV
    const openPrivateBuilder = useCallback(() => {
        if (!isCvPath(window.location.pathname)) {
            previousPathRef.current = window.location.pathname || '/';
        }
        window.history.pushState({ modal: 'cv-criar' }, '', '/cv/criar');
        setCvState((prev) => ({
            isOpen: true,
            mode: 'builder',
            routeProfileId: prev.isOpen ? prev.routeProfileId : null,
            versionSlug: prev.isOpen ? prev.versionSlug : null,
        }));
    }, []);

    useEffect(() => {
        const syncFromLocation = (fromPopState = false) => {
            const cvRoute = getCvRouteInfo(window.location.pathname);
            if (cvRoute) {
                setCvState({
                    isOpen: true,
                    mode: cvRoute.mode,
                    routeProfileId: cvRoute.profileId,
                    versionSlug: cvRoute.versionSlug,
                });
                return;
            }

            if (fromPopState) {
                setCvState({
                    isOpen: false,
                    mode: 'viewer',
                    routeProfileId: null,
                    versionSlug: null,
                });
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
        const handleGlobalShortcut = (event) => {
            if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'e') {
                event.preventDefault();
                openPrivateBuilder();
            }
        };

        window.addEventListener('popstate', handlePopState);
        window.addEventListener('keydown', handleGlobalShortcut);
        return () => {
            window.removeEventListener('popstate', handlePopState);
            window.removeEventListener('keydown', handleGlobalShortcut);
        };
    }, [openPrivateBuilder]);

    // Botões públicos do portfólio abrem direto o currículo pronto (/cv), sem editor
    const openPublicResume = () => {
        if (!isCvPath(window.location.pathname)) {
            previousPathRef.current = window.location.pathname || '/';
            window.history.pushState({ modal: 'cv' }, '', '/cv');
        }
        setCvState({ isOpen: true, mode: 'viewer', routeProfileId: 'geral', versionSlug: null });
    };

    const closeResume = () => {
        setCvState({ isOpen: false, mode: 'viewer', routeProfileId: null, versionSlug: null });
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

    const pageTitle = (() => {
        if (!cvState.isOpen) return `${profileData.name} | ${profileData.role}`;
        if (cvState.mode === 'builder') return `Criar Currículo | ${profileData.name}`;
        if (cvState.routeProfileId === 'dados') return `Currículo (Dados & BI) | ${profileData.name}`;
        if (cvState.routeProfileId === 'dev') return `Currículo (Dev) | ${profileData.name}`;
        return `Currículo | ${profileData.name}`;
    })();

    const resumeModalKey = `${cvState.mode}-${cvState.routeProfileId || cvState.versionSlug || 'geral'}`;

    return (
        <>
            <div className={`App ${cvState.isOpen ? 'no-print' : ''}`}>
                <Helmet>
                    <html lang="pt-BR" />
                    <title>{pageTitle}</title>
                    {cvState.isOpen && cvState.mode === 'builder' && (
                        <meta name="robots" content="noindex, nofollow" />
                    )}
                    <meta name="description" content={profileData.description} />
                    <link rel="canonical" href={profileData.siteUrl} />

                    <meta property="og:locale" content="pt_BR" />
                    <meta property="og:title" content={`${profileData.name} | Portfólio Profissional`} />
                    <meta property="og:description" content={profileData.description} />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content={profileData.siteUrl} />
                    <meta property="og:image" content={profileData.ogImage} />
                    <meta property="og:image:width" content="1200" />
                    <meta property="og:image:height" content="630" />
                    <meta
                        property="og:image:alt"
                        content={`${profileData.name} — ${profileData.role}`}
                    />

                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content={`${profileData.name} | ${profileData.role}`} />
                    <meta name="twitter:description" content={profileData.description} />
                    <meta name="twitter:image" content={profileData.ogImage} />
                    <meta
                        name="twitter:image:alt"
                        content={`${profileData.name} — ${profileData.role}`}
                    />

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
                    <Home onOpenResume={openPublicResume} />
                    <About />
                    <Skills />
                    <Projects />
                    <Resume onOpenResume={openPublicResume} />
                    <Contact />
                </main>

                <Footer onOpenBuilder={openPrivateBuilder} />
                <BackToTop />
            </div>

            {cvState.isOpen && (
                <Suspense fallback={null}>
                    <ResumeModal
                        key={resumeModalKey}
                        isOpen={cvState.isOpen}
                        mode={cvState.mode}
                        routeProfileId={cvState.routeProfileId}
                        versionSlug={cvState.versionSlug}
                        onOpenBuilder={openPrivateBuilder}
                        onClose={closeResume}
                    />
                </Suspense>
            )}
        </>
    );
}

export default App;
