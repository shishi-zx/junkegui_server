// 志愿者实体
const {DataTypes} = require('sequelize')
const { dbInstance } = require('../db/index')

const Volunteer = dbInstance.define('volunteer',{
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
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        name: 'name',
        type: DataTypes.STRING
    },
    phone: {
        name: 'name',
        type: DataTypes.STRING
    },
    // 留给模型同步时候自己创建
    // pid: {
    //     name: 'pid',
    //     type: DataTypes.INTEGER
    // },
    place: {
        name: 'place',
        type: DataTypes.STRING
    },
    state: {
        name: 'state',
        type: DataTypes.INTEGER,
        defaultValue: 1 // 0 表示该用户被封禁， 1 表示该用户可用
    }
},{
    timestamps: false,
    freezeTableName: true
})

module.exports = Volunteer