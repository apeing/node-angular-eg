/**
 * Created by Administrator on 2017/8/10.
 */
(function(angular){
    'use strict';
    angular.module('activity',['ngRoute','shareModule','ngCookies','ngFileUpload','angularQFileUpload', 'LocalStorageModule'])
        .config(['$routeProvider','$compileProvider', 'localStorageServiceProvider', function ($routeProvider,$compileProvider, localStorageServiceProvider) {
            $routeProvider.when('/login', {
                templateUrl: 'view/login.html',
                controller: 'loginController'
            }).when('/unionid_login', {
                templateUrl: 'view/unionid_login.html',
                controller: 'unionidloginController'
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
            $compileProvider.imgSrcSanitizationWhitelist(/^\s*(http|https|data|wxlocalresource):/);
            localStorageServiceProvider.setStorageType('sessionStorage');
        }]).run(['$rootScope', '$window', function($rootScope, $window) {
        console.log('run! ');
        var initData = {
            signatureServer: 'http://5307c5e1.nat123.net',
            jsApiList: ['onMenuShareTimeline', 'hideMenuItems', 'onMenuShareAppMessage', 'getLocation', 'startRecord', 'onVoiceRecordEnd', 'stopRecord', 'onVoicePlayEnd', 'playVoice', 'pauseVoice', 'stopVoice', 'uploadVoice', 'downloadVoice', 'chooseWXPay','chooseImage']
        };
        $window.share.init(initData, function(err){
            console.log('err : ' + JSON.stringify(err));
            if(err) return;
            $window.wx.hideMenuItems({
                menuList: ['menuItem:share:qq', 'menuItem:share:weiboApp', 'menuItem:share:facebook', 'menuItem:share:QZone', 'menuItem:editTag', 'menuItem:delete', 'menuItem:copyUrl', 'menuItem:originPage', 'menuItem:readMode', 'menuItem:openWithQQBrowser', 'menuItem:openWithSafari', 'menuItem:share:email', 'menuItem:share:brand']
            });
            $rootScope.$broadcast('weChatReady');
        });
    }]);
})(angular);
