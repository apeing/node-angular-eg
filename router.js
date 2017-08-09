/**
 * Created by Administrator on 2017/8/2.
 */
'use strict';
const express = require('express');
const router = express.Router();

const qiniu = require('qiniu');

router.get('/qupload',function(req,res,next){
    var bucket = 'test';
    var accessKey = 'TXXu7FXig6oU1gLNMGERucvQvYjMvoKKQs_WQjqe';
    var secretKey = 'VXN6Q0nf_b8MBv4fvsrCx2vCouxIdiRE-fO3lWkO';
    var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    var options = {
        scope: bucket,
    }
    var putPolicy = new qiniu.rs.PutPolicy(options);
    var uploadToken = putPolicy.uploadToken(mac);
    return res.json({
        token: uploadToken
    });
});

router.use('/api',require('./app/api/auth'));

module.exports = router;