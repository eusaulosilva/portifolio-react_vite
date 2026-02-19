import { useState } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        assunto: '',
        mensagem: ''
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ message: '', type: '' });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleEmailSend = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ message: '', type: '' });

        try {
            const response = await fetch('https://api.eusaulosilva.com.br/api/enviar-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus({ message: 'E-mail enviado com sucesso! Responderemos em breve.', type: 'success' });
                setFormData({ nome: '', email: '', assunto: '', mensagem: '' });
            } else {
                setStatus({ message: 'Ops! Algo deu errado. Tente novamente.', type: 'error' });
            }
        } catch (error) {
            setStatus({ message: 'Erro de conexão. Verifique sua internet.', type: 'error' });
        } finally {
            setLoading(false);
            // Remove a mensagem após 6 segundos para manter a UI limpa
            setTimeout(() => setStatus({ message: '', type: '' }), 6000);
        }
    };

    return (
        <section id="contato" className="container-fluid">
            <div className="contato-section">
                <div className="header"><h2>Contato</h2></div>
                <div className="container-contato">
                    <form className="formulario-contato" onSubmit={handleEmailSend}>
                        <div className="input-group">
                            <label htmlFor="nome">Nome</label>
                            <input type="text" id="nome" required value={formData.nome} onChange={handleInputChange} placeholder="Seu nome" />
                        </div>
                        <div className="input-group ">
                            <label htmlFor="email">E-mail</label>
                            <input type="email" id="email" required value={formData.email} onChange={handleInputChange} placeholder="exemplo@email.com" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="assunto">Assunto</label>
                            <input type="text" id="assunto" required value={formData.assunto} onChange={handleInputChange} placeholder="No que posso ajudar?" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="mensagem">Mensagem</label>
                            <textarea id="mensagem" rows="5" required value={formData.mensagem} onChange={handleInputChange} placeholder="Escreva sua mensagem aqui..."></textarea>
                        </div>

                        <button type="submit" className="container-conteudo-botao-link btn-enviar" disabled={loading}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className=" icone-contato bi bi-send" viewBox="0 0 16 16">
                                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
                            </svg>{loading ? 'Enviando...' : 'Enviar Mensagem'}
                        </button>

                        {/* Feedback visual sem CSS inline */}
                        {status.message && (
                            <div className={`status-message ${status.type}`}>
                                {status.message}
                            </div>
                        )}
                    </form>
                    <div className="card-contato-direto">
                        <div className="conteudo-direto">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="icone-contato bi bi-envelope" viewBox="0 0 16 16">
                                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
                            </svg>

                            <div className="info-direto">
                                <p className="label-direto">Email direto</p>
                                <a
                                    href="mailto:contato@eusaulosilva.com.br"
                                    className="link-direto"
                                >
                                    contato@eusaulosilva.com.br
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}