const Sequelize = require('sequelize')
const config = require('config')

const instancia = new Sequelize(
    config.get('mysql.db'),
    config.get('mysql.usuario'),
    config.get('mysql.senha'), {
        host: config.get('mysql.host'),
        dialect: 'mysql'
    }
)

module.exports = instancia