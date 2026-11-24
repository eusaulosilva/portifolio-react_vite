export const SECTION_PATHS = {
    inicio: '/inicio',
    sobre: '/sobre',
    skills: '/skills',
    projetos: '/projetos',
    curriculo: '/curriculo',
    contato: '/contato',
};

export const CV_BUILDER_PATHS = ['/cv/criar', '/cv/builder'];

export const CV_PRESET_PATHS = {
    '/cv': 'geral',
    '/cv/geral': 'geral',
    '/cv/dados': 'dados',
    '/cv/dev': 'dev',
    '/cv/fullstack': 'dev',
    '/curriculo-pdf': 'geral',
};

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

function normalizePath(pathname) {
    return (pathname || '/').replace(/\/+$/, '').toLowerCase() || '/';
}

/**
 * Resolve rotas do currículo sob /cv:
 * - /cv/criar -> painel privado de montagem
 * - /cv, /cv/geral, /cv/dados, /cv/dev -> visualização direta do preset
 * - /cv/:id (ex: /cv/v-d20f230) -> visualização direta da versão personalizada
 */
export function getCvRouteInfo(pathname) {
    const normalized = normalizePath(pathname);

    if (CV_BUILDER_PATHS.includes(normalized)) {
        return { mode: 'builder', profileId: null, versionSlug: null };
    }

    if (Object.prototype.hasOwnProperty.call(CV_PRESET_PATHS, normalized)) {
        return {
            mode: 'viewer',
            profileId: CV_PRESET_PATHS[normalized],
            versionSlug: null,
        };
    }

    const segments = normalized.split('/').filter(Boolean);
    if (segments.length === 2 && segments[0] === 'cv') {
        return { mode: 'viewer', profileId: null, versionSlug: segments[1] };
    }

    return null;
}

export function isCvPath(pathname) {
    return getCvRouteInfo(pathname) !== null;
}

export function getPathForSection(sectionId) {
    return SECTION_PATHS[sectionId] || '/';
}

export function getSectionFromPath(pathname) {
    const normalized = normalizePath(pathname);
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
