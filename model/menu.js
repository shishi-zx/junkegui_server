// 菜单实体类
const sequelize = require('sequelize')
const { dbInstance } = require('../db/index')

const Menu = dbInstance.define('menu', {
    id: {
        name: 'id',
        primaryKey: true,
        autoIncrement: true,
        type: sequelize.DataTypes.INTEGER
    },
    path: {
        name: 'path',
        allowNull: false,
        type: sequelize.DataTypes.STRING
    },
    name: {
        name: 'path',
        type: sequelize.DataTypes.STRING
    },
    icon: {
        name: 'icon',
        type: sequelize.DataTypes.STRING
    },
    auth: {
        name: 'auth',
        type: sequelize.DataTypes.INTEGER
    },
    static: {
        name: 'static',
        type: sequelize.DataTypes.INTEGER
    },
    color: {
        name: 'color',
        type: sequelize.DataTypes.STRING
    },
    type: {
        name: 'type',
        type: sequelize.DataTypes.INTEGER
    }
},{
    timestamps: false ,
    freezeTableName: true
})




module.exports = Menu

// Menu.findAll().then(data=>{
//     console.log(data);
// }).catch(e=>{
//     console.log(e);
// })