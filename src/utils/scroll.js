export const SECTION_PATHS = {
    inicio: '/inicio',
    sobre: '/sobre',
    skills: '/skills',
    projetos: '/projetos',
    curriculo: '/curriculo',
    contato: '/contato',
};

export const CV_PATHS = ['/cv', '/curriculo-pdf'];

const PATH_TO_SECTION = Object.fromEntries(
    Object.entries(SECTION_PATHS).map(([id, path]) => [path, id])
);

let ignoreScrollSyncUntil = 0;

export function isProgrammaticScrolling() {
    return Date.now() < ignoreScrollSyncUntil;
}

export function clearProgrammaticScrolling() {
    ignoreScrollSyncUntil = 0;
}

export function isCvPath(pathname) {
    const normalized = (pathname || '/').replace(/\/+$/, '').toLowerCase() || '/';
    return CV_PATHS.includes(normalized);
}

export function getPathForSection(sectionId) {
    return SECTION_PATHS[sectionId] || '/';
}

export function getSectionFromPath(pathname) {
    const normalized = (pathname || '/').replace(/\/+$/, '') || '/';
    if (normalized === '/') return 'inicio';
    return PATH_TO_SECTION[normalized] || null;
}

export function scrollToSection(sectionId, event, { updateHistory = true, replace = false } = {}) {
    if (event) {
        event.preventDefault();
    }

    ignoreScrollSyncUntil = Date.now() + 800;

    const targetSection = !sectionId || sectionId === 'conteudo-principal' ? 'inicio' : sectionId;
    window.dispatchEvent(
        new CustomEvent('portfolio:navigate', { detail: { sectionId: targetSection } })
    );

    if (!sectionId || sectionId === 'inicio') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        const target = document.getElementById(sectionId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    if (updateHistory) {
        const nextPath = sectionId === 'conteudo-principal' ? '/' : getPathForSection(sectionId);
        const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
        if (currentUrl !== nextPath) {
            const method = replace ? 'replaceState' : 'pushState';
            window.history[method]({ sectionId }, '', nextPath);
        }
    }
}
