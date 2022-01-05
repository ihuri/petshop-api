const router = require('express').Router()
const TabelaFornecedor = require('./TabelaFornecedor')
const Fornecedor = require('./Fornecedor')
const SerializadorFornecedor = require('../../Serializador').SerializadorFornecedor

//liberando acesso externo da API
router.options('/', (req, res) => {
    res.set('Access-Control-Allow-Origin', 'GET, POST')
    res.set('Access-Control-Allow-Headers', 'Content-Type')
    res.status(204)
    res.end()
})

router.get('/', async(req, res) => {
    const resultados = await TabelaFornecedor.listar()
    res.status(200)
    const serializador = new SerializadorFornecedor(
        res.getHeader('Content-Type'), ['empresa']
    )
    res.send(
        serializador.serializar(resultados)
    )
})

router.post('/', async(req, res, next) => {
    try {
        const dadosRecebidos = req.body
        const fornecedor = new Fornecedor(dadosRecebidos)
        await fornecedor.criar()
        res.status(201)
        const serializador = new SerializadorFornecedor(
            res.getHeader('Content-Type'), ['empresa']
        )
        res.send(
            serializador.serializar(fornecedor)
        )
    } catch (error) {
        next(error)
    }
})

//liberando acesso externo da API
router.options('/:idFornecedor', (req, res) => {
    res.set('Access-Control-Allow-Origin', 'GET, PUT, DELETE')
    res.set('Access-Control-Allow-Headers', 'Content-Type')
    res.status(204)
    res.end()
})

router.get('/:idFornecedor', async(req, res, next) => {
    try {
        const id = req.params.idFornecedor
        const fornecedor = new Fornecedor({ id: id })
        await fornecedor.carregar()
        res.status(200)
        const serializador = new SerializadorFornecedor(
            res.getHeader('Content-Type'), ['email', 'empresa', 'dataCriacao', 'dataAtualizacao', 'versao']
        )
        res.send(
            serializador.serializar(fornecedor)
        )
    } catch (error) {
        next(error)
    }
})

router.put('/:idFornecedor', async(req, res, next) => {
    try {
        const id = req.params.idFornecedor
        const dadosRecebidos = req.body
        const dados = Object.assign({}, dadosRecebidos, { id: id })
        const fornecedor = new Fornecedor(dados)
        await fornecedor.atualizar()
        res.status(204)
        res.end()
    } catch (error) {
        next(error)
    }
})

router.delete('/:idFornecedor', async(req, res, next) => {
    try {
        const id = req.params.idFornecedor
        const fornecedor = new Fornecedor({ id: id })
        await fornecedor.carregar()
        await fornecedor.remover()
        res.status(204)
        res.end()
    } catch (error) {
        next(error)
    }
})

const roteadorProdutos = require('./produtos')
const verificarFornecedor = async(req, res, next) => {
    try {
        const id = req.params.idFornecedor
        const fornecedor = new Fornecedor({ id: id })
        await fornecedor.carregar()
            //caso o fornecedor exista subistitui a req fornecedor com o encontrado na pesquisa
        req.fornecedor = fornecedor
        next()
    } catch (error) {
        next(error)
    }
}
router.use('/:idFornecedor/produtos', verificarFornecedor, roteadorProdutos)

module.exports = router