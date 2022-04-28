const CODE = require("./code")

module.exports = class Result{
    // 两个通用的包装结果，不包含data字段
    static success(msg=CODE.SUCCESS.msg,data={}){
        return {
            code: CODE.SUCCESS.code,
            data,
            msg
        }
    }
    static error(msg=CODE.ERROR.msg,data={}){
        return {
            code: CODE.ERROR.code,
            data,
            msg
        }
    }
    // 包装一般结果，包含data字段
    static package(msg,type=CODE.SUCCESS,data={}){
        return {
            code: type.code,
            data,
            msg: msg?msg:type.msg
        }
    }
}