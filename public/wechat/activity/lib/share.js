/**
 * Created by Administrator on 2017/8/11.
 */
(function(){
    'use strict';
    var shareData;
    window.share = {
        isInWeChat: function(){
            var ua = navigator.userAgent.toLowerCase();
            if(ua.match(/MicroMessenger/i)=='micromessenger'){
                return true;
            }else{
                return false;
            }
        },
        init: function(initData, callback){
            callback = callback || function(){};
            shareData = initData;
            var weChatInitData = {
                debug: initData.debug,
                timestamp: 0, // 必填，生成签名的时间戳
                nonceStr: '', // 必填，生成签名的随机串
                signature: '',// 必填，签名，见附录1
                jsApiList: initData.jsApiList || ['onMenuShareTimeline', 'onMenuShareAppMessage']
            };

            if(!this.isInWeChat()) return callback({msg: 'not in wechat, quit', status: 'cancel'});
            var postData = {};
            postData.url = location.href.split('#')[0];

            wx.ready(function(){
                for(var i = 0; i < weChatInitData.jsApiList.length; i++){
                    if((weChatInitData.jsApiList[i] === 'onMenuShareTimeline') || (weChatInitData.jsApiList[i] === 'menu:share:timeline'))
                        wx.onMenuShareTimeline({
                            trigger: function(){
                                this.imgUrl= shareData.logo; // 分享图标
                                this.link = shareData.link || window.location.href;
                                this.title = shareData.description; // 分享标题
                                this.success = shareData.successFn;
                                this.cancel = shareData.cancelFn;
                            }
                        });
                    if((weChatInitData.jsApiList[i] === 'onMenuShareAppMessage') || (weChatInitData.jsApiList[i] === 'menu:share:appmessage'))
                        wx.onMenuShareAppMessage({
                            trigger: function(){
                                this.imgUrl= shareData.logo; // 分享图标
                                this.title = shareData.title || document.title;
                                this.link = shareData.link || window.location.href;
                                this.desc = shareData.description;
                                this.success = shareData.successFn;
                                this.cancel = shareData.cancelFn;
                            }
                        });
                }
                callback(null, {status: 'success', msg: 'finish init'});
            });

            wx.error(function(res){
                callback(res);
            });
            if(!window.http)
                throw new Error('does not include https library, please ask help');
            window.http.post(initData.signatureServer + '/signature/', {}, postData, function(err, signature){
                if(err) return callback(err);
                weChatInitData.timestamp = signature.timestamp;
                weChatInitData.nonceStr = signature.noncestr;
                weChatInitData.signature = signature.signature;
                weChatInitData.appId = signature.appId,
                    wx.config(weChatInitData);
            });
        },
        initShareData: function(description, logo, title, link, successFn, cancelFn){
            shareData = {
                description: description || (shareData || {}).description,
                title: title || (shareData || {}).title,
                logo: logo || (shareData || {}).logo,
                link: link || (shareData || {}).link,
                successFn: successFn || (shareData || {}).successFn,
                cancelFn: cancelFn || (shareData || {}).cancelFn

            };
        }
    };
})();