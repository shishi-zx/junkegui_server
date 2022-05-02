var express = require('express');
var router = express.Router();
const Result = require("../result/result")
const MartyrService = require("../service/martyrService")

router.get('/',async (req,res)=>{
    let p = await MartyrService.getAll(req.session.admin_id)
    res.json(p)
})


module.exports = router