const sequelize = require('sequelize')
const { dbInstance } = require('../db/index')
const {Role} = require("./role")
const {Menu} = require("./menu")

const Menu_role = dbInstance.define('menu_role',{
    id: {
        name: 'id',
        primaryKey: true,
        autoIncrement: true,
        type: sequelize.DataTypes.INTEGER
    },
    mid: {
        name: 'mid',
        // allowNull: false,
        type: sequelize.DataTypes.INTEGER,
        references: {
            model: Menu,
            key: 'id'
        }
    },
    rid: {
        name: 'rid',
        // allowNull: false,
        type: sequelize.DataTypes.INTEGER,
        references: {
            model: Role, 
            key: 'id'
        }
    }
},{
    timestamps: false ,
    freezeTableName: true
})


module.exports = Menu_role