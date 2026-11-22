import { useEffect, useRef, useState } from 'react';
import { Reveal } from '../components/ui';
import {
    CheckIcon,
    CopyIcon,
    MailIcon,
    MapPinIcon,
    SendIcon,
    SocialIcon,
} from '../components/ui/Icons';
import { profileData, socialLinks } from '../data';

const INITIAL_FORM = {
    nome: '',
    email: '',
    assunto: '',
    mensagem: '',
};

export default function Contact() {
    const [formData, setFormData] = useState(INITIAL_FORM);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ message: '', type: '' });
    const [copied, setCopied] = useState(false);

    const statusTimerRef = useRef(null);
    const copyTimerRef = useRef(null);

    const directSocials = socialLinks.filter(
        (item) => item.id === 'linkedin' || item.id === 'github'
    );

    useEffect(() => {
        return () => {
            if (statusTimerRef.current) clearTimeout(statusTimerRef.current);
            if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
        };
    }, []);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const scheduleStatusClear = () => {
        if (statusTimerRef.current) clearTimeout(statusTimerRef.current);
        statusTimerRef.current = setTimeout(() => {
            setStatus({ message: '', type: '' });
        }, 15000);
    };

    const handleCopyEmail = async () => {
        try {
            if (navigator.clipboard?.writeText) {
                await navigator.clipboard.writeText(profileData.email);
            } else {
                const tempInput = document.createElement('input');
                tempInput.value = profileData.email;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
            }
            setCopied(true);
            if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
            copyTimerRef.current = setTimeout(() => setCopied(false), 2500);
        } catch {
            setCopied(false);
        }
    };

    const handleEmailSend = async (e) => {
        e.preventDefault();

        const trimmedPayload = {
            nome: formData.nome.trim(),
            email: formData.email.trim(),
            assunto: formData.assunto.trim(),
            mensagem: formData.mensagem.trim(),
        };

        if (
            !trimmedPayload.nome ||
            !trimmedPayload.email ||
            !trimmedPayload.assunto ||
            !trimmedPayload.mensagem
        ) {
            setStatus({
                message: 'Por favor, preencha todos os campos antes de enviar.',
                type: 'error',
            });
            scheduleStatusClear();
            return;
        }

        setLoading(true);
        setStatus({ message: '', type: '' });
        if (statusTimerRef.current) clearTimeout(statusTimerRef.current);

        const controller = new AbortController();
        const requestTimeout = setTimeout(() => controller.abort(), 15000);

        try {
            const response = await fetch(profileData.apiContactUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(trimmedPayload),
                signal: controller.signal,
            });

            let result = {};
            try {
                result = await response.json();
            } catch {
                result = {};
            }

            if (response.ok) {
                setStatus({
                    message:
                        result.message || 'Mensagem enviada com sucesso! Retornarei em breve.',
                    type: 'success',
                });
                setFormData(INITIAL_FORM);
            } else {
                setStatus({
                    message:
                        result.message ||
                        'Ops! Não foi possível enviar sua mensagem. Tente novamente.',
                    type: 'error',
                });
            }
        } catch (err) {
            const isTimeout = err?.name === 'AbortError';
            setStatus({
                message: isTimeout
                    ? `Tempo de resposta excedido. Se preferir, envie diretamente para ${profileData.email}`
                    : `Erro de conexão. Se preferir, envie diretamente para ${profileData.email}`,
                type: 'error',
            });
        } finally {
            clearTimeout(requestTimeout);
            setLoading(false);
            scheduleStatusClear();
        }
    };

    return (
        <section id="contato" className="container-fluid">
            <div className="contato-section">
                <Reveal>
                    <div className="header">
                        <span className="section-kicker">05 / Contato</span>
                        <h2>Vamos conversar</h2>
                    </div>
                </Reveal>

                <div className="contact-layout">
                    <Reveal delay={80}>
                        <div className="contact-info-column">
                            <h3 className="contact-intro-title">
                                Tem um projeto ou oportunidade em mente?
                            </h3>
                            <p className="contact-intro-text">
                                Fique à vontade para enviar uma mensagem pelo formulário ou falar
                                diretamente pelos canais abaixo. Retorno o mais rápido possível.
                            </p>

                            <div className="contact-channels">
                                <div className="card-contato-direto">
                                    <div className="conteudo-direto">
                                        <div className="conteudo-direto-esquerda">
                                            <span className="contact-icon-wrap">
                                                <MailIcon size={18} className="icone-contato" />
                                            </span>
                                            <div className="info-direto">
                                                <p className="label-direto">E-mail direto</p>
                                                <a
                                                    href={`mailto:${profileData.email}`}
                                                    className="link-direto"
                                                >
                                                    {profileData.email}
                                                </a>
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            className={`btn-copiar-email ${copied ? 'copied' : ''}`}
                                            onClick={handleCopyEmail}
                                            aria-label="Copiar endereço de e-mail"
                                        >
                                            {copied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
                                            <span>{copied ? 'Copiado!' : 'Copiar'}</span>
                                        </button>
                                    </div>
                                </div>

                                {profileData.location && (
                                    <div className="card-contato-direto">
                                        <div className="conteudo-direto-esquerda">
                                            <span className="contact-icon-wrap">
                                                <MapPinIcon size={18} className="icone-contato" />
                                            </span>
                                            <div className="info-direto">
                                                <p className="label-direto">Localização</p>
                                                <span className="link-direto-static">
                                                    {profileData.location}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="contact-social-row">
                                {directSocials.map((social) => (
                                    <a
                                        key={social.id}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="contact-social-pill"
                                    >
                                        <SocialIcon id={social.id} size={16} />
                                        <span>{social.label}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </Reveal>

                    <Reveal delay={140} className="contact-form-reveal">
                        <div className="container-contato">
                            <form className="formulario-contato" onSubmit={handleEmailSend}>
                                <div className="form-row-two">
                                    <div className="form-field">
                                        <label htmlFor="nome">Nome</label>
                                        <input
                                            type="text"
                                            id="nome"
                                            name="nome"
                                            autoComplete="name"
                                            required
                                            maxLength={120}
                                            value={formData.nome}
                                            onChange={handleInputChange}
                                            placeholder="Seu nome"
                                        />
                                    </div>
                                    <div className="form-field">
                                        <label htmlFor="email">E-mail</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            autoComplete="email"
                                            required
                                            maxLength={160}
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="exemplo@email.com"
                                        />
                                    </div>
                                </div>

                                <div className="form-field">
                                    <label htmlFor="assunto">Assunto</label>
                                    <input
                                        type="text"
                                        id="assunto"
                                        name="assunto"
                                        required
                                        maxLength={160}
                                        value={formData.assunto}
                                        onChange={handleInputChange}
                                        placeholder="No que posso ajudar?"
                                    />
                                </div>

                                <div className="form-field">
                                    <label htmlFor="mensagem">Mensagem</label>
                                    <textarea
                                        id="mensagem"
                                        name="mensagem"
                                        rows="5"
                                        required
                                        maxLength={2000}
                                        value={formData.mensagem}
                                        onChange={handleInputChange}
                                        placeholder="Escreva sua mensagem aqui..."
                                    />
                                </div>

                                <button type="submit" className="btn-enviar" disabled={loading}>
                                    <SendIcon size={16} className="btn-enviar-icone" />
                                    <span>{loading ? 'Enviando...' : 'Enviar Mensagem'}</span>
                                </button>

                                {status.message && (
                                    <div
                                        className={`status-message ${status.type}`}
                                        role="status"
                                        aria-live="polite"
                                    >
                                        {status.message}
                                    </div>
                                )}
                            </form>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
