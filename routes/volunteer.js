var express = require('express');
var router = express.Router();
const Result = require("../result/result")
const VolunteerService = require("../service/volunteerService")

router.get('/',async (req,res)=>{
    let p = await VolunteerService.getAll(req.session.admin_id)
    res.json(p)
})


router.put('/addOne',async(req,res)=>{
    let p = await VolunteerService.addOne(req.session.admin_id,req.body)
    res.json(p)
})

router.post('/delOne',async(req,res)=>{
    let p = await VolunteerService.delOne(req.session.admin_id,req.body)
    res.json(p)
})

router.get('/one',async (req,res)=>{
    let p = await VolunteerService.getOne(req.session.admin_id,req.query)
    res.json(p)
})

router.put('/updOne',async(req,res)=>{
    let p = await VolunteerService.updateOne(req.session.admin_id,req.body)
    res.json(p)
})

module.exports = router