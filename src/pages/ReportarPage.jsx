import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const ReportarPage = () => {
    const { adicionarOcorrencia } = useApp();
    const navigate = useNavigate();

    const [tipo, setTipo] = useState('');
    const [localizacao, setLocalizacao] = useState('');
    const [descricao, setDescricao] = useState('');
    const [nome, setNome] = useState('');
    const [imagemPreview, setImagemPreview] = useState('');
    const [btnGpsText, setBtnGpsText] = useState('📍 Usar minha localização GPS atual');

    const handleFotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagemPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleObterGps = () => {
        setBtnGpsText('📍 Obtendo localização...');
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude.toFixed(4);
                    const lng = position.coords.longitude.toFixed(4);
                    setLocalizacao(`Latitude: ${lat}, Longitude: ${lng} (Apicum-Açu, MA)`);
                    setBtnGpsText('✅ Localização Obtida!');
                },
                () => {
                    setLocalizacao("Avenida Nambu, Apicum-Açu - MA (GPS estimado)");
                    setBtnGpsText('📍 Localização Estimada Adicionada');
                }
            );
        } else {
            setLocalizacao("Centro, Apicum-Açu - MA");
            setBtnGpsText('📍 Localização Adicionada');
        }
    };

    const getTipoNome = (t) => {
        switch (t) {
            case 'vazamento': return 'Vazamento de Água';
            case 'lixo': return 'Acúmulo de Lixo / Entulho';
            case 'iluminacao': return 'Falha na Iluminação Pública';
            case 'buraco': return 'Buraco / Asfalto Danificado';
            case 'animal': return 'Animal Errante / em Perigo';
            default: return 'Ocorrência Urbana';
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!tipo || !localizacao || !descricao) {
            alert('Por favor, preencha todos os campos obrigatórios (*).');
            return;
        }

        const idProtocolo = adicionarOcorrencia({
            tipo,
            tipoNome: getTipoNome(tipo),
            localizacao,
            descricao,
            autor: nome || 'Morador de Apicum-Açu',
            imagemPreview: imagemPreview || '/imagens/alagamento-rua.webp'
        });

        alert(`Ocorrência enviada com sucesso!\n\nSeu protocolo é: #${idProtocolo}\nA prefeitura de Apicum-Açu analisará seu relato.`);
        navigate(`/detalhes/${idProtocolo}`);
    };

    return (
        <main>
            <section className="page-header">
                <h1>Reportar um Problema Urbano</h1>
                <p>Sua colaboração é fundamental! Preencha as informações abaixo para notificar as equipes de zeladoria pública.</p>
            </section>

            <section className="container-pagina">
                <div className="form-card">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="tipo-problema">Tipo de Ocorrência *</label>
                            <select
                                id="tipo-problema"
                                className="form-control"
                                value={tipo}
                                onChange={(e) => setTipo(e.target.value)}
                                required
                            >
                                <option value="">Selecione o tipo de problema...</option>
                                <option value="vazamento">💧 Desperdício ou Vazamento de Água</option>
                                <option value="lixo">🗑️ Lixo ou Entulho Acumulado</option>
                                <option value="iluminacao">💡 Falha na Iluminação Pública</option>
                                <option value="buraco">🕳️ Buraco na Via / Asfalto Danificado</option>
                                <option value="animal">🐕 Animal Errante ou em Perigo</option>
                                <option value="outro">❓ Outro Problema</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="input-endereco">Localização da Ocorrência (Rua / Bairro / Referência) *</label>
                            <input
                                type="text"
                                id="input-endereco"
                                className="form-control"
                                placeholder="Ex: Avenida Nambu, próximo ao bar da Círlene"
                                value={localizacao}
                                onChange={(e) => setLocalizacao(e.target.value)}
                                required
                            />
                            <button type="button" onClick={handleObterGps} className="btn-gps">
                                {btnGpsText}
                            </button>
                        </div>

                        <div className="form-group">
                            <label htmlFor="descricao">Descrição Detalhada do Problema *</label>
                            <textarea
                                id="descricao"
                                className="form-control"
                                placeholder="Descreva a situação, há quanto tempo acontece e detalhes que ajudem a equipe a encontrar a ocorrência..."
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                                required
                            ></textarea>
                        </div>

                        <div className="form-group">
                            <label htmlFor="input-foto">Foto da Ocorrência (Opcional, mas recomendado)</label>
                            <input
                                type="file"
                                id="input-foto"
                                className="form-control"
                                accept="image/*"
                                onChange={handleFotoChange}
                            />
                            {imagemPreview && (
                                <img
                                    src={imagemPreview}
                                    alt="Pré-visualização da imagem enviada"
                                    className="preview-imagem"
                                />
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="nome-morador">Seu Nome / Contato (Opcional)</label>
                            <input
                                type="text"
                                id="nome-morador"
                                className="form-control"
                                placeholder="Morador de Apicum-Açu (Pode deixar em branco se preferir anônimo)"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                        </div>

                        <div style={{ textAlign: 'center', marginTop: '30px' }}>
                            <button type="submit" className="btn" style={{ width: '100%', maxWidth: '320px' }}>
                                ENVIAR RELATO
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
};
