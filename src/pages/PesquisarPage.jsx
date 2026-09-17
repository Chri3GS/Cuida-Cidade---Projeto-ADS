import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const PesquisarPage = () => {
    const { ocorrencias } = useApp();
    const location = useLocation();
    
    // Obter parâmetro da URL if any (ex: ?q=lixo)
    const queryParam = new URLSearchParams(location.search).get('q') || '';
    const [searchTerm, setSearchTerm] = useState(queryParam);

    useEffect(() => {
        if (queryParam) {
            setSearchTerm(queryParam);
        }
    }, [queryParam]);

    const resultados = ocorrencias.filter(item => {
        const termo = searchTerm.toLowerCase().trim();
        if (!termo) return true;
        return (
            item.titulo.toLowerCase().includes(termo) ||
            item.localizacao.toLowerCase().includes(termo) ||
            item.descricao.toLowerCase().includes(termo) ||
            item.status.toLowerCase().includes(termo) ||
            (item.bairro && item.bairro.toLowerCase().includes(termo))
        );
    });

    return (
        <main>
            <section className="page-header">
                <h1>Pesquisar Ocorrências Registradas</h1>
                <p>Acompanhe em tempo real os relatos dos moradores e a atuação da prefeitura em Apicum-Açu.</p>
            </section>

            <section className="container-pagina">
                {/* BARRA DE BUSCA */}
                <div className="search-box-container">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Digite uma rua, bairro ou tipo de problema (ex: água, lixo, Nambu)..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        autoFocus
                    />
                </div>

                {/* RESULTADOS */}
                <div className="grid-resultados">
                    {resultados.length === 0 ? (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', background: 'white', borderRadius: '16px', color: 'var(--text-muted)' }}>
                            <p style={{ fontSize: '1.2rem' }}>🔍 Nenhuma ocorrência encontrada para "{searchTerm}".</p>
                            <p style={{ marginTop: '8px' }}>Tente pesquisar com termos mais genéricos como "água", "lixo" ou "iluminação".</p>
                        </div>
                    ) : (
                        resultados.map((item) => (
                            <article key={item.id} className="card-resultado">
                                <img src={item.imagem} alt={item.titulo} />
                                <div className="card-resultado-body">
                                    <div>
                                        <span className={`badge-status ${item.badgeClass}`}>{item.status}</span>
                                        <h3 style={{ fontSize: '1.15rem', marginBottom: '6px' }}>{item.titulo}</h3>
                                        <p style={{ fontSize: '0.88rem', color: 'var(--primary-color)', fontWeight: 600, marginBottom: '8px' }}>
                                            📍 {item.localizacao} • Relatado em {item.data}
                                        </p>
                                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                                            {item.descricao.length > 100 ? `${item.descricao.substring(0, 100)}...` : item.descricao}
                                        </p>
                                    </div>
                                    <Link to={`/detalhes/${item.id}`} className="btn" style={{ padding: '10px 16px', minWidth: 'auto', width: '100%' }}>
                                        VER DETALHES
                                    </Link>
                                </div>
                            </article>
                        ))
                    )}
                </div>
            </section>
        </main>
    );
};
