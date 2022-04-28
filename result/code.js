const CODE = {
    // normal
    SUCCESS: {
        code: 200,
        msg: 'OK'
    },
    ERROR: {
        code: 500,
        msg: '服务端异常',
    },

    // 未找到
    ADMIN_NOT_FOUND: {
        code: 404001,
        msg: '该管理员不存在'
    },
    ROLE_NOT_FOUND: {
        code: 404002,
        msg: '该角色不存在'
    },
    // 志愿者
    // 寻亲者
    // 烈士

    // 权限
    ADMIN_NOT_ROLE: {
        code: 401001,
        msg: '该管理员权限不够'
    },


    //客户端错误
    PAYLOAD_NOT_FOUND: {
        code: 401004,
        msg: '客户端参数缺失'
    },
    ADMIN_PWD_NOT: {
        code: 401003,
        msg: '密码错误'
    },
    ADMIN_NOT_LOGIN: {
        code: 401000,
        msg: '管理员未登录'
    }
}


module.exports = CODE