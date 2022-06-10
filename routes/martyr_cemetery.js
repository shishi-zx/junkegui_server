var express = require('express');
var router = express.Router();
const Result = require("../result/result")
const MartyrCemeteryService = require("../service/martyrCemeteryService")

router.get('/',async (req,res)=>{
    let p = await MartyrCemeteryService.getAll(req.session.admin_id)
    res.json(p)
})

router.put('/addOne',async(req,res)=>{
    let p = await MartyrCemeteryService.addOne(req.session.admin_id,req.body)
    res.json(p)
})

router.post('/delOne',async(req,res)=>{
    let p = await MartyrCemeteryService.delOne(req.session.admin_id,req.body)
    res.json(p)
})

router.get('/one',async (req,res)=>{
    let p = await MartyrCemeteryService.getOne(req.session.admin_id,req.query)
    res.json(p)
})

router.put('/updOne',async(req,res)=>{
    let p = await MartyrCemeteryService.updateOne(req.session.admin_id,req.body)
    res.json(p)
})



module.exports = router