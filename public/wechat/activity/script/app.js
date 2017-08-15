/**
 * Created by Administrator on 2017/8/10.
 */
(function(angular){
    'use strict';
    angular.module('activity',['ngRoute','ngCookies','ngFileUpload','angularQFileUpload', 'LocalStorageModule'])
        .config(['$routeProvider', 'localStorageServiceProvider', function ($routeProvider, localStorageServiceProvider) {
            $routeProvider.when('/login', {
                templateUrl: 'view/login.html',
                controller: 'loginController'
            }).when('/notice', {
                templateUrl: 'view/notice.html',
                controller: 'noticeController'
            }).when('/index', {
                templateUrl: 'view/index.html',
                controller: 'indexController'
            }).when('/register', {
                templateUrl: 'view/register.html',
                controller: 'RegisterController'
            }).when('/picture', {
                templateUrl: 'view/picture/list.html',
                controller: 'pictureListController'
            }).otherwise({
                redirectTo: '/index'
            });
            localStorageServiceProvider.setStorageType('sessionStorage');
        }]).run(['$rootScope', '$window', function($rootScope, $window) {
        var initData = {
            signatureServer: 'http://www.apetribe.net',
            title: '《笔记大自然》画语大赛作品欣赏',
            logo: 'https://o5ghe186j.qnssl.com/chengdu-shuohua-2017-03/images/share_logo.jpg',
            description: '我参加了成都市《笔记大自然》画语大赛，来看看我的作品吧！',
            link: $window.location.origin + '/chengdu-shuohua-2017-03/intro/gateway.html',
            jsApiList: ['onMenuShareTimeline', 'hideMenuItems', 'onMenuShareAppMessage', 'getLocation', 'startRecord', 'onVoiceRecordEnd', 'stopRecord', 'onVoicePlayEnd', 'playVoice', 'pauseVoice', 'stopVoice', 'uploadVoice', 'downloadVoice', 'chooseWXPay']
        };
        $window.share.init(initData, function(err){
            if(err) return;
            $window.wx.hideMenuItems({
                menuList: ['menuItem:share:qq', 'menuItem:share:weiboApp', 'menuItem:share:facebook', 'menuItem:share:QZone', 'menuItem:editTag', 'menuItem:delete', 'menuItem:copyUrl', 'menuItem:originPage', 'menuItem:readMode', 'menuItem:openWithQQBrowser', 'menuItem:openWithSafari', 'menuItem:share:email', 'menuItem:share:brand']
            });
            $rootScope.$broadcast('weChatReady');
        });
    }]);
})(angular);
