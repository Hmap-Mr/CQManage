const path = require('path');
// 导入Model
const heroModel = require('../model/heroModel.js');

module.exports = {
    showHeroList:(req,res)=>{
        //展示首页html
        res.writeHead(302,{
            'Location':'/resource/view/index.html'
        })
        res.end();
    },
    getHeroList:(req,res)=>{
        // 获取首页英雄列表
        heroModel.find({}).sort({'_id':-1}).exec((err,docs)=>{
            if(err){
                res.send({
                    err_code:500,
                    err_msg:err
                })
            }else {
                let pageCount = Math.ceil(docs.length/10);
                res.json({
                    heros:docs.slice(0,10),
                    pageCount:pageCount,
                });
            };
        });
    },
    getHeroPage:(req,res)=>{
        // 分页查询
        heroModel.find({}).sort({'_id':-1}).exec((err,docs)=>{
            if(err){
                res.send({
                    err_code:500,
                    err_msg:err
                })
            }else {
                let pageCount = Math.ceil(docs.length/10);
                let page = req.query.page;
                res.json({
                    heros:docs.slice( (page-1)*10 , page*10 ),
                    pageCount:pageCount,
                });
            }
        });
    },
    getHeroSearch:(req,res)=>{
        // 搜索功能
        console.log(req.query);
        // 1.获取查询内容
        let searchTxt = req.query.searchTxt;
        // mongoose支持正则
        let reg =new RegExp(searchTxt,'i');
        // 2.查询数据库
        heroModel.find({heroName:reg},(err,docs)=>{
            if(err){
                res.send({
                    err_code:500,
                    err_msg:err
                })     
            }else{
                let pageCount = Math.ceil(docs.length/10);
                res.json({
                    heros:docs,
                    pageCount:pageCount,
                });
            }
        });
    },
    doHeroAdd:(req,res)=>{
        // 增加英雄
        let icon = req.files.icon;
        icon.mv('./resource/img/' + req.body.name + ".png",function(err){
            if(err){
                res.send({
                    err_code:500,
                    err_msg:err
                })
            }else{
                heroModel.create({
                    heroName:req.body.name,
                    heroSkill:req.body.skill,
                    heroIcon:"/resource/img/" + req.body.name + ".png"
                },(err)=>{
                    if(err){
                        res.send({
                            err_code:500,
                            err_msg:err
                        })
                    }else{
                        res.send({
                            err_code:0,
                            err_msg:err
                        })
                    }
                })
                
            }
        })
    },
    doHeroUpdate:(req,res)=>{
        // 修改英雄
        let body = req.body;
        let icon = req.files.icon;
        if(icon){
            icon.mv('./resource/img/' + req.body.name + '.png',(err)=>{
                if(err){
                    res.send({
                        err_code:500,
                        err_msg:err
                    })
                }else{
                    heroModel.findByIdAndUpdate(req.body._id,{
                        heroName:body.name,
                        heroSkill:body.skill,
                        heroIcon:'/resource/img/' + body.name + '.png'
                    },(err)=>{
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
        }else{
            heroModel.findByIdAndUpdate(req.body._id,{
                heroName:body.name,
                heroSkill:body.skill,
            },(err)=>{
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
    },

    getHeroInfo:(req,res)=>{
        // 查询英雄
        
    },
    doHeroDelete:(req,res)=>{
        // 删除英雄
        let heroID = req.query._id;
        heroModel.findByIdAndRemove({_id:heroID},(err)=>{
            if(err){
                res.send({
                    err_code:500,
                    err_msg:err
                })
            }else{
                res.writeHead(302,{
                    "Location":"/"
                })
                res.end();
            }
        })
    },
}