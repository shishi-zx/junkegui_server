// 消息框架
const {DataTypes} = require('sequelize')
const { dbInstance } = require('../db/index')

const Message_push = dbInstance.define('message_push',{
    id: {
        name: 'id',
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    title: {
        name: 'title',
        type: DataTypes.STRING
    },
    content: {
        name: 'content',
        type: DataTypes.TEXT
    },
    create_time: {
        name: 'create_time',
        type: DataTypes.DATE
    },
    state: {
        name: 'state',
        type: DataTypes.INTEGER
    }
},{
    timestamps: false,
    freezeTableName: true
})

module.exports = Message_push