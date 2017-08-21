/**
 * Created by Administrator on 2017/8/21.
 */
const express = require('express');
const router = express.Router();

const async = require('async');
const NSError = require('../lib/error-model');
const User = require('../model/authuser');
const JWT = require('../lib/json-web-token');
const ObjectId = require('mongoose').Types.ObjectId;

router.post('/auth', function(req, res, next){
    var username = req.body.username;
    var password =  req.body.password;
    User.findOne({'username': username}, function(err, user){
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
router.use('/', function(req, res, next){
    var userId = req.cookies.userId;
    var token = req.cookies.token;
    if(!userId || !token) return next(NSError.needLogin('超时，请重新登陆'));
    if (!ObjectId.isValid(userId)) return next(NSError.needLogin(personId));
    async.waterfall([
        function findUser(callback){
            User.findById(userId, function(err, user){
                if(err) return callback(err);
                if (!user) return callback(NSError.needLogin(userId));
                return callback(null, user);
            });
        },
        function verifyToken(user, callback){
            JWT.verifyToken('Bearer ' + token, user.secret, function(err, decode){
                if (err) {
                    console.error(err);
                    return callback(NSError.needLogin(decode));
                }
                if (!decode.scopes || !decode.scopes.user || decode.scopes.user._id !== user.id) return callback(NSError.needLogin('Token与用户信息不匹配'));
                req.currentUser = user;
                res.cookie('userId', userId, {
                    expires: new Date(Date.now() + 7200000) //登录30分钟超时
                });
                res.cookie('token', token, {
                    expires: new Date(Date.now() + 7200000) //登录30分钟超时
                });
                callback();
            });
        }
    ], next);
});

router.get('/user',function(req, res, next){
    return res.json({
        id: req.currentUser.id,
        username: req.currentUser.username,
        authorization: req.currentUser.authorization
    });
});

module.exports = router;