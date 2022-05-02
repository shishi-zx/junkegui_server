/**
 * 查询管理员对应的权限，返回所有的roles对应的菜单项
 */

const {Admin,Role,Menu} = require('../model/index')


async function getRoles(id){
    let admin = await Admin.findOne({
        where:{
            id
        },
        include: Role
    })
    let roles = []
    if(admin.roles){
        admin.roles.forEach(element => {
            roles.push(element.dataValues.id)
        });
    }
    // 再根据role查询菜单
    let p = await Role.findAll({
        where:{
            id: roles
        },
        include: Menu
    })
    let menus = []
    if(p){
        p.forEach(e=>{
            menus.push(...e.menus)
        })
    }
    let ids = []
    menus.forEach(e=>{
        ids.push(e.dataValues.id)
    })
    return ids
}
module.exports = getRoles

// getRoles(1)
