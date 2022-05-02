var express = require('express');
var router = express.Router();
const Result = require("../result/result")
const seekerArticleService = require("../service/seekerArticleService")

router.get('/',async (req,res)=>{
    let p = await seekerArticleService.getAll(req.session.admin_id)
    res.json(p)
})

router.get('/one',async (req,res)=>{
    let p = await seekerArticleService.getOneById(req.query)
    res.json(p)
})

router.post('/update',async (req,res)=>{
    let p = await seekerArticleService.updateArticle(req.body)
    res.json(p)
})



module.exports = router