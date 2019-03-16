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
        heroModel.find((err,docs)=>{
            if(err){
                throw err;
            }else {
                let pageCount = Math.ceil(docs.length/10);
                res.json({
                    heros:docs.slice(0,10),
                    pageCount:pageCount,
                });
            }
        })
    },
    getHeroPage:(req,res)=>{
        // 分页查询
    },
    getHeroSearch:(req,res)=>{
        // 搜索功能
    },
    doHeroAdd:(req,res)=>{
        // 增加英雄
    },
    doHeroUpdate:(req,res)=>{
        // 修改英雄
    },
    getHeroInfo:(req,res)=>{
        // 查询英雄
    },
    doHeroDelete:(req,res)=>{
        // 删除英雄
    },

}