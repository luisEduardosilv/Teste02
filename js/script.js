class Equipamento {
  constructor(nome, preco, numeroSerie, dataFabricacao, fabricante) {
    this.nome = nome;
    this.preco = preco;
    this.numeroSerie = numeroSerie;
    this.dataFabricacao = dataFabricacao;
    this.fabricante = fabricante;
  }
}

class GerenciadorEquipamentos {
  constructor() {
    this.equipamentos = [];
  }

  adicionarEquipamento(equipamento) {
    this.equipamentos.push(equipamento);
  }

  editarEquipamento(id, novoEquipamento) {
    this.equipamentos[id] = novoEquipamento;
  }

  excluirEquipamento(id) {
    this.equipamentos.splice(id, 1);
  }

  obterEquipamento(id) {
    return this.equipamentos[id];
  }

  listarEquipamentos() {
    return this.equipamentos;
  }
}

const gerenciador = new GerenciadorEquipamentos();

function cadastrar() {
  const nome = document.querySelector("#inputNome").value;
  const preco = document.querySelector("#inputPreco").value;
  const numeroSerie = document.querySelector("#inputNumeroSerie").value;
  const dataFabricacao = document.querySelector("#inputDataFabricacao").value;
  const fabricante = document.querySelector("#inputFabricante").value;
  if (nome.length >= 6 && preco && numeroSerie && dataFabricacao && fabricante) {
    const equipamento = new Equipamento(nome, preco, numeroSerie, dataFabricacao, fabricante);
    gerenciador.adicionarEquipamento(equipamento);
    document.getElementById("formulario").reset();
    updateTable();
    preencherDropdownEquipamentos();
  } else {
    alert("Por favor, preencha todos os campos antes de cadastrar.");
  }
}

function updateTable() {
  const table = document.querySelector("#tabela");
  table.innerHTML = `
<tr>
  <th>Nome</th>
  <th>Numero de serie</th>
  <th>fabricante</th>
  <th>Ações</th>
</tr>
${gerenciador.listarEquipamentos().map((equipamento, index) => `
  <tr>
    <td>${equipamento.nome}</td>
    <td>${equipamento.numeroSerie}</td>
    <td>${equipamento.fabricante}</td>
    <td>
      <button onclick="editarEquipamento(${index})" class="btn btn-info">Editar</button>
      <button onclick="excluirEquipamento(${index})" class="btn btn-danger">Excluir</button>
    </td>
  </tr>`)
      .join("")}`;
}

function editarEquipamento(id) {
  const equipamento = gerenciador.obterEquipamento(id);
  if (equipamento) {
    gerenciador.excluirEquipamento(id);

    document.querySelector("#inputNome").value = equipamento.nome;
    document.querySelector("#inputPreco").value = equipamento.preco;
    document.querySelector("#inputNumeroSerie").value = equipamento.numeroSerie;
    document.querySelector("#inputDataFabricacao").value = equipamento.dataFabricacao;
    document.querySelector("#inputFabricante").value = equipamento.fabricante;
  }
}

function excluirEquipamento(id) {
  gerenciador.excluirEquipamento(id);
  updateTable();
}

class Chamado {
  constructor(titulo, descricao, equipamento, dataAbertura) {
    this.titulo = titulo;
    this.descricao = descricao;
    this.equipamento = equipamento;
    this.dataAbertura = dataAbertura;
  }
}

class GerenciadorChamados {
  constructor() {
    this.chamados = [];
  }

  adicionarChamado(chamado) {
    this.chamados.push(chamado);
  }

  editarChamado(id, novoChamado) {
    this.chamados[id] = novoChamado;
  }

  excluirChamado(id) {
    this.chamados.splice(id, 1);
  }

  obterChamado(id) {
    return this.chamados[id];
  }

  listarChamados() {
    return this.chamados;
  }
}

const gerenciadorChamados = new GerenciadorChamados();

function cadastrarChamado() {
  const titulo = document.querySelector("#inputTituloChamado").value;
  const descricao = document.querySelector("#inputDescricaoChamado").value;
  const equipamentoIndex = document.querySelector("#inputEquipamentoChamado").value;
  const dataAbertura = document.querySelector("#inputDataAberturaChamado").value;

  if (titulo && descricao && equipamentoIndex !== "" && dataAbertura) {
    const equipamentoSelecionado = gerenciador.obterEquipamento(parseInt(equipamentoIndex));
    const chamado = new Chamado(titulo, descricao, equipamentoSelecionado, dataAbertura);
    gerenciadorChamados.adicionarChamado(chamado);

    document.getElementById("formulario2").reset();
    updateTableChamados();
  } else {
    alert("Por favor, preencha todos os campos antes de cadastrar o chamado.");
  }
}

function updateTableChamados() {
  const tableChamados = document.querySelector("#tabela2");
  tableChamados.innerHTML = `
      <thead>
        <tr>
          <th scope="col">Título do Chamado</th>
          <th scope="col">Equipamento</th>
          <th scope="col">Data de Abertura</th>
          <th scope="col">Dias em Aberto</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody>
        ${gerenciadorChamados.listarChamados().map((chamado, index) => `
          <tr>
            <td>${chamado.titulo}</td>
            <td>${chamado.equipamento.nome} - ${chamado.equipamento.numeroSerie}</td>
            <td>${formatarData(chamado.dataAbertura)}</td>
            <td>${calcularDiasEmAberto(chamado.dataAbertura)}</td>
            <td>
              <button onclick="editarChamado(${index})" class="btn btn-info">Editar</button>
              <button onclick="excluirChamado(${index})" class="btn btn-danger">Excluir</button>
            </td>
          </tr>`).join("")}
      </tbody>
    `;
}


function editarChamado(id) {
  const chamado = gerenciadorChamados.obterChamado(id);
  if (chamado) {
    gerenciadorChamados.excluirChamado(id);

    document.querySelector("#inputTituloChamado").value = chamado.titulo;
    document.querySelector("#inputDescricaoChamado").value = chamado.descricao;
    document.querySelector("#inputEquipamentoChamado").value = chamado.equipamento;
    document.querySelector("#inputDataAberturaChamado").value = chamado.dataAbertura;
  }
}

function excluirChamado(id) {
  gerenciadorChamados.excluirChamado(id);
  updateTableChamados();
}

function preencherDropdownEquipamentos() {
  const dropdownEquipamento = document.querySelector("#inputEquipamentoChamado");

  dropdownEquipamento.innerHTML = "";

  const optionPadrao = document.createElement("option");
  optionPadrao.value = "";
  optionPadrao.text = "Selecione um equipamento existente";
  dropdownEquipamento.add(optionPadrao);

  gerenciador.listarEquipamentos().forEach((equipamento, index) => {
    const option = document.createElement("option");
    option.value = index.toString();
    option.text = `${equipamento.nome} - ${equipamento.numeroSerie}`;
    dropdownEquipamento.add(option);
  });
}

function limpar() {
  localStorage.clear();
  gerenciador.equipamentos = [];
  updateTable();
}

function calcularDiasEmAberto(dataAbertura) {
  const dataAtual = new Date();
  const dataAberturaChamado = new Date(dataAbertura);

  const diferencaEmMilissegundos = dataAtual - dataAberturaChamado;
  const diferencaEmDias = Math.floor(diferencaEmMilissegundos / (1000 * 60 * 60 * 24));

  return diferencaEmDias;
}

function formatarData(Data) {
  const data = new Date(Data);
  const dia = (data.getDate() + 1).toString().padStart(2, '0');
  const mes = (data.getMonth() + 1).toString().padStart(2, '0');
  const ano = data.getFullYear();

  return `${dia}/${mes}/${ano}`;
}