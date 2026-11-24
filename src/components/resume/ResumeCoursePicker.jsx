import { CheckIcon } from '../ui/Icons';

export default function ResumeCoursePicker({
    courses,
    selectedIds,
    defaultIds,
    allIds,
    onSelectIds,
    onToggleCourse,
    onMoveCourse,
}) {
    const isAllSelected = selectedIds.length === allIds.length;
    const isDefaultSelected =
        selectedIds.length === defaultIds.length &&
        defaultIds.every((id) => selectedIds.includes(id));

    // Mostra cursos selecionados primeiro na ordem escolhida, depois os não selecionados
    const courseById = new Map(courses.map((c) => [c.id, c]));
    const orderedSelected = selectedIds.map((id) => courseById.get(id)).filter(Boolean);
    const unselected = courses.filter((c) => !selectedIds.includes(c.id));
    const displayList = [...orderedSelected, ...unselected];

    return (
        <div id="resume-course-picker" className="resume-project-picker">
            <div className="resume-picker-head">
                <span className="resume-picker-label">Cursos no currículo</span>
                <span className="resume-picker-counter">
                    {selectedIds.length}/{courses.length}
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
                aria-label="Selecionar e ordenar cursos exibidos no currículo"
            >
                {displayList.map((course) => {
                    const selectedIndex = selectedIds.indexOf(course.id);
                    const isSelected = selectedIndex !== -1;
                    const shortTitle = course.title.replace(/\s*\([^)]*\)/g, '').trim();

                    return (
                        <div
                            key={course.id}
                            className={`resume-course-row ${isSelected ? 'selected' : ''}`}
                        >
                            <button
                                type="button"
                                className={`resume-picker-chip resume-course-toggle ${isSelected ? 'selected' : ''}`}
                                onClick={() => onToggleCourse(course.id)}
                                aria-pressed={isSelected}
                                title={`${course.title} (${course.meta})`}
                            >
                                <span className="resume-chip-check" aria-hidden="true">
                                    {isSelected && <CheckIcon size={11} />}
                                </span>
                                <span className="resume-chip-info">
                                    <span className="resume-chip-title">{shortTitle}</span>
                                    <span className="resume-chip-category">{course.provider}</span>
                                </span>
                            </button>

                            {isSelected && selectedIds.length > 1 && (
                                <div className="resume-reorder-group">
                                    <button
                                        type="button"
                                        className="resume-reorder-btn"
                                        onClick={() => onMoveCourse(course.id, -1)}
                                        disabled={selectedIndex === 0}
                                        aria-label={`Subir ${shortTitle}`}
                                        title="Mover para cima"
                                    >
                                        ↑
                                    </button>
                                    <button
                                        type="button"
                                        className="resume-reorder-btn"
                                        onClick={() => onMoveCourse(course.id, 1)}
                                        disabled={selectedIndex === selectedIds.length - 1}
                                        aria-label={`Descer ${shortTitle}`}
                                        title="Mover para baixo"
                                    >
                                        ↓
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

