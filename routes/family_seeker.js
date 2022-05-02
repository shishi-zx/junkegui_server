var express = require('express');
var router = express.Router();
const Result = require("../result/result")
const SeekerService = require("../service/seekerService")

router.get('/',async (req,res)=>{
    let p = await SeekerService.getAll(req.session.admin_id)
    res.json(p)
})


module.exports = router