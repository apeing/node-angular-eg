/**
 * Created by Administrator on 2017/8/14.
 */
'use strict';
const express = require('express');
const router = express.Router();
const async = require('async');
const Picture = require('../model/picture-model');

router.post('/',function(req,res,next){
    Picture.create({'participantId': req.body.participantId, 'url': req.body.url}, function(err, user){
        if(err) return next(err);
        return res.status(201).json({'message': user.mobile + '创建成功'});
    });
});

router.get('/:id',function(req,res,next){
    Picture.find({'participantId':req.params.id}).sort({'createdAt': -1}).exec(function(err, result){
        if (err) return next(err);
        return res.status(200).json(result);
    });
});

router.post('/delphotos', (req, res, next) => {
    let arr = req.body.ids;
    async.map(arr,function(item,callback){
        setTimeout(function(){
            Picture.remove({_id:item},(err,resu) => {
                if (err) return next(err);
            callback(null,'ok');
        });
        },100);
    },function(err,result){
        console.log("result : " + result);
        return res.status(201).json({});
    });
});

module.exports = router;