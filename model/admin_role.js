// 管理员分配角色实体类
const sequelize = require('sequelize')
const { dbInstance } = require('../db/index')
const  Admin  = require('./admin')
const  Role  = require('./role')

const Admin_role = dbInstance.define('admin_role', {
    id: {
        name: 'id',
        primaryKey: true,
        autoIncrement: true,
        type: sequelize.DataTypes.INTEGER
    },
    aid: {
        name: 'aid',
        // allowNull: false,
        type: sequelize.DataTypes.INTEGER,
        references: {
            model: Admin, // 'Movies' 也可以使用
            key: 'id'
        }
    },
    rid: {
        name: 'rid',
        // allowNull: false,
        type: sequelize.DataTypes.INTEGER,
        references: {
            model: Role, // 'Movies' 也可以使用
            key: 'id'
        }
    }
},{
    timestamps: false ,
    freezeTableName: true
})


module.exports = Admin_role





// 
// Admin.create({
//     name: 'gg',
//     user: 'user',
//     pwd: 'pwd'
// }).then(async(data)=>{
//     let rs = await Role.findAll({
//         where: {
//             id:1
//         }
//     })
//     await data.setRoles(rs)
// })


// // //dddd
// Admin.findOne({
//     where: {
//         id: 1
//     },
//     include: Role
// }).then(async (data) => {
//     let p = await data.getRoles();
//     let ps = []
//     p.forEach((v) => {
//         ps.push(v.dataValues.id)
//     })
//     console.log(ps);
// }).catch(e => {
//     console.log('出错了！！！！！');
//     console.log('-------------------------------------------------');
//     console.log(e);
// })