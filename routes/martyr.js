var express = require('express');
const session = require('express-session');
var router = express.Router();
const Result = require("../result/result")
const MartyrService = require("../service/martyrService")

router.get('/',async (req,res)=>{
    let p = await MartyrService.getAll(req.session.admin_id)
    res.json(p)
})

router.put('/addOne',async(req,res)=>{
    let p = await MartyrService.addOne(req.session.admin_id,req.body)
    res.json(p)
})

router.post('/delOne',async(req,res)=>{
    let p = await MartyrService.delOne(req.session.admin_id,req.body)
    res.json(p)
})

router.get('/one',async (req,res)=>{
    let p = await MartyrService.getOne(req.session.admin_id,req.query)
    res.json(p)
})

router.put('/updOne',async(req,res)=>{
    let p = await MartyrService.updateOne(req.session.admin_id,req.body)
    res.json(p)
})


module.exports = router