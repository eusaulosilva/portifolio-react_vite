export default function TimelineItem({ date, title, institution, description }) {
    return (
        <div className="timeline-item">
            {/* Mantendo a classe original para a data (Ex: Dez/2025) */}
            <p className="timeline-date">{date}</p>

            {/* Título do cargo ou curso */}
            <h4>{title}</h4>

            {/* Nome da instituição (Ex: UDF ou Banco do Brasil) */}
            <p className="timeline-institution">{institution}</p>

            {/* Descrição das atividades ou do curso */}
            <p className="timeline-description">
                {description}
            </p>
        </div>
    );
}

