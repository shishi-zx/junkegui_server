// 管理员实体类
const sequelize = require('sequelize')
const { dbInstance } = require('../db/index')

const Admin = dbInstance.define('admin', {
    id: {
        name: 'id',
        primaryKey: true,
        autoIncrement: true,
        type: sequelize.DataTypes.INTEGER
    },
    name: {
        name: 'name',
        allowNull: true,
        defaultValue: '管理员',
        type: sequelize.DataTypes.STRING
    },
    user: {
        name: 'user',
        type: sequelize.DataTypes.STRING
    },
    pwd: {
        name: 'pwd',
        type: sequelize.DataTypes.STRING
    },
    phone: {
        name: 'phone',
        allowNull: true,
        type: sequelize.DataTypes.STRING
    },
    email: {
        name: 'email',
        allowNull: true,
        type: sequelize.DataTypes.STRING
    }
}, {
    timestamps: false,
    freezeTableName: true
})




module.exports =  Admin 
