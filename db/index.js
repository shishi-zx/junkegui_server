/**
 * 连接数据库
 */
const { Sequelize } = require('sequelize');
const {config} = require("./config")

const {database,username,password,host,port} = config
const dbInstance = new Sequelize(database, username, password, {
    host,
    port,
    dialect: 'mysql'
});

module.exports = {dbInstance}