// 实例框架
const {DataTypes} = require('sequelize')
const { dbInstance } = require('../db/index')

const Example = dbInstance.define('example',{
    id: {
        name: 'id',
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
},{
    timestamps: false,
    freezeTableName: true
})

module.exports = Example