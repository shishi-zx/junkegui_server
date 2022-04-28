
// 实例框架
const {DataTypes} = require('sequelize')
const { dbInstance } = require('../db/index')

const Family_seeker = dbInstance.define('family_seeker',{
    id: {
        name: 'id',
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    user: {
        name: 'user',
        type: DataTypes.STRING
    },
    pwd: {
        name: 'pwd',
        type: DataTypes.STRING
    },
    name: {
        name: 'name',
        type: DataTypes.STRING
    },
    phone: {
        name: 'name',
        type: DataTypes.STRING
    },
},{
    timestamps: false,
    freezeTableName: true
})

module.exports = Family_seeker