/**
 * Created by Administrator on 2017/8/17.
 */
'use strict';

var express = require('express');
var router = express.Router();

var wxConfig = {
    "domain":"http://5307c5e1.nat123.net",
    "appId": "wx3be48f286ee453ed",
    "secretKey":"f4bb1590ae9bcafd437f0bb95f616e8b"
};
var WeChatService = require('nightshade-core').Core.WeChatService;

router.post('/', function(req, res, next) {
    WeChatService.generateSignature(wxConfig.appId, wxConfig.secretKey, req.body.url).then(function(signature){
        return res.status(201).json(signature);
    }).catch(function(err){
        return next(err);
    });
});

router.get('/authorize/advenced', function(req, res, next){
    WeChatService.doAdvancedAuth(req.query.requestUrl, wxConfig.domain + '/signature/callback/advenced', wxConfig.appId).then(function(redirectUrl){
        return res.redirect(301, redirectUrl);
    }).catch(next);
});

router.get('/callback/advenced', function(req, res, next){
    WeChatService.advancedAuthCallback(req.query.state, req.query.code, wxConfig.appId, wxConfig.secretKey).then(function(url){
        return res.redirect(301, url);
    }).catch(next);
});

//该接口不是完全按照微信的官方流程，可以做到在不显示授权页的情况下拉取用户信息
router.get('/authorize/advanced', function(req, res, next){
    WeChatService.doBasicAuth(req.query.requestUrl, wxConfig.domain + '/signature/callback/advanced', wxConfig.appId).then(function(redirectUrl){
        return res.redirect(301, redirectUrl);
    }).catch(next);
});

router.get('/callback/advanced', function(req, res, next){
    WeChatService.advancedAuthCallback(req.query.state, req.query.code, wxConfig.appId, wxConfig.secretKey).then(function(url){
        return res.redirect(301, url);
    }).catch(next);
});

router.get('/authorize/basic', function(req, res, next){
    WeChatService.doBasicAuth(req.query.requestUrl, wxConfig.domain + '/login/callback/basic', wxConfig.appId).then(function successFn(redirectUrl){
        return res.redirect(301, redirectUrl);
    }).catch(next);
});

router.get('/callback/basic', function(req, res, next){
    WeChatService.basicAuthCallback(req.query.state, req.query.code, wxConfig.appId, wxConfig.secretKey).then(function(result){
        return res.redirect(301, result.url);
    }).catch(next);
});

module.exports = router;