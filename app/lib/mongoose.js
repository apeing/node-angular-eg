/**
 * Created by Administrator on 2017/8/2.
 */
module.exports = function (dbConfig) {
    'use strict';

    var mongoose = require('mongoose');
    var uri = 'mongodb://' + dbConfig.host + '/' + dbConfig.name;
    if (dbConfig.username && dbConfig.password) {
        uri = 'mongodb://' + dbConfig.username + ':' + dbConfig.password + '@' + dbConfig.host + '/' + dbConfig.name;
    }
    var isConnectedBefore = false;
    var connect = function() {
        mongoose.connect(uri, dbConfig.options);
    };
    connect();

    mongoose.connection.on('error', function() {
        console.error('无法连接上MongoDB...');
    });

    mongoose.connection.on('disconnected', function(){
        console.log('MongoDB连接丢失...');
   //     if (!isConnectedBefore) connect();
    });

    mongoose.connection.on('connected', function() {
        isConnectedBefore = true;
        console.log('已连接上MongoDB');
    });

    mongoose.connection.on('reconnected', function() {
        console.log('已重新连接上MongoDB');
    });

    process.on('SIGINT', function() {
        mongoose.connection.close(function () {
            console.log('与MongoDB的连接被强制断开');
            process.exit(0);
        });
    });
};
