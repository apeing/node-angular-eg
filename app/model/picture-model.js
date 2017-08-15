/**
 * Created by Administrator on 2017/8/14.
 */
'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//活动参与者上传照片
let pictureSchema = new Schema({
    participantId: { type: String, required: true },               //照片上传用户id
    url: { type: String, required: true },                         //照片url
    createdAt: {type: Date, default: Date.now}
});

var Picturemodel;

if (mongoose.models.picturemodel) {
    Picturemodel = mongoose.model('picturemodel');
} else {
    Picturemodel = mongoose.model('picturemodel', pictureSchema, 'pictures');
}

module.exports = Picturemodel;
