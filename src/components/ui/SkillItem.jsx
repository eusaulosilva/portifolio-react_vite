import { useState } from 'react';
import { ApiIcon, ExcelIcon, PowerBIIcon, StreamlitIcon } from './Icons';

function CustomSkillIcon({ icon }) {
    switch (icon) {
        case 'powerbi':
            return <PowerBIIcon size={28} className="skill-custom-icon" />;
        case 'streamlit':
            return <StreamlitIcon size={28} className="skill-custom-icon" />;
        case 'excel':
            return <ExcelIcon size={28} className="skill-custom-icon" />;
        case 'api':
            return <ApiIcon size={28} className="skill-custom-icon" />;
        default:
            return null;
    }
}

export default function SkillItem({ name, icon, customIcon }) {
    const [imgError, setImgError] = useState(false);

    return (
        <div className="skill-item">
            {customIcon ? (
                <CustomSkillIcon icon={icon} />
            ) : imgError ? (
                <span className="skill-fallback-icon" aria-hidden="true">
                    {name.slice(0, 2).toUpperCase()}
                </span>
            ) : (
                <img
                    src={`https://skillicons.dev/icons?i=${icon}`}
                    alt=""
                    aria-hidden="true"
                    width="28"
                    height="28"
                    loading="lazy"
                    decoding="async"
                    onError={() => setImgError(true)}
                />
            )}
            <span>{name}</span>
        </div>
    );
}
