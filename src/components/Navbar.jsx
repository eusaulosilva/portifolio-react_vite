
const Navbar = () => {
    return (
        <header>
            <nav className="navbar  navbar-expand-md bg-body-tertiary">
                <div className="container-fluid">

                    <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav mx-auto text-center">
                            <li className="nav-item ">
                                <a className="nav-link " aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#sobre">Sobre mim</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#skill">Skill</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#projetos">Projetos</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#curriculo">Currículo</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#contato">Contato</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;