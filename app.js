// 1.导入express模块
const express = require('express');
// 2.创建服务器
let app = express();

// 3.1 配置中间件
var path = require('path');
var bodyParser = require('body-parser');
var serveFavicon = require('serve-favicon');

app
    // 3.2 使用中间件
    .use(bodyParser.urlencoded({ extended:false }))
    .use(serveFavicon(path.join(__dirname, 'resource', 'favicon.ico')))
    
    // 3.3托管静态资源
    .use('/node_modules',express.static('node_modules'))
    .use('/resource',express.static('resource'))

    // 3.4 使用路由
    .use(require('./router/heroRouter.js'))
    
    .use((req,res)=>{
        console.log("1111");
        console.log(req.body);
        res.send("11");
    })
    // 4.开启服务器
    .listen(3000,()=>{
        console.log('欢迎来到CQ战记');
    })