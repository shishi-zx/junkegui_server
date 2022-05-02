var express = require('express');
var router = express.Router();
const Result = require("../result/result")
const VolunteerService = require("../service/volunteerService")

router.get('/',async (req,res)=>{
    let p = await VolunteerService.getAll(req.session.admin_id)
    res.json(p)
})


module.exports = router