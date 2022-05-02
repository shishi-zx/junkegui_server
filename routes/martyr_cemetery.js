var express = require('express');
var router = express.Router();
const Result = require("../result/result")
const MartyrCemeteryService = require("../service/martyrCemeteryService")

router.get('/',async (req,res)=>{
    let p = await MartyrCemeteryService.getAll(req.session.admin_id)
    res.json(p)
})


module.exports = router