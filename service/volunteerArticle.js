

const { Volunteer_article,Volunteer } = require("../model/index")
const Result = require("../result/result")
const CODE = require("../result/code")
const util = require("../utils/index")

module.exports.getAll = async function (payload) {
    // 检查管理员权限是否足够
    let roles = await util.getRoles(payload)
    if (roles.indexOf(1) == -1) {
        return Result.package('权限不够', CODE.ADMIN_NOT_ROLE)
    }
    //权限够则查找
    let res = await Volunteer_article.findAll({
        include: Volunteer
    })
    return Result.success('ok', res)
}

module.exports.getOneById = async function(payload){
    let res = await Volunteer_article.findOne({
        where:{
            id: payload.id
        },
        include: Volunteer
    })
    return Result.success('ok',res)
}

module.exports.updateArticle = async function(payload){
    let res = await Volunteer_article.update(payload,{
        where: {
            id: payload.id
        }
    })
    return Result.success('ok',res)
}