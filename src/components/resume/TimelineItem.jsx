export default function TimelineItem({ date, current, title, institution, description, highlights }) {
    return (
        <article className={`timeline-item ${current ? 'timeline-item-current' : ''}`}>
            <div className="timeline-meta">
                <p className="timeline-date">{date}</p>
                {current && <span className="timeline-badge">Atual</span>}
            </div>
            <h4>{title}</h4>
            <p className="timeline-institution">{institution}</p>

            {highlights && highlights.length > 0 ? (
                <ul className="timeline-highlights">
                    {highlights.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            ) : (
                description && <p className="timeline-description">{description}</p>
            )}
        </article>
    );
}
