import { useState } from 'react';

const Navbar = () => {
    // Estado para controlar se o menu está aberto ou fechado
    const [isNavExpanded, setIsNavExpanded] = useState(false);

    // Função para fechar o menu
    const closeMenu = () => setIsNavExpanded(false);

    return (
        <header>
            <nav className="navbar navbar-expand-md bg-body-tertiary">
                <div className="container-fluid">

                    {/* Botão Toggler: Agora controlado pelo isNavExpanded */}
                    <button
                        className="navbar-toggler ms-auto"
                        type="button"
                        onClick={() => setIsNavExpanded(!isNavExpanded)}
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Div do Menu: Adicionamos a classe 'show' baseada no estado */}
                    <div className={`collapse navbar-collapse ${isNavExpanded ? 'show' : ''}`} id="navbarNav">
                        <ul className="navbar-nav mx-auto text-center">
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={closeMenu}>Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#sobre" onClick={closeMenu}>Sobre mim</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#skill" onClick={closeMenu}>Skill</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#projetos" onClick={closeMenu}>Projetos</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#curriculo" onClick={closeMenu}>Currículo</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#contato" onClick={closeMenu}>Contato</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Overlay invisível: Fecha o menu se clicar em qualquer lugar da tela (opcional) */}
            {isNavExpanded && (
                <div
                    className="fixed-top vh-100"
                    style={{ zIndex: 1040, background: 'transparent' }}
                    onClick={closeMenu}
                />
            )}
        </header>
    );
}

export default Navbar;