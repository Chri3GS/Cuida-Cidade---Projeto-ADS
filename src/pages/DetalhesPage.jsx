import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const DetalhesPage = () => {
    const { id } = useParams();
    const { ocorrencias, apoiados, toggleApoio } = useApp();

    // Buscar ocorrência pelo ID ou pegar a primeira
    const ocorrencia = ocorrencias.find(item => item.id === id) || ocorrencias[0] || {};
    const idAtual = ocorrencia.id || 'CC-489201';
    const jaApoiado = apoiados.has(idAtual);

    return (
        <main>
            <section className="page-header">
                <h1>Ocorrência #{idAtual}</h1>
                <p>{ocorrencia.titulo}</p>
            </section>

            <section className="container-pagina">
                <div className="detalhes-container">
                    <img
                        src={ocorrencia.imagem || "/imagens/alagamento-rua.webp"}
                        alt={ocorrencia.titulo}
                        className="detalhes-header-img"
                    />

                    <div className="detalhes-body">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
                            <span className={`badge-status ${ocorrencia.badgeClass || 'status-andamento'}`} style={{ fontSize: '1rem', padding: '6px 16px' }}>
                                Status: {ocorrencia.status}
                            </span>
                            <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                                Data do Relato: {ocorrencia.data}
                            </span>
                        </div>

                        <h2 style={{ fontSize: '1.8rem', color: 'var(--primary-dark)', marginBottom: '8px' }}>
                            {ocorrencia.titulo}
                        </h2>
                        <p style={{ fontSize: '1.1rem', color: 'var(--primary-color)', fontWeight: 600, marginBottom: '20px' }}>
                            📍 Localização: {ocorrencia.localizacao}
                        </p>

                        <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Descrição do Problema:</h3>
                        <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '30px' }}>
                            {ocorrencia.descricao}
                        </p>

                        {/* LINHA DO TEMPO */}
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Histórico de Atendimento da Prefeitura:</h3>
                        <div className="timeline">
                            {(ocorrencia.timeline || []).map((step, idx) => (
                                <div key={idx} className={`timeline-step ${step.concluido ? 'concluido' : ''}`}>
                                    <h4>{step.titulo}</h4>
                                    <p>{step.data} - {step.desc}</p>
                                </div>
                            ))}
                        </div>

                        {/* BOTÃO DE APOIO COMUNITÁRIO */}
                        <div style={{ background: 'var(--bg-main)', padding: '20px', borderRadius: 'var(--radius-md)', textAlign: 'center', marginTop: '30px' }}>
                            <h4 style={{ marginBottom: '8px' }}>Esta ocorrência afeta a sua rua também?</h4>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '16px' }}>
                                Apoie para aumentar a prioridade no painel da prefeitura!
                            </p>
                            <button
                                type="button"
                                className="btn"
                                onClick={() => toggleApoio(idAtual)}
                                style={{
                                    backgroundColor: jaApoiado ? '#15803d' : '',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                {jaApoiado ? '💚 Ocorrência Apoia!' : '👍 Apoiar esta ocorrência'}
                            </button>
                            <p style={{ marginTop: '10px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                <strong>{ocorrencia.apoios || 0}</strong> moradores apoiaram este relato.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};
