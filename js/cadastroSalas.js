// cinema-web/js/cadastroSalas.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Captura o formulário
    const form = document.getElementById('formCadastroSala');

    // 2. Adiciona o listener para o evento de submit
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio tradicional do formulário

        // 3. Captura os dados do formulário [cite: 34, 35, 37]
        const sala = {
            // Cria um ID único para a sala
            id: Date.now(), 
            nome: document.getElementById('nomeSala').value, // Nome da Sala 
            capacidade: parseInt(document.getElementById('capacidade').value), // Capacidade 
            tipo: document.getElementById('tipo').value // Tipo 
        };

        // 4. Lê o array de salas existente (usando a função de main.js)
        // Chave: salas 
        let salas = getDados('salas'); 

        // 5. Adiciona a nova sala ao array
        salas.push(sala);

        // 6. Salva o array atualizado no localStorage (usando a função de main.js)
        salvarDados('salas', salas); // Armazenamento: Salvar em localStorage (chave: salas) 

        // 7. Feedback ao usuário e limpeza do formulário
        alert(`Sala "${sala.nome}" com capacidade para ${sala.capacidade} pessoas (${sala.tipo}) salva com sucesso!`);
        form.reset();
    });
});