const router = require('express').Router({ mergeParams: true })
const Tabela = require('./TabelaProduto')

router.get('/', async(req, res) => {
    const produtos = await Tabela.listar(req.params.idFornecedor)
    res.send(
        JSON.stringify(produtos)
    )
})

module.exports = router