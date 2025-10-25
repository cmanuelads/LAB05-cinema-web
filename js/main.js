// cinema-web/js/main.js

// Funções utilitárias para localStorage (Armazenamento e leitura de arrays de objetos em JSON [cite: 14])

/**
 * Obtém dados de uma chave do localStorage.
 * @param {string} chave - A chave do localStorage (ex: 'filmes', 'salas').
 * @returns {Array} - O array de objetos, ou um array vazio se não houver dados.
 */
function getDados(chave) {
    const dadosJSON = localStorage.getItem(chave);
    // Retorna o JSON parseado ou um array vazio
    return dadosJSON ? JSON.parse(dadosJSON) : []; 
}

/**
 * Salva dados em uma chave do localStorage.
 * @param {string} chave - A chave do localStorage.
 * @param {Array} dados - O array de objetos a ser salvo.
 */
function salvarDados(chave, dados) {
    localStorage.setItem(chave, JSON.stringify(dados));
}

// Lógica para criar o menu de navegação que deve ser fixo em todas as páginas [cite: 66]
function criarMenu() {
    const navHTML = `
        <header>
            <nav>
                <a href="index.html">Início</a>
                <a href="cadastro-filmes.html">Cadastro de Filmes</a>
                <a href="cadastro-salas.html">Cadastro de Salas</a>
                <a href="cadastro-sessoes.html">Cadastro de Sessões</a>
                <a href="venda-ingressos.html">Venda de Ingressos</a>
                <a href="sessoes.html">Sessões Disponíveis</a>
            </nav>
        </header>
        <style>
            header {
                background-color: #333;
                color: white;
                padding: 10px 0;
                text-align: center;
                position: sticky; /* ou fixed, mas sticky é mais comum para menu fixo em cima */
                top: 0;
                width: 100%;
                z-index: 1000;
            }
            nav a {
                color: white;
                margin: 0 15px;
                text-decoration: none;
                font-weight: bold;
            }
        </style>
    `;
    // Insere o menu no início do corpo da página
    document.body.insertAdjacentHTML('afterbegin', navHTML); 
}

// Executar a criação do menu ao carregar a página
document.addEventListener('DOMContentLoaded', criarMenu);

// Exporta as funções utilitárias para uso em outros scripts
// Nota: Em JS puro (sem módulos), as funções são globais, mas é bom documentar a intenção.
// A linha abaixo é apenas um comentário ilustrativo, as funções já são globais.
// export { getDados, salvarDados };