# junkegui_server
需要在db文件夹下创建 config.js 数据库配置文件，包括如下：
```js
const config = {
    database: '数据库名称',
    username: '账号',
    password: '密码',
    host: '数据库地址',
    port: 3306
}
module.exports = {config}
```
