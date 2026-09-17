import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { MetricCounter } from '../components/MetricCounter';

export const HomePage = () => {
    const { ocorrencias, metricas } = useApp();
    const ocorrenciaDestaque = ocorrencias[0] || {};

    return (
        <main id="inicio">
            {/* HERO BANNER */}
            <section className="hero-banner">
                <h1>Cuidando da Cidade de Apicum-Açu</h1>
                <p>Conectando moradores e gestão pública para uma cidade mais sustentável, limpa e inclusiva.</p>
            </section>

            <section className="tela-inicial">
                {/* CARD DO PROBLEMA DESTACADO */}
                <article className="card-problema">
                    <div>
                        <img
                            src={ocorrenciaDestaque.imagem || "/imagens/alagamento-rua.webp"}
                            alt={ocorrenciaDestaque.titulo}
                            id="img-alagamento"
                        />
                        <span className="data-tag">{ocorrenciaDestaque.data?.toUpperCase() || '28 DE AGOSTO DE 2026'}</span>
                        <h2>{ocorrenciaDestaque.titulo || 'Desperdício de água na avenida Nambu'}</h2>
                        <p id="avenida-nambu">📍 {ocorrenciaDestaque.localizacao || 'Avenida Nambu, próximo à casa de Círlene do bar'}</p>
                        <p>{ocorrenciaDestaque.descricao || 'Relatado por morador. Situação recorrente devido a torneiras e mangueiras deixadas abertas por moradores da própria rua...'}</p>
                    </div>
                    <div>
                        <Link to={`/detalhes/${ocorrenciaDestaque.id || 'CC-489201'}`} className="btn">
                            VER DETALHES
                        </Link>
                    </div>
                </article>

                {/* CAIXA DE RELATAR PROBLEMA & MÉTRICAS */}
                <div className="card-relatar">
                    <div className="caixa-relatar">
                        <h2>REPORTAR UM PROBLEMA</h2>
                        <p>Ajude a melhorar nossa cidade<br />Registre um problema em poucos cliques</p>
                        <hr id="linha-horizontal" />
                        <div className="botoes-problema">
                            <Link to="/reportar?tipo=upload" className="caixa-icones" aria-label="Enviar Ocorrência">
                                <img src="/imagens/icone-baixar2.png" alt="Ícone de Upload" />
                                <span>Enviar</span>
                            </Link>
                            <div className="linha-vertical"></div>
                            <Link to="/reportar?tipo=foto" className="caixa-icones" aria-label="Tirar ou enviar foto">
                                <img src="/imagens/icone-camera2.png" alt="Ícone de Câmera" />
                                <span>Foto</span>
                            </Link>
                            <div className="linha-vertical"></div>
                            <Link to="/reportar?tipo=gps" className="caixa-icones" aria-label="Usar Localização GPS">
                                <img src="/imagens/icone-loq2.png" alt="Ícone de Localização" />
                                <span>Localização</span>
                            </Link>
                        </div>
                    </div>

                    {/* CAIXA DE MÉTRICAS */}
                    <h2>Métricas da Cidade</h2>
                    <div className="caixa-metrica" id="secao-metricas">
                        <MetricCounter targetValue={metricas.reportados} label="Problemas reportados" />
                        <MetricCounter targetValue={metricas.resolvidos} label="Problemas resolvidos" />
                        <MetricCounter targetValue={metricas.aguardando} label="Aguardando solução" />
                    </div>

                    {/* CAIXA DE ÚLTIMOS PROBLEMAS REPORTADOS */}
                    <div className="reportados1">
                        <h2>ÚLTIMOS PROBLEMAS REPORTADOS</h2>
                        <div className="caixa-lista">
                            <ul>
                                {ocorrencias.slice(0, 5).map((item) => (
                                    <li key={item.id}>
                                        <Link to={`/detalhes/${item.id}`}>
                                            {item.titulo.length > 38 ? `${item.titulo.substring(0, 38)}...` : item.titulo}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* SEÇÃO 2 - OS OBJETIVOS DE DESENVOLVIMENTO SUSTENTÁVEL */}
            <section className="segunda-secao" id="ods">
                <h2 id="titulo-pagina2">Os Objetivos de Desenvolvimento Sustentável</h2>
                <div className="os-objetivos">
                    <p id="textosp-pagina2">
                        Trabalhar os Objetivos de Desenvolvimento Sustentável (ODS) é essencial para
                        transformar metas globais em melhorias práticas para a vida cotidiana das pessoas. Longe de serem
                        conceitos abstratos, essas diretrizes oferecem um roteiro claro para combater a pobreza, proteger os
                        recursos naturais, reduzir desigualdades e incentivar o desenvolvimento econômico sustentável.
                    </p>
                    <img
                        src="/imagens/ods.webp"
                        alt="Infográfico ilustrativo dos Objetivos de Desenvolvimento Sustentável ODS da ONU"
                        id="imagem-OS"
                    />
                </div>
            </section>

            {/* SEÇÃO 3 - ODS 11 */}
            <section className="ods">
                <div className="ods-conteudo">
                    <h2 id="ODS11">ODS 11: Cidades e Comunidades Sustentáveis</h2>
                    <div className="texto-ods">
                        <p className="textos-menores">
                            A ODS 11 tem como princípio fundamental tornar os assentamentos humanos
                            inclusivos, seguros, resilientes e sustentáveis. Para um município com as características
                            socioambientais de Apicum-Açu, onde a dinâmica urbana se integra de forma direta aos
                            ecossistemas costeiros, estuários e manguezais da Baixada Maranhense, a gestão do espaço urbano
                            é uma questão de sobrevivência econômica e preservação ambiental.
                        </p>
                        <ul className="textos-menores">
                            <li>
                                <strong>Gestão Adequada de Resíduos Sólidos (Meta 11.6):</strong> Mapeamento de rotas de
                                coleta de lixo, combatendo o descarte inadequado em vias públicas, terrenos e canais naturais.
                            </li>
                            <li>
                                <strong>Transparência e Eficiência nos Serviços Urbanos:</strong> Canal direto para reportar
                                vazamentos de água, entulhos e falhas na iluminação pública em tempo real.
                            </li>
                            <li>
                                <strong>Urbanismo Participativo e Inclusão (Meta 11.3):</strong> Cada cidadão se torna um
                                agente ativo de zeladoria da sua rua e bairro.
                            </li>
                        </ul>
                    </div>
                </div>
                <img
                    src="/imagens/foto-barcos.webp"
                    alt="Barcos de pesca em área costeira de Apicum-Açu Maranhão"
                    id="imagem-barco"
                />
            </section>

            {/* SEÇÃO FINAL - NOSSO OBJETIVO */}
            <section className="ultimo" id="faca-sua-parte">
                <h2 id="objetivo">Nosso Objetivo</h2>
                <p className="textos-menores">
                    O <strong>Cuida Cidade!</strong> nasceu a partir da realização de um trabalho
                    acadêmico na disciplina de Desenvolvimento Web, com o propósito de transformar o conhecimento técnico em
                    uma ferramenta prática de impacto social para Apicum-Açu. A plataforma busca fortalecer a cidadania,
                    otimizar serviços municipais e garantir uma gestão urbana transparente, inclusiva e segura para todos os
                    moradores de Apicum-Açu.
                </p>
            </section>
        </main>
    );
};
