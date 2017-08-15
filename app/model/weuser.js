/**
 * Created by Administrator on 2017/8/11.
 */
/**
 * Created by Administrator on 2017/8/2.
 */
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var sha1 = require('sha1');

var UserSchema = new Schema({
    mobile: { type: String, required: true },   //用户名
    password: { type: String, required: true },
    status: {type: String, default: 'Active'}, //帐户状态
    secret: String  //登录secret
});

UserSchema.index({ 'mobile': 1 }, { 'unique': true });

UserSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) return next();
    user.password = sha1(user.password);
    next();
});

UserSchema.methods.comparePassword = function(candidatePassword) {
    return sha1(candidatePassword) === this.password;
};

var Weuser;

if (mongoose.models.Weuser) {
    Weuser = mongoose.model('Weuser');
} else {
    Weuser = mongoose.model('Weuser', UserSchema, 'weusers');
}

module.exports = Weuser;
