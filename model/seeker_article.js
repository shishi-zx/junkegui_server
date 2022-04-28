// 寻亲者文章框架
const {DataTypes} = require('sequelize')
const { dbInstance } = require('../db/index')

const Seeker_article = dbInstance.define('seeker_ article',{
    id: {
        name: 'id',
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    title: {
        name: 'name',
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
        type: DataTypes.INTEGER,
        defaultValue: 0// 0待审核，1 通过 -1 不通过
    }
},{
    timestamps: false,
    freezeTableName: true
})

module.exports = Seeker_article