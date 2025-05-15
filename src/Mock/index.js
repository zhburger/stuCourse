import Mock from 'mockjs'

//拦截用户登录
/* Mock.mock('http://localhost:8080/api/user/login', 'post', (option) => {
    return{
        "code":1,
        "msg":null,
        "data":{
            "token":"1234567890",
            "username":"admin"
        }
    }
}) */

//拦截用户注册
/* Mock.mock('http://localhost:8080/api/user/register', 'post', (option) => {
    return{
        "code":1,
        "msg":null,
        "data":null
    }
}) */
//拦截获取课程api


//拦截生成培养计划api