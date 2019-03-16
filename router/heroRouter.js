// 1.导入express
const express = require('express');
// 2.创建路由中间件
let app = express();

// 导入controller
const heroController = require('../controller/heroController.js');

// 路由: 负责将请求分发给controller
app
    .get('/',heroController.showHeroList)
    .get('/heroList',heroController.getHeroList)
    .get('/heroPage',heroController.getHeroPage)
    .get('/heroSearch',heroController.getHeroSearch)
    .post('/heroAdd',heroController.doHeroAdd)
    .post('/heroUpdate',heroController.doHeroUpdate)
    .get('/heroInfo',heroController.getHeroInfo)
    .get('/heroDelete',heroController.doHeroDelete)


// 3.导出路由中间件
module.exports = app;