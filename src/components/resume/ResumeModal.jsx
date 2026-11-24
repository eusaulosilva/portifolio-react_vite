import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import '../../styles/resume-modal.css';
import {
    coursesData,
    profileData,
    projectsData,
    resumeProfiles,
    resumeSkillGroups,
} from '../../data';
import {
    CheckIcon,
    ChevronDownIcon,
    CloseIcon,
    CopyIcon,
    DownloadIcon,
} from '../ui/Icons';
import ResumeDocument from './ResumeDocument';
import ResumeProjectPicker from './ResumeProjectPicker';

const DEFAULT_PROJECT_IDS = projectsData
    .filter((project) => project.featuredInResume)
    .map((project) => project.id);

const ALL_PROJECT_IDS = projectsData.map((project) => project.id);

const ZOOM_OPTIONS = [
    { id: 'fit', label: 'Ajustar' },
    { id: 0.8, label: '80%' },
    { id: 0.9, label: '90%' },
    { id: 1, label: '100%' },
];

const FOCUSABLE_SELECTOR =
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function ResumeModal({ isOpen, onClose }) {
    const [activeProfileId, setActiveProfileId] = useState(resumeProfiles[0].id);
    const [selectedProjectIds, setSelectedProjectIds] = useState(DEFAULT_PROJECT_IDS);
    const [theme, setTheme] = useState('purple');
    const [density, setDensity] = useState('comfortable');
    const [includeAllCourses, setIncludeAllCourses] = useState(false);
    const [showAdditionalInfo, setShowAdditionalInfo] = useState(true);
    const [zoomMode, setZoomMode] = useState('fit');
    const [isMobileOptionsOpen, setIsMobileOptionsOpen] = useState(false);
    const [copiedLink, setCopiedLink] = useState(false);

    const [previewMetrics, setPreviewMetrics] = useState({
        containerWidth: 0,
        paperWidth: 0,
        paperHeight: 0,
        isDesktop: typeof window !== 'undefined' ? window.innerWidth > 960 : true,
    });

    const modalShellRef = useRef(null);
    const closeButtonRef = useRef(null);
    const previousFocusRef = useRef(null);
    const previewBodyRef = useRef(null);
    const paperMeasureRef = useRef(null);
    const copyTimerRef = useRef(null);

    const activeProfile = useMemo(
        () => resumeProfiles.find((p) => p.id === activeProfileId) || resumeProfiles[0],
        [activeProfileId]
    );

    const orderedSkillGroups = useMemo(() => {
        const order = activeProfile.skillOrder;
        return [...resumeSkillGroups].sort((a, b) => {
            const idxA = order.indexOf(a.label);
            const idxB = order.indexOf(b.label);
            return (idxA === -1 ? 99 : idxA) - (idxB === -1 ? 99 : idxB);
        });
    }, [activeProfile]);

    const selectedProjects = useMemo(
        () => projectsData.filter((project) => selectedProjectIds.includes(project.id)),
        [selectedProjectIds]
    );

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

    // Medição responsiva da área de prévia e da folha A4 para zoom sem espaço morto
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
                isDesktop: window.innerWidth > 960,
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
        selectedProjectIds,
        density,
        includeAllCourses,
        showAdditionalInfo,
        activeProfileId,
    ]);

    if (!isOpen) return null;

    const handleSelectProfile = (profile) => {
        setActiveProfileId(profile.id);
        setSelectedProjectIds(profile.projectIds);
    };

    const toggleProject = (projectId) => {
        setSelectedProjectIds((prev) =>
            prev.includes(projectId)
                ? prev.filter((id) => id !== projectId)
                : [...prev, projectId]
        );
    };

    const handleCopyLink = async () => {
        const cvUrl = `${profileData.siteUrl.replace(/\/$/, '')}/cv`;
        try {
            if (navigator.clipboard?.writeText) {
                await navigator.clipboard.writeText(cvUrl);
            } else {
                const input = document.createElement('textarea');
                input.value = cvUrl;
                input.setAttribute('readonly', '');
                input.style.position = 'fixed';
                input.style.opacity = '0';
                document.body.appendChild(input);
                input.select();
                document.execCommand('copy');
                document.body.removeChild(input);
            }
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

    const fitScale =
        previewMetrics.isDesktop &&
        previewMetrics.containerWidth > 0 &&
        previewMetrics.paperWidth > 0
            ? Math.min(1, Math.max(0.58, previewMetrics.containerWidth / previewMetrics.paperWidth))
            : 1;

    const activeScale = previewMetrics.isDesktop
        ? zoomMode === 'fit'
            ? fitScale
            : zoomMode
        : 1;

    const isScaled = previewMetrics.isDesktop && activeScale < 0.995;

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

    const modalContent = (
        <div
            className="resume-modal-overlay"
            role="dialog"
            aria-modal="true"
            aria-labelledby="resume-modal-title"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="resume-modal-shell" ref={modalShellRef}>
                {/* Painel lateral esquerdo no desktop / barra superior empilhada no mobile */}
                <aside className="resume-sidebar">
                    <div className="resume-modal-toolbar-info">
                        <h2 id="resume-modal-title">Currículo</h2>
                        <span className="resume-modal-hint">
                            {profileData.name} • Folha A4 ATS
                        </span>
                    </div>

                    <div className="resume-sidebar-close-wrap">
                        <button
                            ref={closeButtonRef}
                            type="button"
                            className="resume-btn-close"
                            onClick={onClose}
                            aria-label="Fechar pré-visualização do currículo"
                        >
                            <CloseIcon size={19} />
                        </button>
                    </div>

                    {/* Botão recolhível exclusivo para mobile */}
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
                                {activeProfile.label} • {selectedProjects.length}/
                                {projectsData.length} projetos
                            </span>
                        </span>
                        <ChevronDownIcon size={17} className="resume-mobile-toggle-icon" />
                    </button>

                    <div
                        id="resume-sidebar-controls"
                        className={`resume-sidebar-body ${isMobileOptionsOpen ? 'is-mobile-open' : ''}`}
                    >
                        {/* 1. Foco da vaga */}
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
                        </div>

                        {/* 2. Aparência do PDF (Cor + Densidade em linhas próprias, sem aperto) */}
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

                        <div className="resume-setting-row">
                            <span className="resume-picker-label">Densidade</span>
                            <div
                                className="resume-segmented resume-segmented-compact"
                                role="group"
                                aria-label="Densidade do currículo"
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

                        {/* 3. Projetos */}
                        <div className="resume-control-divider" aria-hidden="true" />
                        <ResumeProjectPicker
                            projects={projectsData}
                            selectedIds={selectedProjectIds}
                            defaultIds={activeProfile.projectIds}
                            allIds={ALL_PROJECT_IDS}
                            onSelectIds={setSelectedProjectIds}
                            onToggleProject={toggleProject}
                        />

                        {/* 4. Seções opcionais */}
                        <div className="resume-control-divider" aria-hidden="true" />
                        <div className="resume-control-group">
                            <span className="resume-picker-label">Seções opcionais</span>
                            <div className="resume-option-toggles">
                                <button
                                    type="button"
                                    className={`resume-picker-chip ${includeAllCourses ? 'selected' : ''}`}
                                    onClick={() => setIncludeAllCourses((prev) => !prev)}
                                    aria-pressed={includeAllCourses}
                                >
                                    <span className="resume-chip-check" aria-hidden="true">
                                        {includeAllCourses && <CheckIcon size={11} />}
                                    </span>
                                    <span className="resume-chip-info">
                                        <span className="resume-chip-title">
                                            Incluir todos os cursos
                                        </span>
                                        <span className="resume-chip-category">
                                            {includeAllCourses ? coursesData.length : 3}/
                                            {coursesData.length}
                                        </span>
                                    </span>
                                </button>

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

                            <button
                                type="button"
                                className={`resume-btn-copy ${copiedLink ? 'is-copied' : ''}`}
                                onClick={handleCopyLink}
                                aria-label="Copiar link direto do currículo"
                                title="Copiar link /cv"
                            >
                                {copiedLink ? <CheckIcon size={15} /> : <CopyIcon size={15} />}
                                <span className="resume-btn-copy-label">
                                    {copiedLink ? 'Link copiado!' : 'Copiar link (/cv)'}
                                </span>
                            </button>
                        </div>

                        <p className="resume-sidebar-note">
                            Dica: no diálogo de PDF, desmarque cabeçalhos do navegador se
                            aparecerem.
                        </p>
                    </div>
                </aside>

                {/* Área direita: Pré-visualização da folha A4 com barra de zoom */}
                <div className="resume-preview-pane">
                    <div className="resume-preview-bar no-print">
                        <span className="resume-preview-status">
                            {activeProfile.label} • {theme === 'purple' ? 'Roxo' : 'Clássico'} •{' '}
                            {density === 'compact' ? 'Compacto' : 'Padrão'}
                        </span>

                        <div
                            className="resume-zoom-controls"
                            role="group"
                            aria-label="Zoom da pré-visualização"
                        >
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
                    </div>

                    <div className="resume-modal-body" ref={previewBodyRef}>
                        <div className="resume-paper-stage" style={stageStyle}>
                            <div
                                className="resume-paper-scale"
                                ref={paperMeasureRef}
                                style={scaleStyle}
                            >
                                <ResumeDocument
                                    selectedProjects={selectedProjects}
                                    roleTitle={activeProfile.role}
                                    skillGroups={orderedSkillGroups}
                                    theme={theme}
                                    density={density}
                                    includeAllCourses={includeAllCourses}
                                    showAdditionalInfo={showAdditionalInfo}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}
