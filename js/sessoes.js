// cinema-web/js/sessoes.js

document.addEventListener('DOMContentLoaded', () => {
    
    // Contêiner onde a listagem será inserida
    const container = document.getElementById('containerSessoes');

    function listarSessoes() {
        // 1. Carrega todos os dados necessários do localStorage
        const sessoes = getDados('sessoes');
        const filmes = getDados('filmes');
        const salas = getDados('salas');

        if (sessoes.length === 0) {
            container.innerHTML = '<p>Nenhuma sessão está disponível no momento.</p>';
            return;
        }
        
        // 2. Cria a tabela e o cabeçalho
        const table = document.createElement('table');
        table.id = 'listaSessoes';
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Filme</th>
                    <th>Sala</th>
                    <th>Data e Hora</th>
                    <th>Preço</th>
                    <th>Ação</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        `;
        
        const tbody = table.querySelector('tbody');

        // 3. Itera sobre as sessões e combina os dados (Encadeamento de dados)
        sessoes.forEach(sessao => {
            // Busca o filme e a sala correspondentes usando os IDs
            const filme = filmes.find(f => f.id === sessao.idFilme);
            const sala = salas.find(s => s.id === sessao.idSala);

            if (filme && sala) {
                
                // Formatação da Data e Hora
                const dataHoraFormatada = new Date(sessao.dataHora).toLocaleString('pt-BR', { 
                    day: '2-digit', month: '2-digit', year: 'numeric', 
                    hour: '2-digit', minute: '2-digit' 
                });

                // Cria a linha da tabela
                const row = tbody.insertRow();
                
                // Coluna Filme (título) [cite: 59]
                row.insertCell().textContent = filme.titulo; 
                
                // Coluna Sala (nome) [cite: 60]
                row.insertCell().textContent = `${sala.nome} (${sala.tipo})`; 
                
                // Coluna Data e Hora [cite: 61]
                row.insertCell().textContent = dataHoraFormatada; 
                
                // Coluna Preço [cite: 62]
                row.insertCell().textContent = `R$ ${sessao.preco.toFixed(2)}`; 
                
                // Coluna Ação (Botão Comprar Ingresso) 
                const acaoCell = row.insertCell();
                
                // Cria o link que redireciona para venda-ingressos.html com a sessão já selecionada 
                const linkCompra = document.createElement('a');
                linkCompra.href = `venda-ingressos.html?sessaoId=${sessao.id}`;
                linkCompra.textContent = 'Comprar Ingresso';
                linkCompra.className = 'btn-comprar';
                
                acaoCell.appendChild(linkCompra);
            }
        });

        // 4. Insere a tabela no contêiner
        container.appendChild(table);
    }
    
    // Executa a listagem
    listarSessoes();
});