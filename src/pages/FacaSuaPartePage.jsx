import React from 'react';
import { Link } from 'react-router-dom';

export const FacaSuaPartePage = () => {
    return (
        <main>
            <section className="page-header">
                <h1>Faça Sua Parte por Apicum-Açu</h1>
                <p>Pequenas ações diárias protegem nossos manguezais, mantêm nossas ruas limpas e evitam desperdícios.</p>
            </section>

            <section className="container-pagina">
                <div className="grid-dicas">
                    <div className="card-dica">
                        <h3>🌊 Preservação dos Manguezais</h3>
                        <p>Apicum-Açu é abençoada com uma rica zona costeira. Nunca descarte plástico ou lixo nos igarapés, pois os resíduos contaminam o ecossistema e prejudicam a pesca local.</p>
                    </div>

                    <div className="card-dica">
                        <h3>🚰 Combate ao Desperdício de Água</h3>
                        <p>Feche torneiras e mangueiras após o uso. Se identificar vazamento na rede pública da sua rua, tire uma foto e reporte imediatamente aqui na plataforma.</p>
                    </div>

                    <div className="card-dica">
                        <h3>♻️ Separação de Resíduos</h3>
                        <p>Separe papéis, plásticos e metais dos restos de alimentos. A reciclagem reduz o volume de lixo enviado aos aterros e gera renda.</p>
                    </div>

                    <div className="card-dica">
                        <h3>🛢️ Descarte Consciente de Óleo</h3>
                        <p>Nunca despeje óleo de cozinha usado na pia ou no solo. Guarde em garrafas PET e entregue nos pontos de coleta comunitários.</p>
                    </div>

                    <div className="card-dica">
                        <h3>🧹 Limpeza da Frente de Casa</h3>
                        <p>Varrer a calçada e manter a frente da sua residência limpa evita o entupimento de bueiros e previne alagamentos em dias de chuva forte.</p>
                    </div>

                    <div className="card-dica">
                        <h3>📢 Cidadania Ativa</h3>
                        <p>Ajude a fiscalizar e conscientizar vizinhos. Utilize o botão de denúncia para relatar lâmpadas queimadas, entulhos e focos de queimada irregular.</p>
                    </div>
                </div>

                {/* CHAMADA PARA AÇÃO */}
                <div style={{ textAlign: 'center', marginTop: '40px', background: 'white', padding: '40px', borderRadius: '16px', boxShadow: 'var(--shadow-md)' }}>
                    <h2 style={{ color: 'var(--primary-dark)', marginBottom: '12px' }}>Viu um problema no seu bairro?</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Não espere que outros resolvam. Tire uma foto e informe a prefeitura em menos de 1 minuto!</p>
                    <Link to="/reportar" className="btn">REPORTAR AGORA</Link>
                </div>
            </section>
        </main>
    );
};
