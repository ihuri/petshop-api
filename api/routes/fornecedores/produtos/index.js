const router = require('express').Router({ mergeParams: true })
const Tabela = require('./TabelaProduto')
const Produto = require('./Produto')
const Serializador = require('../../../Serializador').SerializadorProduto

//listar todos os produtos
router.get('/', async(req, res) => {
    const produtos = await Tabela.listar(req.fornecedor.id)
    const serializador = new Serializador(res.getHeader('Content-Type'))
    res.send(
        serializador.serializar(produtos)
    )
})

//adicionar um produto
router.post('/', async(req, res, next) => {
    try {
        const idFornecedor = req.fornecedor.id
        const corpo = req.body
            //juntando os dados
        const dados = Object.assign({}, corpo, { fornecedor: idFornecedor })
        const produto = new Produto(dados)
        await produto.criar()
        const serializador = new Serializador(res.getHeader('Content-Type'))
        res.set('ETag', produto.versao)
        const timestamp = (new Date(produto.dataAtualizacao).getTime)
        res.set('Last-Modified', timestamp)
        res.set('Location', `/api/fornecedores/${produto.fornecedor}/produtos/${produto.id}`)
        res.status(201)
        res.send(serializador.serializar(produto))
    } catch (error) {
        next(error)
    }
})

//remover um produto
router.delete('/:id', async(req, res) => {
    const dados = {
        id: req.params.id,
        fornecedor: req.fornecedor.id,
    }

    const produto = new Produto(dados)
    await produto.apagar()
    res.status(204)
    res.end()
})

//listar um produto especifico
router.get('/:id', async(req, res, next) => {
    try {
        const dados = {
            id: req.params.id,
            fornecedor: req.fornecedor.id
        }

        const produto = new Produto(dados)
        await produto.carregar()
        const serializador = new Serializador(res.getHeader('Content-Type'), ['preco', 'estoque', 'fornecedor', 'dataCriacao', 'dataAtualizacao', 'versao'])
        res.set('ETag', produto.versao)
        const timestamp = (new Date(produto.dataAtualizacao).getTime)
        res.set('Last-Modified', timestamp)
        res.send(serializador.serializar(produto))
    } catch (error) {
        next(error)
    }
})

//listar o cabecalho de um produto especifico
router.head('/:id', async(req, res, next) => {
    try {
        const dados = {
            id: req.params.id,
            fornecedor: req.fornecedor.id
        }

        const produto = new Produto(dados)
        await produto.carregar()
        res.set('ETag', produto.versao)
        const timestamp = (new Date(produto.dataAtualizacao).getTime)
        res.set('Last-Modified', timestamp)
        res.status(200)
        res.end()
    } catch (error) {
        next(error)
    }
})



//atualizar um produto
router.put('/:id', async(req, res, next) => {
    try {
        const dados = Object.assign({},
            req.body, {
                id: req.params.id,
                fornecedor: req.fornecedor.id
            }
        )
        const produto = new Produto(dados)
        await produto.atualizar()
        await produto.carregar()
        res.set('ETag', produto.versao)
        const timestamp = (new Date(produto.dataAtualizacao).getTime)
        res.set('Last-Modified', timestamp)
        res.status(204)
        res.end()
    } catch (error) {
        next(error)
    }
})

//diminuir estoque produto
router.post('/:id/diminuir-estoque', async(req, res, next) => {
    try {
        const produto = new Produto({
            id: req.params.id,
            fornecedor: req.fornecedor.id
        })
        await produto.carregar()
        produto.estoque = produto.estoque - req.body.quantidade
        await produto.diminuirEstoque()
        await produto.carregar()
        res.set('ETag', produto.versao)
        const timestamp = (new Date(produto.dataAtualizacao).getTime)
        res.set('Last-Modified', timestamp)
        res.status(204)
        res.end()
    } catch (error) {
        next(error)
    }

})


module.exports = router