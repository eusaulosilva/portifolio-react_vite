import { useState } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        mensagem: ''
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleWhatsAppSend = (e) => {
        e.preventDefault();

        // Substitua pelo seu número (DDI + DDD + Número)
        const meuNumero = "5561998340336";

        const texto = `Olá Saulo!%0A%0A*Nome:* ${formData.nome}%0A*Email:* ${formData.email}%0A*Mensagem:* ${formData.mensagem}`;
        const url = `https://wa.me/${meuNumero}?text=${texto}`;

        window.open(url, '_blank');
    };

    return (
        <section id="contato" className="container-fluid">
            <div className="contato-section">
                <div className="header">
                    <h2>Contato</h2>
                </div>

                <div className="container-contato">
                    <form id="formContato" className="formulario-contato" onSubmit={handleWhatsAppSend}>
                        <div className="input-group">
                            <label htmlFor="nome">Nome</label>
                            <input
                                type="text"
                                id="nome"
                                placeholder="Seu nome completo"
                                required
                                value={formData.nome}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="email">E-mail</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="seu@email.com"
                                required
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="mensagem">Mensagem</label>
                            <textarea
                                id="mensagem"
                                rows="5"
                                placeholder="Como posso ajudar?"
                                required
                                value={formData.mensagem}
                                onChange={handleInputChange}
                            ></textarea>
                        </div>

                        <button type="submit" className="container-conteudo-botao-link btn-enviar">
                            Enviar para WhatsApp
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
                                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}