import { coursesData, projectsData, resumeProfiles } from '../data';

const PROFILE_TO_CODE = {
    geral: 'g',
    dev: 'v',
    dados: 'd',
};

const CODE_TO_PROFILE = {
    g: 'geral',
    v: 'dev',
    d: 'dados',
};

function arraysEqualExact(a, b) {
    return a.length === b.length && a.every((item, index) => item === b[index]);
}

export function isPresetUnchanged(config, profile) {
    return (
        config.theme === 'purple' &&
        config.density === 'comfortable' &&
        config.showAdditionalInfo !== false &&
        arraysEqualExact(config.projectIds, profile.projectIds) &&
        arraysEqualExact(config.courseIds, profile.courseIds)
    );
}

/**
 * Codifica uma configuração personalizada em um ID curto universal (ex: "v-d20f230")
 * que funciona em qualquer navegador/dispositivo sem precisar de banco de dados.
 */
export function encodeShortResumeId(config) {
    const profileCode = PROFILE_TO_CODE[config.profileId] || 'g';

    let flags = 0;
    if (config.theme === 'classic') flags |= 1;
    if (config.density === 'compact') flags |= 2;
    if (config.showAdditionalInfo === false) flags |= 8;
    const flagsHex = flags.toString(16);

    let projMask = 0;
    projectsData.forEach((project, idx) => {
        if (config.projectIds.includes(project.id)) {
            projMask |= 1 << idx;
        }
    });
    const projHex = projMask.toString(16).padStart(2, '0');

    const courseDigits = config.courseIds
        .map((id) => coursesData.findIndex((c) => c.id === id))
        .filter((idx) => idx >= 0 && idx < 10)
        .join('');

    return `v-${profileCode}${flagsHex}${projHex}${courseDigits || 'n'}`;
}

export function decodeShortResumeId(slug) {
    const normalized = (slug || '').trim().toLowerCase();
    if (!normalized.startsWith('v-')) return null;

    const payload = normalized.slice(2);
    if (payload.length < 5) return null;

    const profileId = CODE_TO_PROFILE[payload[0]];
    if (!profileId) return null;

    const flags = parseInt(payload[1], 16);
    const projMask = parseInt(payload.slice(2, 4), 16);
    if (Number.isNaN(flags) || Number.isNaN(projMask)) return null;

    const projectIds = projectsData
        .filter((_, idx) => (projMask & (1 << idx)) !== 0)
        .map((p) => p.id);

    const coursesPart = payload.slice(4);
    const courseIds =
        coursesPart === 'n'
            ? []
            : Array.from(coursesPart)
                  .map((ch) => parseInt(ch, 10))
                  .filter((idx) => !Number.isNaN(idx) && idx >= 0 && idx < coursesData.length)
                  .map((idx) => coursesData[idx].id);

    return {
        profileId,
        theme: (flags & 1) !== 0 ? 'classic' : 'purple',
        density: (flags & 2) !== 0 ? 'compact' : 'comfortable',
        showAdditionalInfo: (flags & 8) === 0,
        projectIds,
        courseIds,
    };
}

export function buildPublicResumePath(config) {
    const profile =
        resumeProfiles.find((p) => p.id === config.profileId) || resumeProfiles[0];

    if (isPresetUnchanged(config, profile)) {
        return profile.id === 'geral' ? '/cv' : `/cv/${profile.slug}`;
    }

    return `/cv/${encodeShortResumeId(config)}`;
}
