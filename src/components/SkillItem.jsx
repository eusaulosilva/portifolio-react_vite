export default function SkillItem({ name, icon }) {
    return (
        // Removido o uso de 'styles.algo' e mantido apenas a sua classe original
        <div className="skill-item">
            <img
                src={`https://skillicons.dev/icons?i=${icon}`}
                alt={`${name} icon`}
            />
            {name}
        </div>
    );
}