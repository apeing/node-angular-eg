/**
 * Created by Administrator on 2017/8/11.
 */
'use strict';
const express = require('express');
const router = express.Router();

const async = require('async');
const NSError = require('../lib/error-model');
const User = require('../model/weuser');
const WeChatUser = require('nightshade-core').Core.WeChatUser;
const JWT = require('../lib/json-web-token');
const ObjectId = require('mongoose').Types.ObjectId;

router.get('/unionid/:unionid',function(req,res,next){
    console.log('unionid : ' + req.params.unionid)
    WeChatUser.findOne({'unionid':req.params.unionid},function(err,wechatuser){
        if(err) return next(err);
        if(!wechatuser) return next(NSError.warning('没有此用户'));
        var expireTime = new Date(Date.now() + 1800000);
        res.cookie('unionid', wechatuser.unionid, {'expires': expireTime});
        return res.status(200).json({});
    });
});

router.post('/load', function(req, res, next){
    var mobile = req.body.mobile;
    var password =  req.body.password;
    User.findOne({'mobile': mobile}, function(err, user){
        if (err) return next(err);
        if (!user) return next(NSError.warning('账号或密码错误，请重新输入。'));
        var isMatch = user.comparePassword(password);
        if (!isMatch) return next(NSError.warning('账号或密码错误，请重新输入。'));
        var expireTime = new Date(Date.now() + 1800000);
        var result = JWT.createTokenSync({ '_id': user.id, 'username': user.username });
        user.secret = result.secret;
        user.save();
        res.cookie('token', result.token, {'expires': expireTime});
        res.cookie('userId', user.id, { 'expires': expireTime});
        console.log('end');
        return res.status(200).json({});
    });
});

router.post('/register', function(req, res, next){
    var mobile = req.body.mobile;
    var password = req.body.password;
    User.findOne({'mobile': mobile}, function(err, result){
        if (err) return next(err);
        if (result) return next(NSError.warning('存在同名账户，请换一个用户名'));
        User.create({'mobile': mobile, 'password': password}, function(err, user){
            if(err) return next(err);
            return res.status(201).json({'message': user.mobile + '创建成功'});
        });
    });
});

router.use('/', function(req, res, next){
    var unionid = req.cookies.unionid;
    console.log("/unionid : " + unionid);
    if(!unionid) return next(NSError.needLogin('超时，请重新登陆'));
    WeChatUser.findOne({'unionid':unionid}, function(err, user){
        if(err) return next(err);
        if (!user) return next(NSError.needLogin(password));
        req.currentUser = user;
        return next();
    });
});

router.get('/user',function(req, res, next){
 //   console.log("currentUser : " + JSON.stringify(req.currentUser));
    return res.status(201).json({
        mobile: req.currentUser.unionid
    });
});

router.use('/picture',require('./picture'));

module.exports = router;