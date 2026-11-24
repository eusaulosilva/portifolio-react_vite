import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import '../../styles/resume-modal.css';
import {
    coursesData,
    profileData,
    projectsData,
    resumeProfiles,
} from '../../data';
import { buildPublicResumePath, decodeShortResumeId } from '../../utils/resumeCodec';
import {
    CheckIcon,
    ChevronDownIcon,
    CloseIcon,
    CopyIcon,
    DownloadIcon,
    ExternalLinkIcon,
} from '../ui/Icons';
import ResumeCoursePicker from './ResumeCoursePicker';
import ResumeDocument from './ResumeDocument';
import ResumeProjectPicker from './ResumeProjectPicker';

const ALL_PROJECT_IDS = projectsData.map((project) => project.id);
const ALL_COURSE_IDS = coursesData.map((course) => course.id);
const DEFAULT_PROFILE = resumeProfiles[0];

const ZOOM_OPTIONS = [
    { id: 'fit', label: 'Ajustar' },
    { id: 0.75, label: '75%' },
    { id: 0.9, label: '90%' },
    { id: 1, label: '100%' },
];

const FOCUSABLE_SELECTOR =
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function resolveInitialConfig(routeProfileId, versionSlug) {
    // 1. Tenta decodificar rota curta /:id (ex: /v-d20f230)
    if (versionSlug) {
        const decoded = decodeShortResumeId(versionSlug);
        if (decoded) return decoded;
    }

    // 2. Preset pela rota (/geral, /dados, /dev) ou fallback com query params legados
    const search = typeof window !== 'undefined' ? window.location.search : '';
    const params = new URLSearchParams(search);

    const profileKey = routeProfileId || params.get('foco') || DEFAULT_PROFILE.id;
    const matchedProfile =
        resumeProfiles.find((p) => p.id === profileKey || p.slug === profileKey) ||
        DEFAULT_PROFILE;

    let projectIds = matchedProfile.projectIds;
    if (params.has('projetos')) {
        const raw = params.get('projetos') || '';
        projectIds =
            raw === 'nenhum' || raw === ''
                ? []
                : raw
                      .split(',')
                      .map((s) => s.trim())
                      .filter((id) => ALL_PROJECT_IDS.includes(id));
    }

    let courseIds = matchedProfile.courseIds;
    if (params.has('cursos')) {
        const raw = params.get('cursos') || '';
        courseIds =
            raw === 'nenhum' || raw === ''
                ? []
                : raw
                      .split(',')
                      .map((s) => s.trim())
                      .filter((id) => ALL_COURSE_IDS.includes(id));
    }

    const themeParam = params.get('cor');
    const theme = themeParam === 'classico' || themeParam === 'classic' ? 'classic' : 'purple';

    const densityParam = params.get('densidade');
    const density =
        densityParam === 'compacto' || densityParam === 'compact' ? 'compact' : 'comfortable';

    const showAdditionalInfo = params.get('info') !== '0';

    return {
        profileId: matchedProfile.id,
        projectIds,
        courseIds,
        theme,
        density,
        showAdditionalInfo,
    };
}

async function copyTextToClipboard(text) {
    if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return;
    }
    const input = document.createElement('textarea');
    input.value = text;
    input.setAttribute('readonly', '');
    input.style.position = 'fixed';
    input.style.opacity = '0';
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
}

export default function ResumeModal({
    isOpen,
    mode = 'viewer',
    routeProfileId = null,
    versionSlug = null,
    onOpenBuilder,
    onClose,
}) {
    const isViewerMode = mode === 'viewer';
    const initialConfig = useMemo(
        () => resolveInitialConfig(routeProfileId, versionSlug),
        [routeProfileId, versionSlug]
    );

    const [activeProfileId, setActiveProfileId] = useState(initialConfig.profileId);
    const [selectedProjectIds, setSelectedProjectIds] = useState(initialConfig.projectIds);
    const [selectedCourseIds, setSelectedCourseIds] = useState(initialConfig.courseIds);
    const [theme, setTheme] = useState(initialConfig.theme);
    const [density, setDensity] = useState(initialConfig.density);
    const [showAdditionalInfo, setShowAdditionalInfo] = useState(initialConfig.showAdditionalInfo);
    const [zoomMode, setZoomMode] = useState('fit');
    const [isMobileOptionsOpen, setIsMobileOptionsOpen] = useState(false);
    const [copiedLink, setCopiedLink] = useState(false);

    const [previewMetrics, setPreviewMetrics] = useState({
        containerWidth: 0,
        paperWidth: 0,
        paperHeight: 0,
    });

    const modalShellRef = useRef(null);
    const closeButtonRef = useRef(null);
    const previousFocusRef = useRef(null);
    const previewBodyRef = useRef(null);
    const paperMeasureRef = useRef(null);
    const copyTimerRef = useRef(null);
    const secretTapRef = useRef({ count: 0, lastAt: 0 });

    const activeProfile = useMemo(
        () => resumeProfiles.find((p) => p.id === activeProfileId) || DEFAULT_PROFILE,
        [activeProfileId]
    );

    const selectedProjects = useMemo(
        () => projectsData.filter((project) => selectedProjectIds.includes(project.id)),
        [selectedProjectIds]
    );

    // Preserva exatamente a ordem personalizada escolhida no seletor de cursos
    const selectedCourses = useMemo(() => {
        const map = new Map(coursesData.map((course) => [course.id, course]));
        return selectedCourseIds.map((id) => map.get(id)).filter(Boolean);
    }, [selectedCourseIds]);

    const currentConfig = useMemo(
        () => ({
            profileId: activeProfile.id,
            projectIds: selectedProjectIds,
            courseIds: selectedCourseIds,
            theme,
            density,
            showAdditionalInfo,
        }),
        [
            activeProfile.id,
            selectedProjectIds,
            selectedCourseIds,
            theme,
            density,
            showAdditionalInfo,
        ]
    );

    // Rota curta direta (/geral, /dados, /dev ou /v-... quando customizado)
    const publicShareInfo = useMemo(() => {
        const origin =
            typeof window !== 'undefined' && window.location.origin
                ? window.location.origin
                : profileData.siteUrl.replace(/\/$/, '');
        const relativePath = buildPublicResumePath(currentConfig);
        return {
            relativePath,
            fullUrl: `${origin}${relativePath}`,
        };
    }, [currentConfig]);

    // Focus trap, Esc e bloqueio de scroll da página atrás do modal
    useEffect(() => {
        if (!isOpen) return;

        previousFocusRef.current = document.activeElement;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        closeButtonRef.current?.focus();

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
                return;
            }

            if (event.key === 'Tab' && modalShellRef.current) {
                const focusables = Array.from(
                    modalShellRef.current.querySelectorAll(FOCUSABLE_SELECTOR)
                ).filter((el) => el.offsetParent !== null);

                if (focusables.length === 0) return;

                const first = focusables[0];
                const last = focusables[focusables.length - 1];

                if (event.shiftKey) {
                    if (
                        document.activeElement === first ||
                        !modalShellRef.current.contains(document.activeElement)
                    ) {
                        event.preventDefault();
                        last.focus();
                    }
                } else if (
                    document.activeElement === last ||
                    !modalShellRef.current.contains(document.activeElement)
                ) {
                    event.preventDefault();
                    first.focus();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', handleKeyDown);
            if (copyTimerRef.current) {
                clearTimeout(copyTimerRef.current);
            }
            if (previousFocusRef.current instanceof HTMLElement) {
                previousFocusRef.current.focus();
            }
        };
    }, [isOpen, onClose]);

    // Escala visual da folha A4 fixa (210mm x 297mm) para caber na tela em desktop e mobile
    useEffect(() => {
        if (!isOpen) return;

        const updateMeasurements = () => {
            const containerEl = previewBodyRef.current;
            const paperEl = paperMeasureRef.current;
            if (!containerEl || !paperEl) return;

            const style = window.getComputedStyle(containerEl);
            const padX =
                parseFloat(style.paddingLeft || '0') + parseFloat(style.paddingRight || '0');
            const containerWidth = Math.max(0, containerEl.clientWidth - padX);
            const paperWidth = paperEl.offsetWidth;
            const paperHeight = paperEl.offsetHeight;

            setPreviewMetrics({
                containerWidth,
                paperWidth,
                paperHeight,
            });
        };

        updateMeasurements();

        const observer =
            typeof ResizeObserver !== 'undefined'
                ? new ResizeObserver(updateMeasurements)
                : null;

        if (observer && previewBodyRef.current) {
            observer.observe(previewBodyRef.current);
        }
        if (observer && paperMeasureRef.current) {
            observer.observe(paperMeasureRef.current);
        }

        window.addEventListener('resize', updateMeasurements);
        return () => {
            observer?.disconnect();
            window.removeEventListener('resize', updateMeasurements);
        };
    }, [
        isOpen,
        isViewerMode,
        selectedProjectIds,
        selectedCourseIds,
        density,
        showAdditionalInfo,
        activeProfileId,
    ]);

    if (!isOpen) return null;

    // Acesso discreto ao /criar no celular/desktop: 3 toques rápidos no seu nome na barra pública
    const handleSecretTitleTap = () => {
        if (!isViewerMode || !onOpenBuilder) return;
        const now = Date.now();
        if (now - secretTapRef.current.lastAt > 900) {
            secretTapRef.current = { count: 1, lastAt: now };
            return;
        }
        const nextCount = secretTapRef.current.count + 1;
        if (nextCount >= 3) {
            secretTapRef.current = { count: 0, lastAt: 0 };
            onOpenBuilder();
        } else {
            secretTapRef.current = { count: nextCount, lastAt: now };
        }
    };

    const handleSelectProfile = (profile) => {
        setActiveProfileId(profile.id);
        setSelectedProjectIds(profile.projectIds);
        setSelectedCourseIds(profile.courseIds);
    };

    const toggleProject = (projectId) => {
        setSelectedProjectIds((prev) =>
            prev.includes(projectId)
                ? prev.filter((id) => id !== projectId)
                : [...prev, projectId]
        );
    };

    const toggleCourse = (courseId) => {
        setSelectedCourseIds((prev) =>
            prev.includes(courseId)
                ? prev.filter((id) => id !== courseId)
                : [...prev, courseId]
        );
    };

    const moveCourse = (courseId, direction) => {
        setSelectedCourseIds((prev) => {
            const idx = prev.indexOf(courseId);
            const target = idx + direction;
            if (idx === -1 || target < 0 || target >= prev.length) return prev;
            const next = [...prev];
            [next[idx], next[target]] = [next[target], next[idx]];
            return next;
        });
    };

    const handleCopyLink = async () => {
        try {
            await copyTextToClipboard(publicShareInfo.fullUrl);
            setCopiedLink(true);
            if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
            copyTimerRef.current = setTimeout(() => setCopiedLink(false), 2200);
        } catch {
            setCopiedLink(false);
        }
    };

    const handleDownloadPdf = () => {
        const originalTitle = document.title;
        const safeName = profileData.fullName
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/\s+/g, '-');

        document.title = `Curriculo-${safeName}`;

        let restored = false;
        const restoreTitle = () => {
            if (restored) return;
            restored = true;
            document.title = originalTitle;
            window.removeEventListener('afterprint', restoreTitle);
            window.removeEventListener('focus', handleFocusRestore);
        };

        const handleFocusRestore = () => {
            setTimeout(restoreTitle, 300);
        };

        window.addEventListener('afterprint', restoreTitle, { once: true });
        window.addEventListener('focus', handleFocusRestore, { once: true });
        window.print();
    };

    // Escala a folha fixa A4 (210mm) para caber proporcionalmente em qualquer tela sem alterar o layout A4
    const fitScale =
        previewMetrics.containerWidth > 0 && previewMetrics.paperWidth > 0
            ? Math.min(1, Math.max(0.32, previewMetrics.containerWidth / previewMetrics.paperWidth))
            : 1;

    const activeScale = zoomMode === 'fit' ? fitScale : zoomMode;
    const isScaled = activeScale < 0.995;

    const stageStyle =
        isScaled && previewMetrics.paperWidth > 0 && previewMetrics.paperHeight > 0
            ? {
                  width: `${Math.round(previewMetrics.paperWidth * activeScale)}px`,
                  height: `${Math.round(previewMetrics.paperHeight * activeScale)}px`,
              }
            : undefined;

    const scaleStyle = isScaled
        ? {
              transform: `scale(${activeScale})`,
              transformOrigin: 'top left',
          }
        : undefined;

    const previewDocument = (
        <div className="resume-modal-body" ref={previewBodyRef}>
            <div className="resume-paper-stage" style={stageStyle}>
                <div
                    className="resume-paper-scale"
                    ref={paperMeasureRef}
                    style={scaleStyle}
                >
                    <ResumeDocument
                        selectedProjects={selectedProjects}
                        selectedCourses={selectedCourses}
                        profile={activeProfile}
                        theme={theme}
                        density={density}
                        showAdditionalInfo={showAdditionalInfo}
                    />
                </div>
            </div>
        </div>
    );

    const zoomBar = (
        <div className="resume-zoom-controls" role="group" aria-label="Zoom da folha A4">
            {ZOOM_OPTIONS.map((option) => (
                <button
                    key={String(option.id)}
                    type="button"
                    className={`resume-zoom-btn ${zoomMode === option.id ? 'active' : ''}`}
                    onClick={() => setZoomMode(option.id)}
                    aria-pressed={zoomMode === option.id}
                >
                    {option.label}
                </button>
            ))}
            <span className="resume-zoom-readout" aria-live="polite">
                {Math.round(activeScale * 100)}%
            </span>
        </div>
    );

    const modalContent = (
        <div
            className={`resume-modal-overlay ${isViewerMode ? 'is-viewer-mode' : ''}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="resume-modal-title"
            onClick={(e) => {
                if (!isViewerMode && e.target === e.currentTarget) onClose();
            }}
        >
            <div
                className={`resume-modal-shell ${isViewerMode ? 'is-viewer-mode' : ''}`}
                ref={modalShellRef}
            >
                {isViewerMode ? (
                    /* Rotas diretas (/geral, /dados, /dev, /:id): somente o arquivo A4 pronto, sem editor */
                    <div className="resume-preview-pane resume-viewer-pane">
                        <header className="resume-viewer-topbar no-print">
                            <div
                                className="resume-modal-toolbar-info resume-viewer-title"
                                onClick={handleSecretTitleTap}
                            >
                                <h2 id="resume-modal-title">{profileData.fullName}</h2>
                                <span className="resume-modal-hint">{activeProfile.role}</span>
                            </div>

                            <div className="resume-viewer-zoom">{zoomBar}</div>

                            <div className="resume-viewer-actions">
                                <button
                                    type="button"
                                    className="resume-btn-print resume-viewer-print-btn"
                                    onClick={handleDownloadPdf}
                                >
                                    <DownloadIcon size={15} />
                                    <span>Salvar em PDF</span>
                                </button>

                                <button
                                    ref={closeButtonRef}
                                    type="button"
                                    className="resume-btn-portfolio"
                                    onClick={onClose}
                                >
                                    <span>Portfólio</span>
                                    <ExternalLinkIcon size={13} />
                                </button>
                            </div>
                        </header>

                        {previewDocument}
                    </div>
                ) : (
                    /* Painel Privado isolado em /cv/criar */
                    <>
                        <aside className="resume-sidebar">
                            <div className="resume-modal-toolbar-info">
                                <h2 id="resume-modal-title">Criar Currículo</h2>
                                <span className="resume-modal-hint">
                                    Painel /cv/criar • Folha A4 fixa
                                </span>
                            </div>

                            <div className="resume-sidebar-close-wrap">
                                <button
                                    ref={closeButtonRef}
                                    type="button"
                                    className="resume-btn-close"
                                    onClick={onClose}
                                    aria-label="Voltar ao portfólio"
                                >
                                    <CloseIcon size={19} />
                                </button>
                            </div>

                            {/* Botão recolhível para telas menores no painel /criar */}
                            <button
                                type="button"
                                className={`resume-mobile-options-toggle ${isMobileOptionsOpen ? 'is-open' : ''}`}
                                onClick={() => setIsMobileOptionsOpen((prev) => !prev)}
                                aria-expanded={isMobileOptionsOpen}
                                aria-controls="resume-sidebar-controls"
                            >
                                <span className="resume-mobile-toggle-text">
                                    <strong>Personalizar</strong>
                                    <span>
                                        {activeProfile.label} •{' '}
                                        {density === 'compact' ? 'Compacto' : 'Padrão'} •{' '}
                                        {selectedProjects.length}p · {selectedCourses.length}c
                                    </span>
                                </span>
                                <ChevronDownIcon size={17} className="resume-mobile-toggle-icon" />
                            </button>

                            <div
                                id="resume-sidebar-controls"
                                className={`resume-sidebar-body ${isMobileOptionsOpen ? 'is-mobile-open' : ''}`}
                            >
                                {/* 1. Foco da vaga estrutural */}
                                <div className="resume-control-group">
                                    <span className="resume-picker-label">Foco da vaga</span>
                                    <div
                                        className="resume-segmented"
                                        role="group"
                                        aria-label="Escolher foco do currículo"
                                    >
                                        {resumeProfiles.map((profile) => (
                                            <button
                                                key={profile.id}
                                                type="button"
                                                className={`resume-seg-btn ${activeProfileId === profile.id ? 'active' : ''}`}
                                                onClick={() => handleSelectProfile(profile)}
                                                aria-pressed={activeProfileId === profile.id}
                                            >
                                                {profile.label}
                                            </button>
                                        ))}
                                    </div>
                                    <p className="resume-profile-hint">
                                        {activeProfile.summaryHint}
                                    </p>
                                </div>

                                {/* 2. Escolha direta entre Padrão ou Compacto */}
                                <div className="resume-setting-row">
                                    <span className="resume-picker-label">Modo A4</span>
                                    <div
                                        className="resume-segmented resume-segmented-compact"
                                        role="group"
                                        aria-label="Modo de densidade do currículo"
                                    >
                                        <button
                                            type="button"
                                            className={`resume-seg-btn ${density === 'comfortable' ? 'active' : ''}`}
                                            onClick={() => setDensity('comfortable')}
                                            aria-pressed={density === 'comfortable'}
                                        >
                                            Padrão
                                        </button>
                                        <button
                                            type="button"
                                            className={`resume-seg-btn ${density === 'compact' ? 'active' : ''}`}
                                            onClick={() => setDensity('compact')}
                                            aria-pressed={density === 'compact'}
                                        >
                                            Compacto
                                        </button>
                                    </div>
                                </div>

                                {/* 3. Cor de destaque */}
                                <div className="resume-setting-row">
                                    <span className="resume-picker-label">Cor</span>
                                    <div
                                        className="resume-segmented resume-segmented-compact"
                                        role="group"
                                        aria-label="Cor de destaque do currículo"
                                    >
                                        <button
                                            type="button"
                                            className={`resume-seg-btn ${theme === 'purple' ? 'active' : ''}`}
                                            onClick={() => setTheme('purple')}
                                            aria-pressed={theme === 'purple'}
                                        >
                                            Roxo
                                        </button>
                                        <button
                                            type="button"
                                            className={`resume-seg-btn ${theme === 'classic' ? 'active' : ''}`}
                                            onClick={() => setTheme('classic')}
                                            aria-pressed={theme === 'classic'}
                                        >
                                            Clássico
                                        </button>
                                    </div>
                                </div>

                                {/* 4. Projetos (1-3 = 1 col; 4+ = 2 cols) */}
                                <div className="resume-control-divider" aria-hidden="true" />
                                <ResumeProjectPicker
                                    projects={projectsData}
                                    selectedIds={selectedProjectIds}
                                    defaultIds={activeProfile.projectIds}
                                    allIds={ALL_PROJECT_IDS}
                                    onSelectIds={setSelectedProjectIds}
                                    onToggleProject={toggleProject}
                                />

                                {/* 5. Cursos (seleção livre + reordenação) */}
                                <div className="resume-control-divider" aria-hidden="true" />
                                <ResumeCoursePicker
                                    courses={coursesData}
                                    selectedIds={selectedCourseIds}
                                    defaultIds={activeProfile.courseIds}
                                    allIds={ALL_COURSE_IDS}
                                    onSelectIds={setSelectedCourseIds}
                                    onToggleCourse={toggleCourse}
                                    onMoveCourse={moveCourse}
                                />

                                {/* 6. Extra */}
                                <div className="resume-control-divider" aria-hidden="true" />
                                <div className="resume-control-group">
                                    <span className="resume-picker-label">Extra</span>
                                    <div className="resume-option-toggles">
                                        <button
                                            type="button"
                                            className={`resume-picker-chip ${showAdditionalInfo ? 'selected' : ''}`}
                                            onClick={() => setShowAdditionalInfo((prev) => !prev)}
                                            aria-pressed={showAdditionalInfo}
                                        >
                                            <span className="resume-chip-check" aria-hidden="true">
                                                {showAdditionalInfo && <CheckIcon size={11} />}
                                            </span>
                                            <span className="resume-chip-info">
                                                <span className="resume-chip-title">
                                                    Informações Adicionais
                                                </span>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="resume-sidebar-footer">
                                <div className="resume-footer-actions">
                                    <button
                                        type="button"
                                        className="resume-btn-print"
                                        onClick={handleDownloadPdf}
                                    >
                                        <DownloadIcon size={16} />
                                        <span>Salvar em PDF</span>
                                    </button>

                                    <div className="resume-share-row">
                                        <button
                                            type="button"
                                            className={`resume-btn-copy ${copiedLink ? 'is-copied' : ''}`}
                                            onClick={handleCopyLink}
                                            aria-label="Copiar link direto do currículo"
                                            title={`Copiar ${publicShareInfo.relativePath}`}
                                        >
                                            {copiedLink ? (
                                                <CheckIcon size={15} />
                                            ) : (
                                                <CopyIcon size={15} />
                                            )}
                                            <span className="resume-btn-copy-label">
                                                {copiedLink
                                                    ? 'Link copiado!'
                                                    : `Copiar ${publicShareInfo.relativePath}`}
                                            </span>
                                        </button>

                                        <a
                                            href={publicShareInfo.relativePath}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="resume-btn-open-public"
                                            aria-label="Abrir arquivo direto em nova aba"
                                            title={`Abrir ${publicShareInfo.relativePath} em nova aba`}
                                        >
                                            <ExternalLinkIcon size={14} />
                                        </a>
                                    </div>
                                </div>

                                <p className="resume-sidebar-note">
                                    Link direto ({publicShareInfo.relativePath}) abre só o arquivo
                                    A4 pronto.
                                </p>
                            </div>
                        </aside>

                        {/* Área direita: Folha A4 fixa com controle de zoom */}
                        <div className="resume-preview-pane">
                            <div className="resume-preview-bar no-print">
                                <span className="resume-preview-status">
                                    {activeProfile.label} •{' '}
                                    {density === 'compact' ? 'Compacto' : 'Padrão'} •{' '}
                                    {theme === 'purple' ? 'Roxo' : 'Clássico'}
                                </span>

                                {zoomBar}
                            </div>

                            {previewDocument}
                        </div>
                    </>
                )}
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}
