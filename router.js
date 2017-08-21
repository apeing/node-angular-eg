/**
 * Created by Administrator on 2017/8/2.
 */
'use strict';
const express = require('express');
const router = express.Router();

router.use('/signature',require('./app/signature'));
router.use('/oauth',require('./app/oauth/oauth'));
router.use('/api',require('./app/api'));
router.use('/blog',require('./app/blog'));
router.use('/wechat',require('./app/wechat'));

module.exports = router;