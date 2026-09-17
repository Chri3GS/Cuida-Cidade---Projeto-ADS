import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

import { HomePage } from './pages/HomePage';
import { CronogramaPage } from './pages/CronogramaPage';
import { FacaSuaPartePage } from './pages/FacaSuaPartePage';
import { PesquisarPage } from './pages/PesquisarPage';
import { ReportarPage } from './pages/ReportarPage';
import { DetalhesPage } from './pages/DetalhesPage';
import { LoginPage } from './pages/LoginPage';
import { CadastroPage } from './pages/CadastroPage';

export const App = () => {
    return (
        <AppProvider>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/cronograma" element={<CronogramaPage />} />
                <Route path="/faca-sua-parte" element={<FacaSuaPartePage />} />
                <Route path="/pesquisar" element={<PesquisarPage />} />
                <Route path="/reportar" element={<ReportarPage />} />
                <Route path="/detalhes" element={<DetalhesPage />} />
                <Route path="/detalhes/:id" element={<DetalhesPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/cadastro" element={<CadastroPage />} />
            </Routes>
            <Footer />
        </AppProvider>
    );
};
