/**
 * Created by Administrator on 2017/8/2.
 */
module.exports = (function () {
    'use strict';
    var util = require('util');
    function createError(name, status, detailMessage, displayMessage){
        var err = new Error(displayMessage);
        err.status = status;
        err.name = name;
        err.detail = detailMessage;
        err.level = 'Error';
        return err;
    }
    function createWarning(name, status, detailMessage, displayMessage){
        var err = new Error(displayMessage);
        err.status = status;
        err.name = name;
        err.detail = detailMessage;
        err.level = 'Warning';
        return err;
    }
    return {
        new: function(name, msg, status, detail) {
            return createError(name, status, detail, msg);
        },
        warning: function(msg) {
            return createWarning('Warning', 400, msg, msg);
        },
        mobileExists: function(mobile) {
            var msg = '手机号: ' + mobile + ' 已被注册，请联系客服';
            return createWarning('Duplicate Mobile', 400, msg, msg);
        },
        travelerInfoExists: function() {
            var msg = '该证件号码已被使用';
            return createWarning('Duplicate idNumber', 400, msg, msg);
        },
        internalWarning: function(id, msg, detail){
            return createWarning('Internal Warning', 418, detail, msg);
        },
        badRequest: function(params, msg){
            var detail = '请求参数有误 - [' + params + ']';
            return createError('Bad Request', 400, detail, msg);
        },
        notFound: function(id, msg) {
            var detail = msg + ': ' + id;
            return createError('Not Found', 404, detail, msg);
        },
        needLogin: function(personId) {
            var detail = '未找到用户信息 - [_id:' + personId + ']';
            return createError('Unauthorized', 401, detail, '获取当前账户信息失败，请重新登录');
        },
        insufficientPoints: function(detail) {
            return createWarning('Forbidden', 403, detail, '当前小红花数量不足，请继续努力');
        },
        easemob: function(msg, error){
            return createError('Easemob Error', 400, error.error_description, msg);
        },
        needUpgrade: function(packageName, buildNumber, latestNumber){
            var detail = util.format('App[%s]BuildNumber[%s]早于最新版[%s]', packageName, buildNumber, latestNumber);
            return createWarning('Need Upgrade', 419, detail, '发现新版App，请下载更新');
        },
        smsError: function(mobile, errorCode, errorMessage, displayMessage){
            var detail = util.format('短信发送失败(%s): [%s] %s', mobile, errorCode, errorMessage);
            return createError('SMS Error', 400, detail, displayMessage);
        },
        pushError: function(clientId, taskId, errorMessage){
            var detail = util.format('推送消息失败(%s): [%s] %s', taskId, clientId, errorMessage);
            return createError('Push Error', 400, detail, '推送消息失败');
        },
        statusInCorrected: function(resourceId, msg){
            var detail = util.format('资源(%s)状态不正确：(%s)', resourceId, msg);
            return createError('Status Incorrected', 403, detail, msg);
        },
        CanNotDoTwice: function(type, msg){
            var detail = util.format('(%s)只能进行一次', type);
            return createError('Can Not Do Twice', 409, detail, msg);
        },
        verifyCodeError: function(verifyCode){
            var detail = util.format('输入的验证码(%s)不正确', verifyCode);
            return createWarning('Bad Request', 400, detail, '验证码不正确');
        },
        levelTooLow: function(taskLevel, userLevel, msg){
            var detail = util.format('任务级别：(%s)，用户级别：(%s)', taskLevel, userLevel);
            return createWarning('Bad Request', 400, detail, msg || '用户级别不足');
        },
        twiceSignUp: function(signUpId, msg){
            var detail = util.format('已报名的Id：(%s)', signUpId);
            return createWarning('Conflict', 409, detail, msg);
        },
        AccountLock: function(partTimer){
            var detail = util.format('手机号：(%s)', partTimer.mobile);
            return createWarning('Bad Request', 403, detail, '账户被锁定');
        },
        VluationExist: function(vluationId){
            var detail = util.format('评价(%s)已经存在，不能再次评价', vluationId);
            return createWarning('Conflict', 409, detail ,'评价已经存在，不能再次评价')
        }
    }
})();
