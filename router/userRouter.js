// 1.导入express
const express = require('express');
// 2.创建路由中间件
let app = express();

// 导入controller
const userController = require('../controller/userController.js');

app
    
    .post('/register',userController.doRegister)
    .post('/login',userController.doLogin)
    .get('/captcha',userController.getCaptcha)
    .get('/logout',userController.doLogout)

// 3.导出路由
module.exports = app;