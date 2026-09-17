import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export const CadastroPage = () => {
    const navigate = useNavigate();

    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [bairro, setBairro] = useState('');
    const [endereco, setEndereco] = useState('');
    const [termos, setTermos] = useState(false);

    const handleTelefoneChange = (e) => {
        let valor = e.target.value.replace(/\D/g, '');
        if (valor.length > 11) valor = valor.slice(0, 11);

        if (valor.length > 6) {
            setTelefone(`(${valor.slice(0, 2)}) ${valor.slice(2, 7)}-${valor.slice(7)}`);
        } else if (valor.length > 2) {
            setTelefone(`(${valor.slice(0, 2)}) ${valor.slice(2)}`);
        } else if (valor.length > 0) {
            setTelefone(`(${valor}`);
        } else {
            setTelefone('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nome || !telefone || !bairro || !endereco || !termos) {
            alert('Por favor, preencha todos os campos obrigatórios e aceite os termos.');
            return;
        }

        alert(`🎉 Cadastro realizado com sucesso!\n\nBem-vindo(a), ${nome}!\nSeu cadastro no Cuida Cidade foi ativado.`);
        navigate('/reportar');
    };

    return (
        <main>
            <section className="page-header">
                <h1>Cadastro de Morador</h1>
                <p>Junte-se à rede de cidadania ativa de Apicum-Açu e acompanhe a resolução das ocorrências da sua rua!</p>
            </section>

            <section className="container-pagina">
                <div className="form-card">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="nome">Nome Completo *</label>
                            <input
                                type="text"
                                id="nome"
                                className="form-control"
                                placeholder="Digite seu nome completo..."
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required
                                autoFocus
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="telefone">Telefone / WhatsApp *</label>
                            <input
                                type="tel"
                                id="telefone"
                                className="form-control"
                                placeholder="(98) 99999-9999"
                                value={telefone}
                                onChange={handleTelefoneChange}
                                required
                                maxLength="15"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="bairro">Bairro em Apicum-Açu *</label>
                            <select
                                id="bairro"
                                className="form-control"
                                value={bairro}
                                onChange={(e) => setBairro(e.target.value)}
                                required
                            >
                                <option value="">Selecione seu bairro...</option>
                                <option value="centro">Centro</option>
                                <option value="bairro-novo">Bairro Novo</option>
                                <option value="mangueiral">Mangueiral</option>
                                <option value="ponta-areia">Ponta de Areia</option>
                                <option value="cruzador">Cruzador</option>
                                <option value="zona-rural">Zona Rural / Povoado</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="endereco">Endereço Completo (Rua, Número e Ponto de Referência) *</label>
                            <input
                                type="text"
                                id="endereco"
                                className="form-control"
                                placeholder="Ex: Av. Nambu, nº 120, próximo ao mercado"
                                value={endereco}
                                onChange={(e) => setEndereco(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                            <input
                                type="checkbox"
                                id="termos"
                                checked={termos}
                                onChange={(e) => setTermos(e.target.checked)}
                                required
                                style={{ width: '18px', height: '18px', accentColor: 'var(--primary-color)' }}
                            />
                            <label htmlFor="termos" style={{ fontSize: '0.9rem', marginBottom: 0, fontWeight: 'normal', color: 'var(--text-muted)' }}>
                                Concordo em compartilhar meus dados para fins de atendimento e fiscalização comunitária.
                            </label>
                        </div>

                        <div style={{ textAlign: 'center', marginTop: '30px' }}>
                            <button type="submit" className="btn" style={{ width: '100%', maxWidth: '320px' }}>
                                CADASTRAR CONTA
                            </button>
                        </div>

                        <hr id="linha-horizontal" style={{ margin: '24px 0', background: 'var(--border-color)' }} />

                        <div style={{ textAlign: 'center', fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                            <p>Já possui uma conta cadastrada?</p>
                            <Link
                                to="/login"
                                className="btn"
                                style={{ background: 'linear-gradient(135deg, #719f58 0%, #116600 100%)', width: '100%', maxWidth: '320px', marginTop: '10px', animation: 'none' }}
                            >
                                Fazer Login
                            </Link>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
};
