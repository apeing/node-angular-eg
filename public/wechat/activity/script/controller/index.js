(function(angular){
    'use strict';
    angular.module('activity').controller('indexController',
    ['$scope', '$location', '$http', '$cookies', '$window','$qupload','$log',
    function($scope, $location, $http, $cookies, $window,$qupload,$log){
        //function getUnionId(){
        //    $window.location.replace('http://www.baidu.com');
        //}
        $scope.selectFiles = [];
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
            $http.get('/wechat/user').then(function successFn(response){
                $scope.mobile = response && response.data && response.data.mobile;
            }, function errorFn(response){
                if (response.status === 401) return $window.location.replace('index.html#/login?returnUrl=' + encodeURIComponent($location.path()));
            });
        }
        init();
    }]);
})(angular);
