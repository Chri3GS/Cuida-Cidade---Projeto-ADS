import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

const DADOS_INICIAIS_OCORRENCIAS = [
    {
        id: 'CC-489201',
        titulo: 'Desperdício de água na avenida Nambu',
        localizacao: 'Avenida Nambu, próximo à casa de Círlene do bar - Apicum-Açu, MA',
        bairro: 'Centro',
        descricao: 'Situação relatada por moradores que ocorre de forma recorrente há anos. Trata-se do acúmulo e vazamento de água limpa na via devido a torneiras e mangueiras deixadas abertas indevidamente, gerando poças, erosão no calçamento e desperdício de recurso hídrico valioso para o município.',
        data: '28/08/2026',
        status: 'Em Andamento',
        badgeClass: 'status-andamento',
        imagem: '/imagens/alagamento-rua.webp',
        apoios: 42,
        timeline: [
            { titulo: '1. Ocorrência Registrada pelo Morador', data: '28/08/2026 às 09:15', desc: 'Protocolo gerado com foto anexada.', concluido: true },
            { titulo: '2. Triagem e Encaminhamento', data: '29/08/2026 às 14:30', desc: 'Encaminhado para a Secretaria de Infraestrutura e Meio Ambiente.', concluido: true },
            { titulo: '3. Inspeção Técnica Agendada', data: '31/08/2026 às 10:00', desc: 'Equipe de conscientização e fiscalização enviada ao local.', concluido: true },
            { titulo: '4. Resolução e Reparo Final', data: 'Previsão em breve', desc: 'Ajuste de rede de distribuição e orientação aos moradores.', concluido: false }
        ]
    },
    {
        id: 'CC-102934',
        titulo: 'Limpeza e desobstrução de igarapé',
        localizacao: 'Zona Costeira - Apicum-Açu, MA',
        bairro: 'Ponta de Areia',
        descricao: 'Retirada de resíduos flutuantes e plásticos no porto dos barcos para evitar contaminação do manguezal e desobstruir os igarapés navegáveis.',
        data: '15/08/2026',
        status: 'Resolvido',
        badgeClass: 'status-resolvido',
        imagem: '/imagens/foto-barcos.webp',
        apoios: 67,
        timeline: [
            { titulo: '1. Relato enviado', data: '15/08/2026', desc: 'Equipe de pesca reportou resíduos acumulados.', concluido: true },
            { titulo: '2. Mutirão de Limpeza', data: '17/08/2026', desc: 'Ação realizada pela Secretaria de Meio Ambiente e voluntários.', concluido: true }
        ]
    },
    {
        id: 'CC-882310',
        titulo: 'Lâmpadas queimadas na rua principal',
        localizacao: 'Bairro Novo - Apicum-Açu, MA',
        bairro: 'Bairro Novo',
        descricao: 'Trecho de 200m no escuro necessitando substituição urgência de luminárias LED para segurança dos moradores noturnos.',
        data: '02/09/2026',
        status: 'Em Aberto',
        badgeClass: 'status-aberto',
        imagem: '/imagens/imagem-aerea.webp',
        apoios: 18,
        timeline: [
            { titulo: '1. Ocorrência Registrada', data: '02/09/2026 às 18:40', desc: 'Aguardando agendamento da equipe elétrica.', concluido: true }
        ]
    }
];

export const AppProvider = ({ children }) => {
    // Carregar ocorrencias salvas ou dados padrão
    const [ocorrencias, setOcorrencias] = useState(() => {
        const salvas = localStorage.getItem('cuida_cidade_ocorrencias');
        if (salvas) {
            try {
                return JSON.parse(salvas);
            } catch (e) {
                return DADOS_INICIAIS_OCORRENCIAS;
            }
        }
        return DADOS_INICIAIS_OCORRENCIAS;
    });

    // IDs de ocorrências apoiadas pelo usuário
    const [apoiados, setApoiados] = useState(() => {
        const salvas = localStorage.getItem('cuida_cidade_apoiados');
        if (salvas) {
            try {
                return new Set(JSON.parse(salvas));
            } catch (e) {
                return new Set();
            }
        }
        return new Set();
    });

    // Sessão do Usuário (simulada)
    const [usuario, setUsuario] = useState(() => {
        const salvo = localStorage.getItem('cuida_cidade_user');
        return salvo ? JSON.parse(salvo) : null;
    });

    // Salvar ocorrências quando houver mudanças
    useEffect(() => {
        localStorage.setItem('cuida_cidade_ocorrencias', JSON.stringify(ocorrencias));
    }, [ocorrencias]);

    // Salvar apoios quando houver mudanças
    useEffect(() => {
        localStorage.setItem('cuida_cidade_apoiados', JSON.stringify(Array.from(apoiados)));
    }, [apoiados]);

    // Adicionar nova ocorrência
    const adicionarOcorrencia = (novaData) => {
        const idProtocolo = `CC-${Math.floor(100000 + Math.random() * 900000)}`;
        const novaOcorrencia = {
            id: idProtocolo,
            titulo: novaData.titulo || `${novaData.tipoNome} na ${novaData.localizacao}`,
            localizacao: novaData.localizacao,
            bairro: novaData.bairro || 'Centro',
            descricao: novaData.descricao,
            data: new Date().toLocaleDateString('pt-BR'),
            status: 'Em Aberto',
            badgeClass: 'status-aberto',
            imagem: novaData.imagemPreview || '/imagens/alagamento-rua.webp',
            autor: novaData.autor || 'Morador Anônimo',
            apoios: 1,
            timeline: [
                {
                    titulo: '1. Ocorrência Registrada pelo Morador',
                    data: `${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`,
                    desc: `Protocolo #${idProtocolo} gerado.`,
                    concluido: true
                }
            ]
        };

        setOcorrencias(prev => [novaOcorrencia, ...prev]);
        return idProtocolo;
    };

    // Alternar Apoio (Upvote)
    const toggleApoio = (id) => {
        setApoiados(prev => {
            const novoSet = new Set(prev);
            const jaApoiou = novoSet.has(id);

            if (jaApoiou) {
                novoSet.delete(id);
            } else {
                novoSet.add(id);
            }

            // Atualizar contagem na ocorrência
            setOcorrencias(prevOcorrencias =>
                prevOcorrencias.map(item => {
                    if (item.id === id) {
                        return {
                            ...item,
                            apoios: jaApoiou ? Math.max(0, item.apoios - 1) : item.apoios + 1
                        };
                    }
                    return item;
                })
            );

            return novoSet;
        });
    };

    // Login
    const login = (identificador) => {
        const userObj = { id: Date.now(), nome: identificador.split('@')[0], identificador };
        setUsuario(userObj);
        localStorage.setItem('cuida_cidade_user', JSON.stringify(userObj));
    };

    // Logout
    const logout = () => {
        setUsuario(null);
        localStorage.removeItem('cuida_cidade_user');
    };

    // Métricas dinâmicas
    const totalReportados = 124 + ocorrencias.length;
    const totalResolvidos = 89;
    const totalAguardando = totalReportados - totalResolvidos;

    return (
        <AppContext.Provider value={{
            ocorrencias,
            apoiados,
            usuario,
            adicionarOcorrencia,
            toggleApoio,
            login,
            logout,
            metricas: {
                reportados: totalReportados,
                resolvidos: totalResolvidos,
                aguardando: totalAguardando
            }
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);
