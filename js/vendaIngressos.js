// cinema-web/js/vendaIngressos.js

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Carregar Sessões Disponíveis nos Selects (Carregado do localStorage ) ---
    
    const selectSessao = document.getElementById('sessao');
    const form = document.getElementById('formVendaIngresso');

    // Carrega sessões, filmes e salas para exibir a informação completa
    function carregarSessoesParaVenda() {
        const sessoes = getDados('sessoes');
        const filmes = getDados('filmes');
        const salas = getDados('salas');

        if (sessoes.length === 0) {
            console.warn('Nenhuma sessão cadastrada.');
            return;
        }

        sessoes.forEach(sessao => {
            // Encontra o filme e a sala correspondentes pelo ID (Encadeamento de dados [cite: 15])
            const filme = filmes.find(f => f.id === sessao.idFilme);
            const sala = salas.find(s => s.id === sessao.idSala);

            // Formata a data para melhor visualização
            const dataHora = new Date(sessao.dataHora).toLocaleString('pt-BR', { 
                day: '2-digit', month: '2-digit', year: 'numeric', 
                hour: '2-digit', minute: '2-digit' 
            });

            if (filme && sala) {
                const option = document.createElement('option');
                // O valor da option é o ID da sessão
                option.value = sessao.id; 
                option.textContent = 
                    `${filme.titulo} - ${sala.nome} - ${dataHora} - R$ ${sessao.preco.toFixed(2)}`;
                selectSessao.appendChild(option);
            }
        });
    }

    carregarSessoesParaVenda();

    
    // --- 2. Lógica de Confirmação de Venda ---

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio

        // Captura os dados do formulário
        const ingresso = {
            // ID único para o ingresso
            id: Date.now(), 
            idSessao: parseInt(document.getElementById('sessao').value), // Sessão selecionada [cite: 50]
            nomeCliente: document.getElementById('nomeCliente').value, // [cite: 52]
            cpf: document.getElementById('cpf').value, // [cite: 53]
            assento: document.getElementById('assento').value, // [cite: 54]
            tipoPagamento: document.getElementById('tipoPagamento').value, // [cite: 55]
            dataVenda: new Date().toISOString()
        };

        // Lê o array de ingressos existente (chave: ingressos )
        let ingressos = getDados('ingressos'); 

        // Adiciona o novo ingresso ao array
        ingressos.push(ingresso);

        // Salva o array atualizado no localStorage
        salvarDados('ingressos', ingressos); [cite: 57]

        // TODO: Em um sistema real, aqui você decrementaria o número de assentos disponíveis da sessão.

        // Feedback ao usuário e limpeza do formulário
        alert(`Venda de Ingresso confirmada para o cliente ${ingresso.nomeCliente}, Assento ${ingresso.assento}!`);
        form.reset();
        selectSessao.selectedIndex = 0;
    });

    // --- 3. Lógica para pré-selecionar sessão (opcional, mas bom para navegabilidade [cite: 63]) ---
    // Verifica se há um ID de sessão na URL (vindo da página sessoes.html)
    const urlParams = new URLSearchParams(window.location.search);
    const sessaoId = urlParams.get('sessaoId');
    
    if (sessaoId) {
        // Encontra a opção correspondente e a seleciona
        const optionToSelect = selectSessao.querySelector(`option[value="${sessaoId}"]`);
        if (optionToSelect) {
            selectSessao.value = sessaoId;
        }
    }
});