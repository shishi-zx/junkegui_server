
const { Martyr,Martyr_cemetery } = require("../model/index")
const Result = require("../result/result")
const CODE = require("../result/code")
const util = require("../utils/index")

module.exports.getAll = async function (payload) {
    // 检查管理员权限是否足够
    let roles = await util.getRoles(payload)
    if (roles.indexOf(8) == -1) {
        return Result.package('权限不够', CODE.ADMIN_NOT_ROLE)
    }
    //权限够则查找
    let res = await Martyr.findAll({
        include: Martyr_cemetery
    })
    return Result.success('ok', res)
}

/**
 * 添加一名烈士
 * @param {*} admin_id 
 * @param {*} payload 
 */
module.exports.addOne = async function (admin_id, payload) {
    // 检查管理员权限是否足够
    let roles = await util.getRoles(admin_id)
    if (roles.indexOf(8) == -1) {
        return Result.package('权限不够', CODE.ADMIN_NOT_ROLE)
    }
    //ok
    payload.id = null // 防止更新了其他烈士的信息
    let res = await Martyr.create(payload)
    if (!res) {
        return Result.error('添加失败，请检查参数')
    }
    return Result.success('ok', res)
}

/**
 * 删除一名烈士
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
    let res = await Martyr.destroy({
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
 * 修改一名烈士的信息
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
    let res = await Martyr.update(payload,{
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
 * 获取一名烈士详情
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
    let res = await Martyr.findOne({
        where:{
            id: payload.id
        },
        include: Martyr_cemetery
    })
    return Result.success('ok', res)
}