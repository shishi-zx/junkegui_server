var express = require('express');
var router = express.Router();
const Result = require("../result/result")
const seekerArticleService = require("../service/seekerArticleService")

router.get('/',async (req,res)=>{
    let p = await seekerArticleService.getAll(req.session.admin_id)
    res.json(p)
})


module.exports = router