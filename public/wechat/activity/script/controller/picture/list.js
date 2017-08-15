/**
 * Created by Administrator on 2017/8/14.
 */
(function(angular) {
    'use strict';
    angular.module('activity').controller('pictureListController', ['$scope', '$http', '$routeParams', '$window', '$qupload','busyIndicatorService','alertMessageService','confirmMessageService', function($scope, $http, $routeParams, $window, $qupload,busyIndicatorService,alertMessageService,confirmMessageService) {

        $scope.show_screen = true;
        $scope.img_src = '';
        $scope.img_w = 200;
        $scope.img_h = 200;
        $scope.index = 0;
        $scope.del_img = 'init';
        $scope.uploadtag = false;
        $scope.uploadnumber = 0;
        $scope.uploadsum = 0;
        $scope.showConfirmMessageBtn = false;
        var showstop = false;
        var delphotos = [];
        //photoswipe加载图片数组
        var arr2 = [];
        Array.prototype.S=String.fromCharCode(2);
        Array.prototype.in_array=function(e){
            var r=new RegExp(this.S+e+this.S);
            return (r.test(this.S+this.join(this.S)+this.S));
        };
        function Tagactive(val,val2){
            $scope.delpictures.forEach(function (item,index){
                if(item._id === val)
                    return $scope.delpictures[index].isActive = val2;
            });
            return false;
        }
        function init() {
            // 隐藏大图参看
            $http.get('/wechat/user').then(function successFn(response){
                $scope.mobile = response && response.data && response.data.mobile;
                $window.document.title = '活动照片';
                $http.get('/wechat/picture/' + $scope.mobile ).then(function successFn(response) {
                    $scope.pictures = response.data;
                    var arr = $scope.pictures;
                    arr2 = new Array([arr.length]);
                    arr.forEach(function(item,index){
                        var img = new Image();
                        img.onload = function(){
                            arr2[index] = {src:item.url,w:img.width,h:img.height};
                        };
                        img.src = item.url;
                    });
                    $scope.del_img = 'init';
                    $scope.show_screen = true;
                }, function errorFn(response) {
                    $scope.pictures = [];
                    var message = response.data.message || '获取活动照片失败';
                    alert(message);
                    $scope.del_img = 'init';
                    $scope.show_screen = true;
                });
            }, function errorFn(response){
                if (response.status === 401) return $window.location.replace('index.html#/login?returnUrl=' + encodeURIComponent($location.path()));
            });
        }

        $scope.rootbtn1 = function(){
            showstop = true;
            $scope.showConfirmMessageBtn = false;
        };
        $scope.rootbtn2 = function(){
            $scope.showConfirmMessageBtn = false;
        };
        $scope.delphoto = function(val){
            if(delphotos.in_array(val)){
                var tag = 0;
                Tagactive(val,false);
                delphotos.forEach(function(item){
                    if(item === val){
                        delphotos.splice(tag,1);
                        return ;
                    }
                    tag++;
                });
            }else {
                Tagactive(val,true);
                delphotos.push(val);
            }
        };
        $scope.delImages = function(){
            $scope.del_img = 'del';
            $scope.show_screen = false;
            $http.get('/wechat/picture/' + $scope.mobile).then(function successFn(response) {
                $scope.pictures = response.data;
                var arrpic = [];
                $scope.pictures.forEach(function (item){
                    arrpic.push({_id:item._id,url:item.url,isActive:false});
                });
                $scope.delpictures = arrpic;
            }, function errorFn(response) {
                $scope.del_img = 'init';
                $scope.show_screen = true;
                var message = response.data.message || '获取活动照片失败';
                alert(message);
            });
        };
        $scope.delImages_cancel = function(){
            init();
        };
        $scope.delImages_Ok = function(){
            $http.post('/wechat/picture/delphotos',{
                ids:delphotos
            }).then(function successFn(){
                delphotos = [];
                alertMessageService.addAlert('删除成功!');
                setTimeout(function(){
                    init();
                }, 2000);
            },function errorFn(response){
                var message = response.data.message || '删除活动照片失败';
                alert(message);
                init();
            });
        };
        $scope.cancel_upload = function () {
            $scope.showConfirmMessageBtn = true;
            confirmMessageService.addAlert({msg: '确定要取消上传吗?'});
        };
        $scope.uploadImage = function(files) {
            if (files && files.length) {
                $scope.del_img = 'upload';
                //    $scope.show_screen = true;
                $scope.uploadnumber = 0;
                $scope.uploadtag = true;
                $scope.uploadsum = files.length;
                var tagnum = 0;
                files.forEach(function(item){
                    var file = item;
                    if (file.size > 5242880)
                        return alert('文件：' + file.name + '太大了，一张照片不能超过5Mb');
                    //   busyIndicatorService.showBusyIndicator();
                    $http.get('/qupload').success(function(resobj) {
                        var upload = $qupload.upload({
                            key: 'angularjs-eg/' + $scope.mobile + '/' + file.name,
                            file: file,
                            token: resobj.token
                        });
                        upload.then(function onSuccess(response) {
                            var url = 'http://ouazo1qm2.bkt.clouddn.com/' + response.key;
                            $http.post('/wechat/picture/', {
                                'participantId': $scope.mobile,
                                'url': url
                            }).then(function successFn() {
                                tagnum++;
                                $scope.uploadnumber = tagnum;
                                if(showstop)
                                {
                                    showstop = false;
                                    return;
                                }
                                if(tagnum === $scope.uploadsum)
                                {
                                    $scope.del_img = 'init';
                                    $scope.show_screen = true;
                                    $scope.uploadtag = false;
                                }
                                //              busyIndicatorService.hideBusyIndicator();
                                $scope.pictures.splice(0,0,{url:url});
                            }, function errorFn(response) {
                                busyIndicatorService.hideBusyIndicator();
                                var message = response.data.message || '出错了，请再试一下吧';
                                alert(message);
                            });
                        }, function onError() {
                            //            busyIndicatorService.hideBusyIndicator();
                        }, function progress() {});
                    });
                });
            }
        };
        $scope.openPhotoSwipe = function(val_id){
            var arr = $scope.pictures;
            var photoindex = 0;
            arr.forEach(function(item,index){
                if(val_id === item._id)
                    photoindex=index;
            });
            var pswpElement = document.querySelectorAll('.pswp')[0];
            var options = {
                history: false,
                focus: false,
                showAnimationDuration: 0,
                hideAnimationDuration: 0,
                index: photoindex
            };
            var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, arr2, options);
            gallery.init();
        };
        init();
    }]);
})(angular);
