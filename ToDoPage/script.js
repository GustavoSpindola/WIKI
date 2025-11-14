const input = document.getElementById('tarefa')
const btn = document.getElementById('adicionar');
const lista = document.getElementById('lista-tarefas');

// Adicionar tarefa
btn.addEventListener('click', () => {
    const texto = input.value.trim();
    if (texto === '') return;

    criarTarefa(texto, false);
    salvar();
    input.value = '';
});

// Criar elemento <li>
function criarTarefa(texto, concluida) {
    const li = document.createElement('li');
    li.innerHTML = `${texto} <button>Excluir</button>`;

    if (concluida) li.classList.add('concluida');

    // Marcar como concluída
    li.addEventListener('click', () => {
        li.classList.toggle('concluida');
        salvar();
    });

    // Excluir tarefa
    li.querySelector('button').addEventListener('click', (e) => {
        e.stopPropagation();
        li.remove();
        salvar();
    });

    lista.appendChild(li);
}

// Salvar no localStorage
function salvar() {
    const tarefas = [];
    lista.querySelectorAll('li').forEach(li => {
        tarefas.push({
            texto: li.firstChild.textContent.trim(),
            concluida: li.classList.contains('concluida')
        });
    });

    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

// Carregar ao abrir a página
function carregar() {
    const dados = JSON.parse(localStorage.getItem('tarefas')) || [];

    dados.forEach(t => {
        criarTarefa(t.texto, t.concluida);
    });
}

carregar();