import { CheckIcon } from '../ui/Icons';

export default function ResumeProjectPicker({
    projects,
    selectedIds,
    defaultIds,
    allIds,
    onSelectIds,
    onToggleProject,
}) {
    const isAllSelected = selectedIds.length === allIds.length;
    const isDefaultSelected =
        selectedIds.length === defaultIds.length &&
        defaultIds.every((id) => selectedIds.includes(id));

    return (
        <div id="resume-project-picker" className="resume-project-picker">
            <div className="resume-picker-head">
                <span className="resume-picker-label">Projetos no currículo</span>
                <span className="resume-picker-counter">
                    {selectedIds.length}/{projects.length}
                </span>
            </div>

            <div className="resume-picker-presets">
                <button
                    type="button"
                    className={`resume-preset-btn ${isDefaultSelected ? 'active' : ''}`}
                    onClick={() => onSelectIds(defaultIds)}
                >
                    Destaques ({defaultIds.length})
                </button>
                <button
                    type="button"
                    className={`resume-preset-btn ${isAllSelected ? 'active' : ''}`}
                    onClick={() => onSelectIds(allIds)}
                >
                    Todos ({allIds.length})
                </button>
                {selectedIds.length > 0 && (
                    <button
                        type="button"
                        className="resume-preset-btn resume-preset-clear"
                        onClick={() => onSelectIds([])}
                    >
                        Limpar
                    </button>
                )}
            </div>

            <div
                className="resume-picker-chips"
                role="group"
                aria-label="Selecionar projetos exibidos no currículo"
            >
                {projects.map((project) => {
                    const isSelected = selectedIds.includes(project.id);
                    return (
                        <button
                            key={project.id}
                            type="button"
                            className={`resume-picker-chip ${isSelected ? 'selected' : ''}`}
                            onClick={() => onToggleProject(project.id)}
                            aria-pressed={isSelected}
                        >
                            <span className="resume-chip-check" aria-hidden="true">
                                {isSelected && <CheckIcon size={11} />}
                            </span>
                            <span className="resume-chip-info">
                                <span className="resume-chip-title">{project.title}</span>
                                <span className="resume-chip-category">{project.category}</span>
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
