(function(angular){
    'use strict';
    angular.module('activity').controller('indexController',
    ['$scope', '$location', '$http', '$cookies', '$window','$qupload','$log','cities',
    function($scope, $location, $http, $cookies, $window,$qupload,$log,cities){
        //function getUnionId(){
        //    $window.location.replace('http://www.baidu.com');
        //}
        $scope.selectFiles = [];
        $scope.pictures = [];
        var uploadtoken = '';
        var start = function (index) {
            $scope.selectFiles[index].progress = {
                p: 0
            };
            $scope.selectFiles[index].upload = $qupload.upload({
                key: 'test/' + $scope.selectFiles[index].file.name,
                file: $scope.selectFiles[index].file,
                token: uploadtoken
            });

            $scope.selectFiles[index].upload.then(function (response) {
                $log.info(response);
            }, function (response) {
                $log.info(response);
            }, function (evt) {
                $scope.selectFiles[index].progress.p = Math.floor(100 * evt.loaded / evt.totalSize);
            });
        };

        $scope.abort = function (index) {
            $scope.selectFiles[index].upload.abort();
            $scope.selectFiles.splice(index, 1);
        };
        $scope.uploadpic = function(){
            $location.path('/picture').replace();
        };
        $scope.sdkpic = function(){
            $window.wx.chooseImage({
                success: function (res) {
                    $scope.pictures = res.localIds;
                    console.log('localIds : ' + $scope.pictures);
                    alert('已选择 ' + res.localIds[0] + ' 张图片');
                }
            });
        };
        $scope.reout = function(){
            $cookies.remove('token');
            $location.path('/login').replace();
        };
        $scope.onFileSelect = function ($files) {
            $http.get('/qupload').then(function successFn(response){
                uploadtoken = response && response.data && response.data.token;
                var offsetx = $scope.selectFiles.length;
                for (var i = 0; i < $files.length; i++) {
                    $scope.selectFiles[i + offsetx] = {
                        file: $files[i]
                    };
                    start(i + offsetx);
                }
            }, function errorFn(){
            });
        };
        function init(){
            //var unionid = queryParameterService.getQueryParamByName('unionid');
            //if(!unionid) return getUnionId();
         //   $scope.pictures = ['wxlocalresource://imageid123456789987654321','wxlocalresource://imageid123456789987654322'];
            console.log('cities : ' + cities[0].cityCode);
            $http.get('/wechat/user').then(function successFn(response){
                $scope.mobile = response && response.data && response.data.mobile;
            }, function errorFn(response){
                if (response.status === 401) return $window.location.replace('index.html#/login?returnUrl=' + encodeURIComponent($location.path()));
            });
        }
        init();
    }]);
})(angular);
