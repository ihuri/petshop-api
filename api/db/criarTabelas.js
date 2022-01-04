const modelos = [
    require('../routes/fornecedores/ModeloTabelaFornecedor'),
    require('../routes/fornecedores/produtos/ModeloTabelaProduto')
]

async function criarTabelas() {
    for (const modelo of modelos) {
        await modelo.sync()
    }
}

criarTabelas()