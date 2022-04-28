// 墓地框架
const {DataTypes} = require('sequelize')
const { dbInstance } = require('../db/index')

const Martyr_cemetery = dbInstance.define('martyr_cemetery',{
    id: {
        name: 'id',
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    name: {
        name: 'name',
        type: DataTypes.STRING
    },
    place: {
        name: 'place',
        type: DataTypes.STRING
    }
},{
    timestamps: false,
    freezeTableName: true
})

module.exports = Martyr_cemetery