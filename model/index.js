/*
    在这里做统一暴露
 */
const {dbInstance} = require("../db/index")
const Admin = require("./admin")
const Admin_role = require("./admin_role")
const Role = require("./role")
const Menu = require("./menu")
const Menu_role = require("./menu_role")
const Volunteer = require("./volunteer")
const Position = require("./position")
const Family_seeker = require("./family_seeker")
const Message_push = require("./message_push")
const Volunteer_article = require("./volunteer_article")
const Seeker_article = require("./seeker_article")
const Martyr = require("./martyr")
const Martyr_cemetery = require("./martyr_cemetery")

module.exports = {
    Admin,
    Admin_role,
    Role,
    Menu,
    Menu_role,
    Volunteer,
    Position,
    Family_seeker,
    Message_push,
    Volunteer_article,
    Seeker_article,
    Martyr,
    Martyr_cemetery
}
// 关联关系在这里建立联系

// 创建admin与role的多对多关联
Admin.belongsToMany(Role, { through: Admin_role, foreignKey: 'aid' })
Role.belongsToMany(Admin, { through: Admin_role, foreignKey: 'rid' })
//menu与role
Role.belongsToMany(Menu, { through: Menu_role, foreignKey: 'rid' })
Menu.belongsToMany(Role, { through: Menu_role, foreignKey: 'mid' })
//志愿者与归属地
Position.hasMany(Volunteer)
Volunteer.belongsTo(Position)
//寻亲者与归属地
Position.hasMany(Family_seeker)
Family_seeker.belongsTo(Position)
//烈士与归属地
Position.hasMany(Martyr)
Martyr.belongsTo(Position)
//烈士与陵园
Martyr_cemetery.hasMany(Martyr)
Martyr.belongsTo(Martyr_cemetery)
// 志愿者与志愿者文章
Volunteer.hasMany(Volunteer_article)
Volunteer_article.belongsTo(Volunteer)
//寻亲者与寻亲者文章
Family_seeker.hasMany(Seeker_article)
Seeker_article.belongsTo(Family_seeker)
// // 消息推送
Volunteer.hasMany(Message_push)
Admin.hasMany(Message_push)
Message_push.belongsTo(Volunteer)
Message_push.belongsTo(Admin)


/**
 * 修改模型后，放开注释同步模型
 */
// dbInstance.sync().then(data=>{
//     console.log('同步成功');
// }).catch(e=>{
//     console.log('同步失败，请检查数据模型',e);
// })

