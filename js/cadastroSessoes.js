// cinema-web/js/cadastroSessoes.js

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Carregar Filmes e Salas nos Selects (Criação dinâmica de elementos ) ---
    
    const selectFilme = document.getElementById('filme');
    const selectSala = document.getElementById('sala');

    // Carrega Filmes do localStorage 
    function carregarFilmes() {
        const filmes = getDados('filmes'); // Usa função global de main.js
        if (filmes.length === 0) {
            console.warn('Nenhum filme cadastrado.');
            return;
        }

        filmes.forEach(filme => {
            const option = document.createElement('option');
            // O valor da option será o ID do filme (para encadeamento de dados [cite: 15])
            option.value = filme.id; 
            option.textContent = filme.titulo;
            selectFilme.appendChild(option);
        });
    }

    // Carrega Salas do localStorage 
    function carregarSalas() {
        const salas = getDados('salas'); // Usa função global de main.js
        if (salas.length === 0) {
            console.warn('Nenhuma sala cadastrada.');
            return;
        }

        salas.forEach(sala => {
            const option = document.createElement('option');
            // O valor da option será o ID da sala (para encadeamento de dados [cite: 15])
            option.value = sala.id; 
            option.textContent = `${sala.nome} (${sala.tipo} - ${sala.capacidade} assentos)`;
            selectSala.appendChild(option);
        });
    }

    carregarFilmes();
    carregarSalas();

    
    // --- 2. Lógica de Salvamento da Sessão ---

    const form = document.getElementById('formCadastroSessao');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio

        // Captura os dados do formulário
        const sessao = {
            // ID único para a sessão
            id: Date.now(), 
            // Guarda apenas o ID do filme e da sala (encadeamento de dados [cite: 15])
            idFilme: parseInt(document.getElementById('filme').value), 
            idSala: parseInt(document.getElementById('sala').value), 
            dataHora: document.getElementById('dataHora').value, //
            preco: parseFloat(document.getElementById('preco').value), //
            idioma: document.getElementById('idioma').value, //
            formato: document.getElementById('formato').value, //
            // Capacidade inicial de ingressos disponíveis é a capacidade total da sala
            ingressosVendidos: 0 
        };

        // Lê o array de sessões existente (usando a função de main.js)
        let sessoes = getDados('sessoes'); 

        // Adiciona a nova sessão ao array
        sessoes.push(sessao);

        // Salva o array atualizado no localStorage (chave: sessoes )
        salvarDados('sessoes', sessoes);

        // Feedback ao usuário e limpeza do formulário
        alert('Sessão cadastrada com sucesso!');
        form.reset();
        
        // Recarrega os selects para garantir que os placeholders voltem
        selectFilme.selectedIndex = 0;
        selectSala.selectedIndex = 0;
    });
});