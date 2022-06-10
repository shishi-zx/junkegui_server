
const {Volunteer,Position} = require("../model/index")
const Result = require("../result/result")
const CODE = require("../result/code")
const util = require("../utils/index")


/**
 * 获取所有的志愿者
 * @param {*} payload 
 */
module.exports.getAll = async function(payload){
    // 检查管理员权限是否足够
    let roles = await util.getRoles(payload)
    if(roles.indexOf(4)==-1){
        return Result.package('权限不够',CODE.ADMIN_NOT_ROLE)
    }
    //权限够则查找
    let res = await Volunteer.findAll()
    return Result.success('ok',res)

}

/**
 * 添加一名志愿者
 * @param {*} admin_id 
 * @param {*} payload 
 */
 module.exports.addOne = async function(admin_id,payload){
    // 检查管理员权限是否足够
    let roles = await util.getRoles(admin_id)
    if (roles.indexOf(4) == -1) {
        return Result.package('权限不够', CODE.ADMIN_NOT_ROLE)
    }
    //ok
    payload.id = null // 防止更新了其他人的信息
    // 让新添加的密码为用户名
    payload.pwd = payload.user
    let res = await Volunteer.create(payload)
    if(!res){
        return Result.error('添加失败，请检查参数')
    }
    return Result.success('ok',res)
}


/**
 * 删除一名志愿者
 * @param {*} admin_id 
 * @param {*} payload 
 */
 module.exports.delOne = async function (admin_id, payload) {
    // 检查管理员权限是否足够
    let roles = await util.getRoles(admin_id)
    if (roles.indexOf(8) == -1) {
        return Result.package('权限不够', CODE.ADMIN_NOT_ROLE)
    }
    //ok
    let res = await Volunteer.destroy({
        where: {
            id: payload.id
        }
    })
    if (!res) {
        return Result.error('删除失败，请检查参数')
    }
    return Result.success('ok', res)
}

/**
 * 修改一名志愿者
 * @param {*} admin_id 
 * @param {*} payload 
 */
 module.exports.updateOne = async function (admin_id, payload) {
    // 检查管理员权限是否足够
    let roles = await util.getRoles(admin_id)
    if (roles.indexOf(8) == -1) {
        return Result.package('权限不够', CODE.ADMIN_NOT_ROLE)
    }
    //ok
    let res = await Volunteer.update(payload,{
        where:{
            id: payload.id
        }
    })
    if (!res) {
        return Result.error('修改失败，请检查参数')
    }
    return Result.success('ok', res)
}

/**
 * 获取一名志愿者详情
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
    let res = await Volunteer.findOne({
        where:{
            id: payload.id
        },
        include: Position
    })
    return Result.success('ok', res)
}