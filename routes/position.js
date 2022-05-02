var express = require('express');
var router = express.Router();
const Result = require("../result/result")
const PositionService = require("../service/positionService")

router.get('/',async (req,res)=>{
    let p = await PositionService.getAll(req.session.admin_id)
    res.json(p)
})


module.exports = router