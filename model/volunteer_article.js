// 志愿者文章框架
const {DataTypes} = require('sequelize')
const { dbInstance } = require('../db/index')

const Volunteer_article = dbInstance.define('volunteer_article',{
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
        defaultValue: 0// 0待审核，1 通过 2 不通过
    },
    comment: {
        name :'comment',
        type: DataTypes.TEXT,
        allowNull: true
    }
},{
    timestamps: false,
    freezeTableName: true
})

module.exports = Volunteer_article

