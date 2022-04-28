// 角色实体类
const sequelize = require('sequelize')
const { dbInstance } = require('../db/index')

const Role = dbInstance.define('role', {
    id: {
        name: 'id',
        primaryKey: true,
        autoIncrement: true,
        type: sequelize.DataTypes.INTEGER
    },
    name: {
        name: 'name',
        allowNull: true,
        type: sequelize.DataTypes.STRING
    },
    nameZh: {
        name: 'nameZh',
        allowNull: true,
        type: sequelize.DataTypes.STRING
    }
},{
    timestamps: false ,
    freezeTableName: true
})




module.exports = Role