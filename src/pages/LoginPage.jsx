import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const LoginPage = () => {
    const { login, usuario, logout } = useApp();
    const navigate = useNavigate();

    const [identificador, setIdentificador] = useState('');
    const [senha, setSenha] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!identificador || !senha) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        login(identificador);
        alert(`🔓 Login efetuado com sucesso!\n\nBem-vindo(a) de volta!`);
        navigate('/');
    };

    if (usuario) {
        return (
            <main>
                <section className="page-header">
                    <h1>Meu Perfil</h1>
                    <p>Você está conectado como {usuario.nome}</p>
                </section>
                <section className="container-pagina">
                    <div className="form-card" style={{ textAlign: 'center' }}>
                        <h2>Olá, {usuario.nome}!</h2>
                        <p style={{ color: 'var(--text-muted)', margin: '12px 0 24px' }}>
                            Identificador: {usuario.identificador}
                        </p>
                        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                            <Link to="/reportar" className="btn">Reportar Problema</Link>
                            <button type="button" onClick={logout} className="btn" style={{ background: '#dc2626' }}>
                                Sair da Conta
                            </button>
                        </div>
                    </div>
                </section>
            </main>
        );
    }

    return (
        <main>
            <section className="page-header">
                <h1>Entrar na sua Conta</h1>
                <p>Acesse o painel do cidadão de Apicum-Açu para registrar e acompanhar relatos urbanos.</p>
            </section>

            <section className="container-pagina">
                <div className="form-card" style={{ maxWidth: '500px' }}>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="login-identificador">Telefone / WhatsApp ou E-mail *</label>
                            <input
                                type="text"
                                id="login-identificador"
                                className="form-control"
                                placeholder="(98) 99999-9999 ou seu e-mail"
                                value={identificador}
                                onChange={(e) => setIdentificador(e.target.value)}
                                required
                                autoFocus
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="login-senha">Senha de Acesso *</label>
                            <input
                                type="password"
                                id="login-senha"
                                className="form-control"
                                placeholder="••••••••"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                            />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', fontSize: '0.9rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'normal', cursor: 'pointer', color: 'var(--text-muted)' }}>
                                <input type="checkbox" style={{ accentColor: 'var(--primary-color)' }} defaultChecked /> Lembrar de mim
                            </label>
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    alert('Instruções de recuperação enviadas por SMS para o telefone cadastrado.');
                                }}
                                style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 600 }}
                            >
                                Esqueceu a senha?
                            </a>
                        </div>

                        <div style={{ textAlign: 'center', marginTop: '20px' }}>
                            <button type="submit" className="btn" style={{ width: '100%' }}>
                                ENTRAR
                            </button>
                        </div>

                        <hr id="linha-horizontal" style={{ margin: '24px 0', background: 'var(--border-color)' }} />

                        <div style={{ textAlign: 'center', fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                            <p>Ainda não possui uma conta no Cuida Cidade?</p>
                            <Link
                                to="/cadastro"
                                className="btn"
                                style={{ background: 'linear-gradient(135deg, #719f58 0%, #116600 100%)', width: '100%', marginTop: '10px', animation: 'none' }}
                            >
                                Fazer Cadastro de Morador
                            </Link>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
};
