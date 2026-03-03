const API = 'http://localhost:8080/api';

// ===== NAVEGACAO POR ABAS =====
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(btn.dataset.tab).classList.add('active');
    });
});

// ===== MARCAS =====
async function carregarMarcas() {
    const res = await fetch(`${API}/marcas`);
    const marcas = await res.json();

    // Tabela
    const tbody = document.querySelector('#tabela-marcas tbody');
    tbody.innerHTML = '';
    marcas.forEach(m => {
        tbody.innerHTML += `
            <tr>
                <td>${m.id}</td>
                <td>${m.nome}</td>
                <td>
                    <button class="btn-editar" onclick="editarMarca(${m.id}, '${m.nome}')">Editar</button>
                    <button class="btn-excluir" onclick="excluirMarca(${m.id})">Excluir</button>
                </td>
            </tr>`;
    });

    // Selects
    const selects = [
        document.getElementById('veiculo-marca'),
        document.getElementById('modelo-marca'),
        document.getElementById('filtro-marca')
    ];
    selects.forEach(sel => {
        const val = sel.value;
        const firstOption = sel.options[0].outerHTML;
        sel.innerHTML = firstOption;
        marcas.forEach(m => {
            sel.innerHTML += `<option value="${m.id}">${m.nome}</option>`;
        });
        sel.value = val;
    });
}

document.getElementById('form-marca').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('marca-id').value;
    const marca = { nome: document.getElementById('marca-nome').value };

    if (id) {
        await fetch(`${API}/marcas/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(marca)
        });
    } else {
        await fetch(`${API}/marcas`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(marca)
        });
    }

    cancelarEdicaoMarca();
    carregarMarcas();
});

function editarMarca(id, nome) {
    document.getElementById('marca-id').value = id;
    document.getElementById('marca-nome').value = nome;
    document.getElementById('btn-cancelar-marca').style.display = 'inline-block';
}

function cancelarEdicaoMarca() {
    document.getElementById('marca-id').value = '';
    document.getElementById('marca-nome').value = '';
    document.getElementById('btn-cancelar-marca').style.display = 'none';
}

document.getElementById('btn-cancelar-marca').addEventListener('click', cancelarEdicaoMarca);

async function excluirMarca(id) {
    if (confirm('Deseja excluir esta marca?')) {
        await fetch(`${API}/marcas/${id}`, { method: 'DELETE' });
        carregarMarcas();
    }
}

// ===== MODELOS =====
async function carregarModelos() {
    const res = await fetch(`${API}/modelos`);
    const modelos = await res.json();

    const tbody = document.querySelector('#tabela-modelos tbody');
    tbody.innerHTML = '';
    modelos.forEach(m => {
        tbody.innerHTML += `
            <tr>
                <td>${m.id}</td>
                <td>${m.nome}</td>
                <td>${m.marca.nome}</td>
                <td>
                    <button class="btn-editar" onclick="editarModelo(${m.id}, '${m.nome}', ${m.marca.id})">Editar</button>
                    <button class="btn-excluir" onclick="excluirModelo(${m.id})">Excluir</button>
                </td>
            </tr>`;
    });

    // Selects de modelo
    const selects = [
        document.getElementById('veiculo-modelo'),
        document.getElementById('filtro-modelo')
    ];
    selects.forEach(sel => {
        const val = sel.value;
        const firstOption = sel.options[0].outerHTML;
        sel.innerHTML = firstOption;
        modelos.forEach(m => {
            sel.innerHTML += `<option value="${m.id}">${m.marca.nome} - ${m.nome}</option>`;
        });
        sel.value = val;
    });
}

document.getElementById('form-modelo').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('modelo-id').value;
    const modelo = {
        nome: document.getElementById('modelo-nome').value,
        marca: { id: parseInt(document.getElementById('modelo-marca').value) }
    };

    if (id) {
        await fetch(`${API}/modelos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(modelo)
        });
    } else {
        await fetch(`${API}/modelos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(modelo)
        });
    }

    cancelarEdicaoModelo();
    carregarModelos();
});

function editarModelo(id, nome, marcaId) {
    document.getElementById('modelo-id').value = id;
    document.getElementById('modelo-nome').value = nome;
    document.getElementById('modelo-marca').value = marcaId;
    document.getElementById('btn-cancelar-modelo').style.display = 'inline-block';
}

function cancelarEdicaoModelo() {
    document.getElementById('modelo-id').value = '';
    document.getElementById('modelo-nome').value = '';
    document.getElementById('modelo-marca').value = '';
    document.getElementById('btn-cancelar-modelo').style.display = 'none';
}

document.getElementById('btn-cancelar-modelo').addEventListener('click', cancelarEdicaoModelo);

async function excluirModelo(id) {
    if (confirm('Deseja excluir este modelo?')) {
        await fetch(`${API}/modelos/${id}`, { method: 'DELETE' });
        carregarModelos();
    }
}

// ===== VEICULOS =====
async function carregarVeiculos(params = '') {
    const url = params ? `${API}/veiculos/filtrar?${params}` : `${API}/veiculos`;
    const res = await fetch(url);
    const veiculos = await res.json();

    const tbody = document.querySelector('#tabela-veiculos tbody');
    tbody.innerHTML = '';

    if (veiculos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" style="text-align:center;color:#999">Nenhum veiculo encontrado</td></tr>';
        return;
    }

    veiculos.forEach(v => {
        const statusClass = `status-${v.status.toLowerCase()}`;
        const statusLabel = v.status === 'DISPONIVEL' ? 'Disponivel' :
                           v.status === 'VENDIDO' ? 'Vendido' : 'Reservado';
        tbody.innerHTML += `
            <tr>
                <td>${v.id}</td>
                <td>${v.modelo.marca.nome}</td>
                <td>${v.modelo.nome}</td>
                <td>${v.ano}</td>
                <td>${v.cor}</td>
                <td>R$ ${Number(v.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                <td>${Number(v.quilometragem).toLocaleString('pt-BR')} km</td>
                <td><span class="${statusClass}">${statusLabel}</span></td>
                <td>
                    <button class="btn-editar" onclick="editarVeiculo(${v.id})">Editar</button>
                    <button class="btn-excluir" onclick="excluirVeiculo(${v.id})">Excluir</button>
                </td>
            </tr>`;
    });
}

document.getElementById('form-veiculo').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('veiculo-id').value;
    const veiculo = {
        modelo: { id: parseInt(document.getElementById('veiculo-modelo').value) },
        ano: parseInt(document.getElementById('veiculo-ano').value),
        cor: document.getElementById('veiculo-cor').value,
        preco: parseFloat(document.getElementById('veiculo-preco').value),
        quilometragem: parseInt(document.getElementById('veiculo-km').value),
        status: document.getElementById('veiculo-status').value
    };

    if (id) {
        await fetch(`${API}/veiculos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(veiculo)
        });
    } else {
        await fetch(`${API}/veiculos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(veiculo)
        });
    }

    cancelarEdicaoVeiculo();
    carregarVeiculos();
});

async function editarVeiculo(id) {
    const res = await fetch(`${API}/veiculos/${id}`);
    const v = await res.json();

    document.getElementById('veiculo-id').value = v.id;
    document.getElementById('veiculo-marca').value = v.modelo.marca.id;
    document.getElementById('veiculo-modelo').value = v.modelo.id;
    document.getElementById('veiculo-ano').value = v.ano;
    document.getElementById('veiculo-cor').value = v.cor;
    document.getElementById('veiculo-preco').value = v.preco;
    document.getElementById('veiculo-km').value = v.quilometragem;
    document.getElementById('veiculo-status').value = v.status;
    document.getElementById('btn-cancelar-veiculo').style.display = 'inline-block';
    document.getElementById('btn-salvar-veiculo').textContent = 'Atualizar';

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function cancelarEdicaoVeiculo() {
    document.getElementById('form-veiculo').reset();
    document.getElementById('veiculo-id').value = '';
    document.getElementById('btn-cancelar-veiculo').style.display = 'none';
    document.getElementById('btn-salvar-veiculo').textContent = 'Salvar';
}

document.getElementById('btn-cancelar-veiculo').addEventListener('click', cancelarEdicaoVeiculo);

async function excluirVeiculo(id) {
    if (confirm('Deseja excluir este veiculo?')) {
        await fetch(`${API}/veiculos/${id}`, { method: 'DELETE' });
        carregarVeiculos();
    }
}

// ===== FILTROS =====
document.getElementById('btn-filtrar').addEventListener('click', () => {
    const params = new URLSearchParams();
    const marcaId = document.getElementById('filtro-marca').value;
    const modeloId = document.getElementById('filtro-modelo').value;
    const ano = document.getElementById('filtro-ano').value;
    const status = document.getElementById('filtro-status').value;
    const precoMin = document.getElementById('filtro-preco-min').value;
    const precoMax = document.getElementById('filtro-preco-max').value;

    if (marcaId) params.append('marcaId', marcaId);
    if (modeloId) params.append('modeloId', modeloId);
    if (ano) params.append('ano', ano);
    if (status) params.append('status', status);
    if (precoMin) params.append('precoMin', precoMin);
    if (precoMax) params.append('precoMax', precoMax);

    carregarVeiculos(params.toString());
});

document.getElementById('btn-limpar-filtro').addEventListener('click', () => {
    document.getElementById('filtro-marca').value = '';
    document.getElementById('filtro-modelo').value = '';
    document.getElementById('filtro-ano').value = '';
    document.getElementById('filtro-status').value = '';
    document.getElementById('filtro-preco-min').value = '';
    document.getElementById('filtro-preco-max').value = '';
    carregarVeiculos();
});

// ===== CARREGAR DADOS INICIAIS =====
document.addEventListener('DOMContentLoaded', () => {
    carregarMarcas();
    carregarModelos();
    carregarVeiculos();
});
