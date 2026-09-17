import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
    return (
        <footer>
            <div className="footer-conteudo">
                <div className="footer-col">
                    <h3>Cuida Cidade</h3>
                    <p>Plataforma comunitária de zeladoria urbana e desenvolvimento sustentável para Apicum-Açu - MA.</p>
                </div>
                <div className="footer-col">
                    <h3>Navegação</h3>
                    <p><Link to="/">Início</Link></p>
                    <p><Link to="/cronograma">Cronograma da Coleta</Link></p>
                    <p><Link to="/faca-sua-parte">Faça Sua Parte</Link></p>
                    <p><Link to="/reportar">Reportar Problema</Link></p>
                </div>
                <div className="footer-col">
                    <h3>Contato & Apoio</h3>
                    <p>Desenvolvimento Web - Apicum-Açu</p>
                    <p>Alinhado ao ODS 11 da ONU (Cidades Sustentáveis)</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Cuida Cidade Apicum-Açu. Todos os direitos reservados.</p>
            </div>
        </footer>
    );
};
