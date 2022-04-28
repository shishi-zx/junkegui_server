// 归属地实体
const {DataTypes} = require('sequelize')
const { dbInstance } = require('../db/index')

const Position = dbInstance.define('position',{
    id: {
        name: 'id',
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    new_name: {
        name: 'new_name',
        type: DataTypes.STRING
    },
    old_name: {
        name: 'old_name',
        type: DataTypes.STRING
    }
},{
    timestamps: false,
    freezeTableName: true
})

module.exports = Position