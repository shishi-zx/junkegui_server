// 烈士实体框架
const {DataTypes} = require('sequelize')
const { dbInstance } = require('../db/index')

const Martyr = dbInstance.define('martyr',{
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
    gender: {
        name: 'gender',
        type: DataTypes.INTEGER // 0 女 1 男
    },
    birth: {
        name: 'birth',
        type: DataTypes.DATE
    },
    sacrifice_time: {
        name: 'sacrifice_time',
        type: DataTypes.DATE
    },
    sacrifice_place: {
        name: 'sacrifice_place',
        type: DataTypes.STRING
    }
},{
    timestamps: false,
    freezeTableName: true
})

module.exports = Martyr