/**
 * 做路由拦截
 */

let express = require('express');
let router = express.Router();
let Result = require('../result/result')
const CODE = require("../result/code")

router.use("/",(req,res,next)=>{
    // 当用户正在登录时候，不拦截登录接口
    if(req.url==='/users/login'&&req.method==='POST'){
        return next()
    }
    if(!req.session.login){
        res.json(Result.package('管理员未登录或者已下线，请重新登录',CODE.ADMIN_NOT_LOGIN))
    }else{
        next()
    }
})

module.exports = router