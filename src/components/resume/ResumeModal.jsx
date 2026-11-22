import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import '../../styles/resume-modal.css';
import { profileData, projectsData } from '../../data';
import { CloseIcon, DownloadIcon } from '../ui/Icons';
import ResumeDocument from './ResumeDocument';
import ResumeProjectPicker from './ResumeProjectPicker';

const DEFAULT_PROJECT_IDS = projectsData
    .filter((project) => project.featuredInResume)
    .map((project) => project.id);

const ALL_PROJECT_IDS = projectsData.map((project) => project.id);

export default function ResumeModal({ isOpen, onClose }) {
    const [selectedProjectIds, setSelectedProjectIds] = useState(DEFAULT_PROJECT_IDS);

    const closeButtonRef = useRef(null);
    const previousFocusRef = useRef(null);

    useEffect(() => {
        if (!isOpen) return;

        previousFocusRef.current = document.activeElement;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        closeButtonRef.current?.focus();

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', handleKeyDown);
            if (previousFocusRef.current instanceof HTMLElement) {
                previousFocusRef.current.focus();
            }
        };
    }, [isOpen, onClose]);

    const selectedProjects = useMemo(
        () => projectsData.filter((project) => selectedProjectIds.includes(project.id)),
        [selectedProjectIds]
    );

    if (!isOpen) return null;

    const toggleProject = (projectId) => {
        setSelectedProjectIds((prev) =>
            prev.includes(projectId)
                ? prev.filter((id) => id !== projectId)
                : [...prev, projectId]
        );
    };

    const handleDownloadPdf = () => {
        const originalTitle = document.title;
        const safeName = profileData.fullName
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/\s+/g, '-');

        document.title = `Curriculo-${safeName}`;

        const restoreTitle = () => {
            document.title = originalTitle;
            window.removeEventListener('afterprint', restoreTitle);
        };

        window.addEventListener('afterprint', restoreTitle);
        window.print();

        setTimeout(() => {
            document.title = originalTitle;
        }, 1500);
    };

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
            <div className="resume-modal-shell">
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

                    <div className="resume-sidebar-body">
                        <ResumeProjectPicker
                            projects={projectsData}
                            selectedIds={selectedProjectIds}
                            defaultIds={DEFAULT_PROJECT_IDS}
                            allIds={ALL_PROJECT_IDS}
                            onSelectIds={setSelectedProjectIds}
                            onToggleProject={toggleProject}
                        />
                    </div>

                    <div className="resume-sidebar-footer">
                        <button
                            type="button"
                            className="resume-btn-print"
                            onClick={handleDownloadPdf}
                        >
                            <DownloadIcon size={16} />
                            <span>Salvar em PDF</span>
                        </button>
                        <p className="resume-sidebar-note">
                            Atualizado automaticamente com os dados do portfólio.
                        </p>
                    </div>
                </aside>

                {/* Área direita: Pré-visualização da folha A4 */}
                <div className="resume-modal-body">
                    <ResumeDocument selectedProjects={selectedProjects} />
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}
