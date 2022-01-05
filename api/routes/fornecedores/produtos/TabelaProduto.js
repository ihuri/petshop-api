const Modelo = require('./ModeloTabelaProduto')
const instancia = require('../../../db')
const NaoEncontrado = require('../../../errors/NaoEncontrado')

module.exports = {
    listar(idFornecedor) {
        return Modelo.findAll({
            where: {
                fornecedor: idFornecedor
            },
            raw: true
        })
    },
    inserir(dados) {
        return Modelo.create(dados)
    },
    remover(idProduto, idFornecedor) {
        return Modelo.destroy({
            where: { id: idProduto, fornecedor: idFornecedor }
        })
    },
    async pegarPorId(idProduto, idFornecedor) {
        const encontrado = await Modelo.findOne({ where: { id: idProduto, fornecedor: idFornecedor } })

        if (!encontrado) {
            throw new NaoEncontrado('Produto')
        }

        return encontrado
    },
    atualizar(dadosDoProduto, dadosParaAtualizar) {
        return Modelo.update(
            dadosParaAtualizar, { where: dadosDoProduto }
        )
    },
    subtrair(idProduto, idFornecedor, campo, quantidade) {
        //impede que seja alterados dados do db ao mesmo tempo
        return instancia.transaction(async transacao => {
            const produto = await Modelo.findOne({
                where: { id: idProduto, fornecedor: idFornecedor }
            })
            produto[campo] = quantidade

            await produto.save()

            return produto
        })


    }
}