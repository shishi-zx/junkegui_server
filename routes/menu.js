var express = require('express');
const menuService = require("../service/menuService")


var router = express.Router();

/**
 * 请求所有菜单项
 */
router.get('/all',async (req,res)=>{
    let p =await menuService.findAll(req.session.admin_id)
    res.json(p)
})

module.exports = router