var express = require('express');
var router = express.Router();
const Result = require("../result/result")
const volunteerArticleService = require("../service/volunteerArticle")

router.get('/',async (req,res)=>{
    let p = await volunteerArticleService.getAll(req.session.admin_id)
    res.json(p)
})

router.get('/one',async (req,res)=>{
    let p = await volunteerArticleService.getOneById(req.query)
    res.json(p)
})

router.post('/update',async (req,res)=>{
    let p = await volunteerArticleService.updateArticle(req.body)
    res.json(p)
})

module.exports = router