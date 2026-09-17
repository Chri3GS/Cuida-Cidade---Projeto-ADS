import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { usuario } = useApp();

    const closeMobileMenu = () => setMobileMenuOpen(false);

    return (
        <header>
            <nav aria-label="Navegação Principal">
                <div class="conteudo-cabecalho">
                    <Link to="/" class="grupo-logo" onClick={closeMobileMenu}>
                        <img src="/imagens/logo-cabecalho.png" alt="Logo Cuida Cidade" />
                        <h2>Cuida Cidade</h2>
                    </Link>

                    <div class="grupo-links">
                        <NavLink to="/" className={({ isActive }) => `links ${isActive ? 'active' : ''}`} end>
                            Início
                        </NavLink>
                        <NavLink to="/cronograma" className={({ isActive }) => `links ${isActive ? 'active' : ''}`}>
                            Cronograma da coleta
                        </NavLink>
                        <NavLink to="/faca-sua-parte" className={({ isActive }) => `links ${isActive ? 'active' : ''}`}>
                            Faça sua parte
                        </NavLink>
                    </div>

                    <div class="grupo-icones">
                        <Link to="/pesquisar" class="btn-icone-cabecalho" title="Pesquisar Ocorrências" aria-label="Pesquisar Ocorrências">
                            <img src="/imagens/lupa-cabecalho.png" alt="Ícone de pesquisa" class="icone-cabecalho" />
                        </Link>
                        <Link to="/login" class="btn-icone-cabecalho" title={usuario ? `Perfil (${usuario.nome})` : "Entrar / Meu Perfil"} aria-label="Entrar / Meu Perfil">
                            <img src="/imagens/homem-cabecalho.png" alt="Ícone de perfil do usuário" class="icone-cabecalho" />
                        </Link>
                    </div>

                    {/* MENU MOBILE REACT */}
                    <div class="menu-mobile-container">
                        <button
                            class="menu-mobile-btn"
                            onClick={() => setMobileMenuOpen(prev => !prev)}
                            aria-label="Abrir menu de navegação"
                        >
                            &#9776;
                        </button>
                        {mobileMenuOpen && (
                            <div class="menu-mobile-dropdown">
                                <Link to="/" onClick={closeMobileMenu}>Início</Link>
                                <Link to="/cronograma" onClick={closeMobileMenu}>Cronograma da coleta</Link>
                                <Link to="/faca-sua-parte" onClick={closeMobileMenu}>Faça sua parte</Link>
                                <Link to="/reportar" onClick={closeMobileMenu}>Reportar Problema</Link>
                                <Link to="/pesquisar" onClick={closeMobileMenu}>Pesquisar</Link>
                                <Link to="/login" onClick={closeMobileMenu}>Entrar / Login</Link>
                                <Link to="/cadastro" onClick={closeMobileMenu}>Cadastrar-se</Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};
