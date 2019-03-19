// 导入Model
const userModel = require('../model/userModel.js');

// 导入 验证码 工具
const svgCaptcha = require('svg-captcha');


// 存储验证码
let code = "";

// 导出方法
module.exports = {
    doRegister:(req,res)=>{
        // 注册
        // console.log(req.body);
        let body = req.body;//获取post数据
        if(body.code.toLowerCase() != code){//验证验证码
            res.send({
                err_code:2,
                err_msg:"验证码错误!"
            });
        }else{//验证码没问题 查询用户是否被注册过
            userModel.find({userName:body.userName},(err,docs)=>{
                if(err){
                    res.send({
                        err_code:500,
                        err_msg:err
                    });
                }else if(docs.length != 0){//能查出数据 证明被注册过
                    res.send({
                        err_code:1,
                        err_msg:'用户已存在'
                    });
                }else {//未被注册 添加到数据库
                    userModel.create({userName:body.userName,passWord:body.passWord},(err)=>{
                        if(err){
                            res.send({
                                err_code:500,
                                err_msg:err
                            })
                        }else{
                            res.send({
                                err_code:0,
                                err_msg:"success"
                            })
                        }
                    })
                }
            })
        }
    },
    doLogin:(req,res)=>{
        // 登录
        let body = req.body;

        // 验证用户名 是否 存在
        userModel.find({userName:body.userName},(err,docs)=>{
            if(err){
                res.send({
                    err_code:500,
                    err_msg:err
                });
            }else if(docs.length == 0){//用户名 不存在
                res.send({
                    err_code:1,
                    err_msg:'用户名或密码错误!'
                });
            }else{//用户名 存在 继续验证密码
                if(body.passWord == docs[0].passWord){
                    req.session.user = body;
                    res.send({
                        err_code:0,
                        err_msg:"success!"
                    });
                }else{
                    res.send({
                        err_code:1,
                        err_msg:'用户名或密码错误!'
                    });
                }
            }
        })
    },
    getCaptcha:(req,res)=>{
        // 验证码
        // 1.创建验证码对象:得到验证码图片和文本
        var captcha = svgCaptcha.create();
        // 把验证码存储起来
        code = captcha.text.toLowerCase();
        // console.log(captcha.text);
        // 2.返回数据和图片
        res.type('svg').status(200).send(captcha.data)
    },
    doLogout:(req,res)=>{
        // 登出
        req.session = null;
        res.writeHead(302,{
            "Location":"/resource/view/login.html"
        });
        res.end();
    },
}