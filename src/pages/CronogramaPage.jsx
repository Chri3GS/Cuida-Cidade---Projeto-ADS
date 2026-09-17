import React, { useState } from 'react';

const DADOS_CRONOGRAMA = [
    { rua: 'Rua Santo Antônio', bairro: 'centro', tipo: 'Coleta Doméstica', dias: 'Segunda-feira/Quinta-feira', horario: 'Manhã' },
    { rua: 'Travessa Pinheiro', bairro: 'centro', tipo: 'Coleta Doméstica', dias: 'Segunda-feira/Quinta-feira', horario: 'Manhã' },
    { rua: 'Travessa Mirinzal', bairro: 'centro', tipo: 'Coleta Doméstica', dias: 'Segunda-feira/Quinta-feira', horario: 'Manhã' },
    { rua: 'Av. Tancredo Neves', bairro: 'mangueirão', tipo: 'Coleta Doméstica', dias: 'Segunda-feira/Quinta-feira', horario: 'Tarde' },
    { rua: 'Rua Salvador', bairro: 'mangueirão', tipo: 'Coleta Doméstica', dias: 'Segunda-feira/Quinta-feira', horario: 'Tarde' },
    { rua: 'Travessa Porto Alegre', bairro: 'mangueirão', tipo: 'Coleta Doméstica', dias: 'Segunda-feira/Quinta-feira', horario: 'Tarde' },
    { rua: 'Rua Getúlio Vargas', bairro: 'redenção', tipo: 'Coleta Doméstica', dias: 'Segunda-feira/Quinta-feira', horario: 'Tarde' },
    { rua: 'Rua Joaquim Amado', bairro: 'redenção', tipo: 'Coleta Doméstica', dias: 'Segunda-feira/Quinta-feira', horario: 'Tarde' },
    { rua: 'Rua Redenção', bairro: 'redenção', tipo: 'Coleta Doméstica', dias: 'Segunda-feira/Quinta-feira', horario: 'Tarde' },
    { rua: 'Rua Nova 1', bairro: 'novo-apicum', tipo: 'Coleta Doméstica', dias: 'Terça-feira/Sexta-feira', horario: 'Manhã' },
    { rua: 'Rua Nova 2', bairro: 'novo-apicum', tipo: 'Coleta Doméstica', dias: 'Terça-feira/Sexta-feira', horario: 'Manhã' },
    { rua: 'Rua Nova 3', bairro: 'novo-apicum', tipo: 'Coleta Doméstica', dias: 'Terça-feira/Sexta-feira', horario: 'Manhã' },
    { rua: 'Av. Gregório Castro', bairro: 'tabatinga', tipo: 'Coleta Doméstica', dias: 'Segunda-feira/Quinta-feira', horario: 'Manhã' },
    { rua: 'Rua Benedito Lopes', bairro: 'tabatinga', tipo: 'Coleta Doméstica', dias: 'Segunda-feira/Quinta-feira', horario: 'Manhã' },
    { rua: 'Rua Central', bairro: 'tabatinga', tipo: 'Coleta Doméstica', dias: 'Segunda-feira/Quinta-feira', horario: 'Manhã' },
    { rua: 'Portelinha', bairro: 'outras localidades', tipo: 'Coleta Doméstica', dias: 'Terça-feira/Sexta-feira', horario: 'Manhã' },
    { rua: 'Subestação', bairro: 'outras localidades', tipo: 'Coleta Doméstica', dias: 'Terça-feira/Sexta-feira', horario: 'Tarde' },
    { rua: 'Conjunto do Incra', bairro: 'outras localidades', tipo: 'Coleta Doméstica', dias: 'Terça-feira/Sexta-feira', horario: 'Tarde' }
];

export const CronogramaPage = () => {
    const [filtroAtivo, setFiltroAtivo] = useState('todos');

    const itensFiltrados = DADOS_CRONOGRAMA.filter(
        item => filtroAtivo === 'todos' || item.bairro === filtroAtivo
    );

    return (
        <main>
            <section className="page-header">
                <h1>Cronograma Municipal da Coleta de Lixo</h1>
                <p>Fique atento aos dias e horários da coleta em seu bairro. Manter a cidade limpa é dever de todos!</p>
            </section>

            <section className="container-pagina">
                {/* FILTROS POR BAIRRO */}
                <div className="filtro-cronograma">
                    <button
                        type="button"
                        className={`btn-filtro ${filtroAtivo === 'todos' ? 'ativo' : ''}`}
                        onClick={() => setFiltroAtivo('todos')}
                    >
                        Todos os Bairros
                    </button>
                    <button
                        type="button"
                        className={`btn-filtro ${filtroAtivo === 'centro' ? 'ativo' : ''}`}
                        onClick={() => setFiltroAtivo('centro')}
                    >
                        Centro
                    </button>
                    <button
                        type="button"
                        className={`btn-filtro ${filtroAtivo === 'mangueirão' ? 'ativo' : ''}`}
                        onClick={() => setFiltroAtivo('mangueirão')}
                    >
                        Mangueirão
                    </button>
                    <button
                        type="button"
                        className={`btn-filtro ${filtroAtivo === 'redenção' ? 'ativo' : ''}`}
                        onClick={() => setFiltroAtivo('redenção')}
                    >
                        Redenção
                    </button>
                    <button
                        type="button"
                        className={`btn-filtro ${filtroAtivo === 'novo-apicum' ? 'ativo' : ''}`}
                        onClick={() => setFiltroAtivo('novo-apicum')}
                    >
                        Novo Apicum
                    </button>
                    <button
                        type="button"
                        className={`btn-filtro ${filtroAtivo === 'tabatinga' ? 'ativo' : ''}`}
                        onClick={() => setFiltroAtivo('tabatinga')}
                    >
                        Tabatinga
                    </button>
                    <button
                        type="button"
                        className={`btn-filtro ${filtroAtivo === 'outras localidades' ? 'ativo' : ''}`}
                        onClick={() => setFiltroAtivo('outras localidades')}
                    >
                        Outras Localidades
                    </button>
                </div>

                {/* TABELA DE CRONOGRAMA */}
                <table className="tabela-cronograma">
                    <thead>
                        <tr>
                            <th>Ruas</th>
                            <th>Tipo de Coleta</th>
                            <th>Dias da Semana</th>
                            <th>Horário Recomendado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itensFiltrados.map((row, idx) => (
                            <tr key={idx} data-bairro={row.bairro}>
                                <td><strong>{row.rua}</strong></td>
                                <td><span className="badge-tipo badge-domestica">{row.tipo}</span></td>
                                <td>{row.dias}</td>
                                <td>{row.horario}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* RECOMENDAÇÕES */}
                <div className="grid-dicas">
                    <div className="card-dica">
                        <h3>📦 Acondicionamento Correto</h3>
                        <p>Coloque o lixo em sacos plásticos bem vedados. Evite deixar sacos abertos no chão para evitar a ação de animais errantes.</p>
                    </div>
                    <div className="card-dica">
                        <h3>⏰ Horário de Descarte</h3>
                        <p>Coloque o lixo na lixeira no máximo 1 hora antes da passagem do caminhão coletor para manter as vias limpas.</p>
                    </div>
                    <div className="card-dica">
                        <h3>⚠️ Vidros e Objetos Cortantes</h3>
                        <p>Embale vidros quebrados e objetos pontiagudos em caixas de papelão ou garrafas PET para proteger os garis.</p>
                    </div>
                </div>
            </section>
        </main>
    );
};
