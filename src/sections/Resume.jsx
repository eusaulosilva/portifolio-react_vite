import { TimelineItem } from '../components/resume';
import { Reveal } from '../components/ui';
import {
    AwardIcon,
    BookOpenIcon,
    BriefcaseIcon,
    DocumentIcon,
    GraduationCapIcon,
} from '../components/ui/Icons';
import {
    additionalInfoData,
    coursesData,
    educationData,
    experienceData,
} from '../data';

export default function Resume({ onOpenResume }) {
    return (
        <section id="curriculo" className="container-fluid">
            <div className="curriculo-section">
                <Reveal>
                    <div className="header">
                        <span className="section-kicker">04 / Trajetória</span>
                        <h2>Educação &amp; Experiência</h2>
                    </div>
                </Reveal>

                <div className="resume-grid">
                    <Reveal delay={80}>
                        <div className="resume-column">
                            <div className="column-title">
                                <span className="icon-box">
                                    <GraduationCapIcon size={20} />
                                </span>
                                <h3>Educação</h3>
                            </div>

                            <div className="timeline">
                                {educationData.map((item) => (
                                    <TimelineItem
                                        key={item.id}
                                        date={item.date}
                                        current={item.current}
                                        title={item.title}
                                        institution={item.institution}
                                        description={item.description}
                                    />
                                ))}
                            </div>

                            <div className="complementary-courses">
                                <div className="column-title column-title-sm">
                                    <span className="icon-box">
                                        <BookOpenIcon size={18} />
                                    </span>
                                    <h4>Cursos Especializados</h4>
                                </div>

                                <ul className="additional-info-list">
                                    {coursesData.map((curso) => (
                                        <li key={curso.id}>
                                            <strong>{curso.title}:</strong> {curso.meta}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </Reveal>

                    <Reveal delay={160}>
                        <div className="resume-column">
                            <div className="column-title">
                                <span className="icon-box">
                                    <BriefcaseIcon size={20} />
                                </span>
                                <h3>Experiência</h3>
                            </div>

                            <div className="timeline">
                                {experienceData.map((item) => (
                                    <TimelineItem
                                        key={item.id}
                                        date={item.date}
                                        current={item.current}
                                        title={item.title}
                                        institution={item.institution}
                                        highlights={item.highlights}
                                    />
                                ))}
                            </div>

                            <div className="additional-info-block">
                                <div className="column-title column-title-sm">
                                    <span className="icon-box">
                                        <AwardIcon size={18} />
                                    </span>
                                    <h4>Atividades &amp; Idiomas</h4>
                                </div>

                                <ul className="additional-info-list">
                                    {additionalInfoData.map((info) => (
                                        <li key={info.id}>
                                            <strong>{info.label}:</strong> {info.value}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="resume-download-wrap">
                                <button
                                    type="button"
                                    className="btn-resume-download"
                                    onClick={onOpenResume}
                                >
                                    <DocumentIcon size={17} />
                                    Visualizar Currículo Completo (PDF)
                                </button>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
