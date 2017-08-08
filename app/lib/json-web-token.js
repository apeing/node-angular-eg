/**
 * Created by Administrator on 2017/8/2.
 */
'use strict';

var auth = (function () {
    var jwt = require('jsonwebtoken');
    var uuid = require('uuid');
    var NSError = require('./error-model');
    var _ = require('lodash');

    return {
        createToken: function(data, callback) {
            var issuedAt = new Date().getTime();
            var secret = uuid.v4();
            var issuer = 'TomatoTown';
            var payload = {
                'iss': issuer,
                'iat': issuedAt,
                'scopes': { 'user': data }
            };
            var token = jwt.sign(payload, secret);
            callback(token, secret);
        },
        createTokenSync: function(data) {
            var issuedAt = new Date().getTime();
            var secret = uuid.v4();
            var issuer = 'TomatoTown';
            var payload = {
                'iss': issuer,
                'iat': issuedAt,
                'scopes': { 'user': data }
            };
            var token = jwt.sign(payload, secret);
            return {
                'token': token,
                'secret': secret
            };
        },
        verifyToken: function(authorization, secret, callback) {
            if(_.isFunction(callback)){
                if (_.isEmpty(authorization)) return callback(NSError.badRequest(authorization, '请求Headers中未包含Authorization信息'));
                var token = authorization.split(' ')[1];
                return jwt.verify(token, secret, callback);
            }
            return new Promise((resolve, reject) => {
                    if (_.isEmpty(authorization)) return reject(NSError.badRequest(authorization, '请求Headers中未包含Authorization信息'));
            var token = authorization.split(' ')[1];
            return jwt.verify(token, secret, (err, decode) => {
                    if(err) return reject(err);
            return resolve(decode);
        });
        })
        },
        verify: function(authorization, secret, callback) {
            if (_.isEmpty(authorization)) return callback(NSError.badRequest(authorization, '请求Headers中未包含Authorization信息'));
            var token = authorization.split(' ')[1];
            jwt.verify(token, secret, callback);
        }
    }
})();

module.exports = auth;
