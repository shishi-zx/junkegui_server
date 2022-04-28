const {CODE,Result} = require("../result/index")
const {Menu,Admin,Role,Menu_role} = require("../model/index")

/**
 * 获取所有菜单项
 * @param {*} pqyload 
 */
module.exports.findAll = async function (id){
    // 需要根据权限来获取菜单项
    //首先更具管理员查询权限
    let rids = await getRoles(id)
    //根据权限查询菜单项
    let m = await Role.findAll({
        where: {
            id: rids
        },
        include: Menu
    })
    let menus = []
    if(m.length){
        m.forEach(v=>{
            menus.push(...v.dataValues.menus)
        })
    }
    return Result.package('请求成功',CODE.SUCCESS,menus)
}

/**
 * 根据管理员id获取管理员的权限
 * @param {} id 
 */
async function getRoles(id){
    let role =await Admin.findOne({
        where: {
            id
        },
        include: Role
    })
    let rids = []
    if(role.roles){
        role.roles.forEach(v=>{
            rids.push(v.dataValues.id)
        })
    }
    return rids
}

