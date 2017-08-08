/**
 * Created by Administrator on 2017/8/2.
 */
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var sha1 = require('sha1');

var UserSchema = new Schema({
    username: { type: String, required: true },   //用户名
    password: { type: String, required: true },
    status: {type: String, default: 'Active'}, //帐户状态
    authorization: [String], //访问权限
    secret: String,  //登录secret
    groups: [{type: String,
        enum: {
            values: ['1', '2', '3', '4']}
    }] //1 四川地区 2 华中地区 3 华南地区 4 上海地区
});

UserSchema.index({ 'username': 1 }, { 'unique': true });

UserSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) return next();
    user.password = sha1(user.password);
    next();
});

UserSchema.methods.comparePassword = function(candidatePassword) {
    return sha1(candidatePassword) === this.password;
};

var User;

if (mongoose.models.User) {
    User = mongoose.model('User');
} else {
    User = mongoose.model('User', UserSchema, 'users');
}

module.exports = User;
