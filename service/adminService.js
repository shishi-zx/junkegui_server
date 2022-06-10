const { Admin, Role, Menu, Admin_role } = require("../model/index")
const Result = require("../result/result")
const CODE = require("../result/code")
const util = require("../utils/index")

/**
 * 管理员登录
 * @param {Object} payload user:管理员账号，password：管理员密码
 * @returns {Result}
 */
module.exports.login = async function (payload) {
    const { user, password } = payload
    if (!user || !password) {
        return Result.package("密码和账号是必须的！", CODE.PAYLOAD_NOT_FOUND)
    }
    //检查账号是否存在
    let u = await Admin.findOne({
        where: {
            user
        }
    })
    if (!u) {
        return Result.package("账号不存在", CODE.ADMIN_NOT_FOUND)
    }
    // 检查密码是否正确
    let admin = u.dataValues
    if (admin.pwd !== password) {
        return Result.package('管理员密码错误，请重试', CODE.ADMIN_PWD_NOT)
    }
    // 成功匹配则将密码隐藏然后响应该实例
    admin.pwd = ''
    return Result.success('登录成功', admin)
}

/**
 * 修改管理员密码
 * @param {} payload 
 * @returns 
 */
module.exports.updatePwd = async function (payload) {
    const { user, pwd, npwd } = payload
    if (!user || !pwd || !npwd) {
        return Result.package("密码和账号是必须的！", CODE.PAYLOAD_NOT_FOUND)
    }
    let u = await Admin.findOne({
        where: {
            user,
            pwd
        }
    })
    if (!u) {
        return Result.package('管理员账号不存在或者原密码错误', CODE.ADMIN_NOT_FOUND)
    }
    let admin = u.dataValues
    let nadmin = Admin.update({
        pwd: npwd
    }, {
        where: {
            id: admin.id
        }
    })
    console.log(nadmin);
    return Result.success('修改成功')
}

/**
 * 修改管理员基本信息，不包括密码
 * @param {} payload 
 */
module.exports.updateInformation = async function (payload) {
    if (!payload.id) {
        return Result.package('请检查id参数', CODE.PAYLOAD_NOT_FOUND)
    }
    let u = await Admin.findOne({
        where: {
            id: payload.id
        }
    })
    if (!u) {
        return Result.package("账号不存在", CODE.ADMIN_NOT_FOUND)
    }
    // 防止依次方式外部修改了密码
    payload.pwd = u.pwd
    let res = await Admin.update(payload, {
        where: { id: payload.id }
    })
    console.log('res', res);
    return Result.package('修改成功', CODE.SUCCESS, res)
}

/**
 * 获取所有管理员信息
 * @param {*} payload 
 */
module.exports.getAllAdmin = async function (admin_id) {
    //1首先需要查看登录的管理员的所有角色
    let rids = await getRoles(admin_id)

    //2再看管理员管理权限是否在他的角色权限中 id==3
    //先查出所有的菜单项id
    let menus = await getMenus(rids)
    let menusid = []
    menus.forEach(v => {
        menusid.push(v.dataValues.id)
    })
    //验证是否可以
    if (menusid.indexOf(3) == -1) {
        return Result.package("不具备该权限", CODE.ADMIN_NOT_ROLE)
    }
    //可以则查询所有管理员信息并返回
    let admins = await Admin.findAll({
        include: Role
    })

    return Result.success("ok", admins)

}

/**
 * 获取一名管理员详情
 * @param {} admin_id 
 * @param {*} payload 
 */
 module.exports.getOne = async function (admin_id,payload){
    // 检查管理员权限是否足够
    let roles = await util.getRoles(admin_id)
    if (roles.indexOf(8) == -1) {
        return Result.package('权限不够', CODE.ADMIN_NOT_ROLE)
    }
    //权限够则查找
    let res = await Admin.findOne({
        where:{
            id: payload.id
        },
        include: Role
    })
    return Result.success('ok', res)
}

/**
 * 总管理员修改其他管理员的信息
 * @param {*} payload 
 */
module.exports.updateOne = async function (id,payload) {
    //首先确保他有该权限
    let rids = await getRoles(id)
    let menus = await getMenus(rids)
    let menusid = []
    menus.forEach(v => {
        menusid.push(v.dataValues.id)
    })
    if (menusid.indexOf(3) == -1) {
        return Result.package("不具备该权限", CODE.ADMIN_NOT_ROLE)
    }
    //权限足够，则允许修改
    let res = await Admin.update(payload, {
        where: {
            id: payload.id
        }
    })
    return Result.success("修改成功", res)
}

/**
 * 删除某个管理员
 * @param {*} payload 
 */
module.exports.deleteOne = async function (id,del_id) {
    //首先确保他有该权限
    let rids = await getRoles(id)
    let menus = await getMenus(rids)
    let menusid = []
    menus.forEach(v => {
        menusid.push(v.dataValues.id)
    })
    if (menusid.indexOf(3) == -1) {
        return Result.package("不具备该权限", CODE.ADMIN_NOT_ROLE)
    }
    //权限足够，则允许删除
    let res = await Admin.destroy({
        where:{
            id: del_id
        }
    })
    return Result.success("删除成功",res)
}

module.exports.addOne = async function(id,payload){
    //首先确保他有该权限
    let rids = await getRoles(id)
    let menus = await getMenus(rids)
    let menusid = []
    menus.forEach(v => {
        menusid.push(v.dataValues.id)
    })
    if (menusid.indexOf(3) == -1) {
        return Result.package("不具备该权限", CODE.ADMIN_NOT_ROLE)
    }
    //权限足够，则允许添加
    // 初始密码为123456
    payload.pwd = 123456
    let res = await Admin.create(payload);
    return Result.success("添加成功",res)
}

// module.exports.getAdminWithRole = async function(id){
//     //首先确保他有该权限
//     let rids = await getRoles(id)
//     let menus = await getMenus(rids)
//     let menusid = []
//     menus.forEach(v => {
//         menusid.push(v.dataValues.id)
//     })
//     //权限管理的菜单为7
//     if (menusid.indexOf(7) == -1) {
//         return Result.package("不具备该权限", CODE.ADMIN_NOT_ROLE)
//     }
//     //权限足够，则允许查询
//     let res = await Admin.findAll({
//         include: Role
//     })
//     return Result.success("ok",res)
    
// }

/**
 * 获取所有权限选项
 * @param {*} id 
 * @returns 
 */
module.exports.getAllRoles = async function(id){
    //首先确保他有该权限
    let rids = await getRoles(id)
    let menus = await getMenus(rids)
    let menusid = []
    menus.forEach(v => {
        menusid.push(v.dataValues.id)
    })
    if (menusid.indexOf(7) == -1) {
        return Result.package("不具备该权限", CODE.ADMIN_NOT_ROLE)
    }
    //ok
    let res = await Role.findAll()
    return Result.success('ok',res)
}

/**
 * 添加管理员的权限（角色）
 * @param {*} payload 
 */
module.exports.addAdminRoles = async function(id,payload){
    let rids = await utils.getRoles(id)
    if(rids.indexOf(7)==-1){
        return Result.package("不具备该权限", CODE.ADMIN_NOT_ROLE)
    }
    //ok
    let res = await Admin_role.create(payload)
    return Result.success('ok',res)
}

/**
 * 删除管理员的某个权限
 * @param {*} id 
 * @param {*} payload 
 * @returns 
 */
module.exports.delAdminRoles = async function(id,payload){
    let rids = await utils.getRoles(id)
    if(rids.indexOf(7)==-1){
        return Result.package("不具备该权限", CODE.ADMIN_NOT_ROLE)
    }
    //ok
    let res = await Admin_role.destroy({
        where:{
            id: payload.id
        }
    })
    return Result.success('ok',res)
}


/**
 * 根据管理员id获取管理员的权限
 * @param {} id 
 */
async function getRoles(id) {
    let role = await Admin.findOne({
        where: {
            id
        },
        include: Role
    })
    let rids = []
    if (role.roles) {
        role.roles.forEach(v => {
            rids.push(v.dataValues.id)
        })
    }
    return rids
}

/**
 * 获取所有的菜单项
 * @param {*} rids 
 */
async function getMenus(rids) {
    let m = await Role.findAll({
        where: {
            id: rids
        },
        include: Menu
    })
    let menus = []
    if (m.length) {
        m.forEach(v => {
            menus.push(...v.dataValues.menus)
        })
    }
    return menus
}