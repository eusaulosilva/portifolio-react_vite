export default function ProjectCard({ title, description, techs, link, img, githubicon, demo, abiricon }) {
    return (
        <div className="card">
            <img src={img} className="card-img-top" alt={`Preview do projeto ${title}`} />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                    {techs.map((tech, i) => (
                        <span key={i} className="px-3 py-1 bg-secondary btn-skill">
                            {tech}
                        </span>
                    ))}
                </div>

                <div className="btn-card-container">
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-card btn btn-primary d-flex align-items-center justify-content-center gap-2"
                    >
                        <span
                            className="d-flex align-items-center"
                            dangerouslySetInnerHTML={{ __html: githubicon }}
                        />
                        GitHub
                    </a>

                    {demo && (
                        <a
                            href={demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-card btn btn-primary d-flex align-items-center justify-content-center gap-2"
                        >
                            <span
                                className="d-flex align-items-center"
                                dangerouslySetInnerHTML={{ __html: abiricon }}
                            />
                            Visualizar
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}