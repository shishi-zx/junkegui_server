
const {Position} = require("../model/index")
const Result = require("../result/result")
const CODE = require("../result/code")
const util = require("../utils/index")


/**
 * 获取所有的志愿者
 * @param {*} payload 
 */
module.exports.getAll = async function(payload){
    // 检查管理员权限是否足够
    // let roles = await util.getRoles(payload)
    // if(roles.indexOf(6)==-1){
    //     return Result.package('权限不够',CODE.ADMIN_NOT_ROLE)
    // }
    //权限够则查找
    let res = await Position.findAll()
    return Result.success('ok',res)
}