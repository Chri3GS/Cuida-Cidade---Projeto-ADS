/* ==========================================================================
   CUIDA CIDADE - JAVASCRIPT PRINCIPAL
   Lógica de interatividade, animações, filtros e formulários
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. ANIMAÇÃO DE NÚMEROS NAS MÉTRICAS (INTERSECTION OBSERVER) --- */
    const numeros = document.querySelectorAll('.numero');
    
    if (numeros.length > 0) {
        const observerOptions = {
            root: null,
            threshold: 0.3
        };

        const animarNumeros = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const valorFinal = Number(el.getAttribute('data-valor') || el.textContent.trim());

                    if (!isNaN(valorFinal)) {
                        el.setAttribute('data-valor', valorFinal);
                        el.textContent = '0';
                        
                        const duracao = 2000;
                        const inicio = performance.now();

                        function atualizar(tempoAtual) {
                            const tempoDecorrido = tempoAtual - inicio;
                            const progresso = Math.min(tempoDecorrido / duracao, 1);
                            const valorAtual = Math.floor(progresso * valorFinal);
                            
                            el.textContent = valorAtual;

                            if (progresso < 1) {
                                requestAnimationFrame(atualizar);
                            } else {
                                el.textContent = valorFinal;
                            }
                        }

                        requestAnimationFrame(atualizar);
                    }
                    observer.unobserve(el);
                }
            });
        };

        const observer = new IntersectionObserver(animarNumeros, observerOptions);
        numeros.forEach(num => observer.observe(num));
    }

    /* --- 2. FECHAR MENU MOBILE AO CLICAR FORA --- */
    const menuMobile = document.querySelector('.menu-mobile');
    if (menuMobile) {
        document.addEventListener('click', (e) => {
            if (!menuMobile.contains(e.target) && menuMobile.hasAttribute('open')) {
                menuMobile.removeAttribute('open');
            }
        });
    }

    /* --- 3. GEOLOCALIZAÇÃO SIMULADA / REAL NO FORMULÁRIO DE DENÚNCIA --- */
    const btnGps = document.getElementById('btn-gps');
    const inputEndereco = document.getElementById('input-endereco');

    if (btnGps && inputEndereco) {
        btnGps.addEventListener('click', () => {
            btnGps.textContent = '📍 Obtendo localização...';
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const lat = position.coords.latitude.toFixed(4);
                        const lng = position.coords.longitude.toFixed(4);
                        inputEndereco.value = `Latitude: ${lat}, Longitude: ${lng} (Apicum-Açu, MA)`;
                        btnGps.textContent = '✅ Localização Obtida!';
                    },
                    (error) => {
                        inputEndereco.value = "Avenida Nambu, Apicum-Açu - MA (GPS estimado)";
                        btnGps.textContent = '📍 Localização Estimada Adicionada';
                    }
                );
            } else {
                inputEndereco.value = "Centro, Apicum-Açu - MA";
                btnGps.textContent = '📍 Localização Adicionada';
            }
        });
    }

    /* --- 4. PREVIEW DE IMAGEM NO UPLOAD --- */
    const inputFoto = document.getElementById('input-foto');
    const previewFoto = document.getElementById('preview-foto');

    if (inputFoto && previewFoto) {
        inputFoto.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.addEventListener('load', function() {
                    previewFoto.src = this.result;
                    previewFoto.style.display = 'block';
                });
                reader.readAsDataURL(file);
            }
        });
    }

    /* --- 5. ENVIO DO FORMULÁRIO DE OCORRÊNCIA --- */
    const formReportar = document.getElementById('form-reportar');
    if (formReportar) {
        formReportar.addEventListener('submit', (e) => {
            e.preventDefault();
            const protocolo = Math.floor(100000 + Math.random() * 900000);
            alert(`Ocorrência enviada com sucesso!\n\nSeu protocolo é: #CC-${protocolo}\nA prefeitura de Apicum-Açu analisará seu relato.`);
            formReportar.reset();
            if (previewFoto) previewFoto.style.display = 'none';
            window.location.href = 'index.html';
        });
    }

    /* --- 6. BUSCA AO VIVO EM PESQUISAR.HTML --- */
    const searchInput = document.getElementById('search-input');
    const cardsResultado = document.querySelectorAll('.card-resultado');

    if (searchInput && cardsResultado.length > 0) {
        searchInput.addEventListener('input', (e) => {
            const termo = e.target.value.toLowerCase().trim();

            cardsResultado.forEach(card => {
                const texto = card.textContent.toLowerCase();
                if (texto.includes(termo)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    /* --- 7. FILTROS NA PÁGINA DE CRONOGRAMA --- */
    const botoesFiltro = document.querySelectorAll('.btn-filtro');
    const linhasTabela = document.querySelectorAll('.tabela-cronograma tbody tr');

    if (botoesFiltro.length > 0 && linhasTabela.length > 0) {
        botoesFiltro.forEach(btn => {
            btn.addEventListener('click', () => {
                botoesFiltro.forEach(b => b.classList.remove('ativo'));
                btn.classList.add('ativo');

                const filtro = btn.getAttribute('data-filtro');

                linhasTabela.forEach(linha => {
                    const bairro = linha.getAttribute('data-bairro');
                    if (filtro === 'todos' || bairro === filtro) {
                        linha.style.display = '';
                    } else {
                        linha.style.display = 'none';
                    }
                });
            });
        });
    }

    /* --- 8. BOTÃO DE APOIO EM DETALHES --- */
    const btnApoiar = document.getElementById('btn-apoiar');
    const contadorApoio = document.getElementById('contador-apoio');

    if (btnApoiar && contadorApoio) {
        let apoiado = false;
        btnApoiar.addEventListener('click', () => {
            let total = parseInt(contadorApoio.textContent);
            if (!apoiado) {
                total++;
                contadorApoio.textContent = total;
                btnApoiar.textContent = '💚 Ocorrência Apoia!';
                btnApoiar.style.backgroundColor = '#15803d';
                apoiado = true;
            } else {
                total--;
                contadorApoio.textContent = total;
                btnApoiar.textContent = '👍 Apoiar esta ocorrência';
                btnApoiar.style.backgroundColor = '';
                apoiado = false;
            }
        });
    }

    /* --- 9. FORMULÁRIO DE CADASTRO DE MORADOR --- */
    const formCadastro = document.getElementById('form-cadastro');
    const inputTelefone = document.getElementById('telefone');

    if (inputTelefone) {
        inputTelefone.addEventListener('input', (e) => {
            let valor = e.target.value.replace(/\D/g, '');
            if (valor.length > 11) valor = valor.slice(0, 11);

            if (valor.length > 6) {
                e.target.value = `(${valor.slice(0, 2)}) ${valor.slice(2, 7)}-${valor.slice(7)}`;
            } else if (valor.length > 2) {
                e.target.value = `(${valor.slice(0, 2)}) ${valor.slice(2)}`;
            } else if (valor.length > 0) {
                e.target.value = `(${valor}`;
            }
        });
    }

    if (formCadastro) {
        formCadastro.addEventListener('submit', (e) => {
            e.preventDefault();
            const nome = document.getElementById('nome').value;
            alert(`🎉 Cadastro realizado com sucesso!\n\nBem-vindo(a), ${nome}!\nSeu cadastro no Cuida Cidade foi ativado.`);
            formCadastro.reset();
            window.location.href = 'reportar.html';
        });
    }

    /* --- 10. FORMULÁRIO DE LOGIN --- */
    const formLogin = document.getElementById('form-login');
    if (formLogin) {
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault();
            const usuario = document.getElementById('login-identificador').value;
            alert(`🔓 Login efetuado com sucesso!\n\nBem-vindo(a) de volta!`);
            window.location.href = 'index.html';
        });
    }
});
