// cinema-web/js/cadastroFilmes.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Captura o formulário
    const form = document.getElementById('formCadastroFilme');

    // 2. Adiciona o listener para o evento de submit
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio tradicional do formulário (recarregar a página)

        // 3. Captura os dados do formulário
        const filme = {
            // Cria um ID único para o filme (timestamp é uma forma simples)
            id: Date.now(), 
            titulo: document.getElementById('titulo').value, // [cite: 25]
            descricao: document.getElementById('descricao').value, // [cite: 26]
            genero: document.getElementById('genero').value, // [cite: 27]
            classificacao: document.getElementById('classificacao').value, // [cite: 28]
            duracao: parseInt(document.getElementById('duracao').value), // [cite: 29] (input number)
            dataEstreia: document.getElementById('dataEstreia').value // [cite: 30]
        };

        // 4. Lê o array de filmes existente (usando a função de main.js)
        // A função getDados deve ser global se main.js for carregado antes.
        // Chave: filmes 
        let filmes = getDados('filmes'); 

        // 5. Adiciona o novo filme ao array
        filmes.push(filme);

        // 6. Salva o array atualizado no localStorage (usando a função de main.js)
        salvarDados('filmes', filmes); // 

        // 7. Feedback ao usuário e limpeza do formulário
        alert(`Filme "${filme.titulo}" salvo com sucesso!`);
        form.reset();
    });
});