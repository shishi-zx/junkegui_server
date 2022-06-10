
const { Family_seeker,Position } = require("../model/index")
const Result = require("../result/result")
const CODE = require("../result/code")
const util = require("../utils/index")

module.exports.getAll = async function (payload) {
    // 检查管理员权限是否足够
    let roles = await util.getRoles(payload)
    if (roles.indexOf(5) == -1) {
        return Result.package('权限不够', CODE.ADMIN_NOT_ROLE)
    }
    //权限够则查找
    let res = await Family_seeker.findAll()
    return Result.success('ok', res)
}

/**
 * 添加一名寻亲者
 * @param {*} admin_id 
 * @param {*} payload 
 */
 module.exports.addOne = async function(admin_id,payload){
    // 检查管理员权限是否足够
    let roles = await util.getRoles(admin_id)
    if (roles.indexOf(5) == -1) {
        return Result.package('权限不够', CODE.ADMIN_NOT_ROLE)
    }
    //ok
    payload.id = null // 防止更新了其他人的信息
    // 让新添加的密码为用户名
    payload.pwd = payload.user
    let res = await Family_seeker.create(payload)
    if(!res){
        return Result.error('添加失败，请检查参数')
    }
    return Result.success('ok',res)
}


/**
 * 删除一名
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
    let res = await Family_seeker.destroy({
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
 * 修改一名
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
    let res = await Family_seeker.update(payload,{
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
    let res = await Family_seeker.findOne({
        where:{
            id: payload.id
        },
        include: Position
    })
    return Result.success('ok', res)
}