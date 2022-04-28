var express = require('express');
var router = express.Router();
const Result = require("../result/result")
const adminService = require("../service/adminService")
const {CODE} = require("../result/code")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 登录
router.post('/login',async (req,res,next)=>{
  const {user,password} = req.body
  let p = await adminService.login({user,password})
  // 如果登录成功，就记住该session
  if(p.code===200){
    req.session.login = true
    req.session.admin_id = p.data.id
  }
  res.json(p)
})

// 登出
router.get('/login',(req,res)=>{
  req.session.login = false
  req.session.admin_id = null
  res.json(Result.success('登出成功'))
})

// 修改密码
router.put('/pwd', async (req,res)=>{
  let {user,pwd,npwd} = req.body
  console.log(user,pwd,npwd);
  let p = await adminService.updatePwd({user,pwd,npwd})
  res.json(p)
})

//修改信息
router.put('/inf',async (req,res)=>{
  let payload = req.body
  //在这里做检查，只能修改自己的个人信息
  if(payload.id!=req.session.admin_id){
    return res.json(Result.error('无权修改别人的个人信息，请检查参数'))
  }
  let p = await adminService.updateInformation(payload)
  res.json(p)
})

//获取所有管理员信息
router.get('/allAdmin',async (req,res)=>{
  let p = await adminService.getAllAdmin(req.session.admin_id)
  res.json(p)
})

//系统管理员修改其他管理员的信息
router.put('/updateOne',async (req,res)=>{
  console.log(req.body);
  let p = await adminService.updateOne(req.session.admin_id,req.body)
  res.json(p) 
})

//系统管理员删除其他管理员的信息
router.put('/deleteOne',async(req,res)=>{
  let p = await adminService.deleteOne(req.session.admin_id,req.body.id)
  res.json(p)
})

//添加一名管理员
router.put('/addOne',async (req,res)=>{
  let p = await adminService.addOne(req.session.admin_id,req.body)
  res.json(p)
})

// //查询所有管理员及权限信息
// router.get('/getAdminWithRole',async (req,res)=>{
//   let p = await adminService.getAdminWithRole(req.session.admin_id)
//   res.json(p)
// })

//获取所有权限信息
router.get('/roles',async(req,res)=>{
  let p = await adminService.getAllRoles(req.session.admin_id)
  res.json(p)
})

module.exports = router;
