import { useState } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        mensagem: ''
    });
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleEmailSend = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Esta chamada vai para o seu backend na Vercel, onde a chave está segura
            const response = await fetch('https://api.eusaulosilva.com.br/api/enviar-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Mensagem enviada com sucesso!');
                setFormData({ nome: '', email: '', mensagem: '' });
            } else {
                alert('Falha ao enviar e-mail.');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro de conexão com a API.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contato" className="container-fluid">
            <div className="contato-section">
                <div className="header"><h2>Contato</h2></div>
                <div className="container-contato">
                    <form id="formContato" className="formulario-contato" onSubmit={handleEmailSend}>
                        <div className="input-group">
                            <label htmlFor="nome">Nome</label>
                            <input type="text" id="nome" required value={formData.nome} onChange={handleInputChange} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="email">E-mail</label>
                            <input type="email" id="email" required value={formData.email} onChange={handleInputChange} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="mensagem">Mensagem</label>
                            <textarea id="mensagem" rows="5" required value={formData.mensagem} onChange={handleInputChange}></textarea>
                        </div>
                        <button type="submit" className="container-conteudo-botao-link btn-enviar" disabled={loading}>
                            {loading ? 'Enviando...' : 'Enviar Mensagem'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
