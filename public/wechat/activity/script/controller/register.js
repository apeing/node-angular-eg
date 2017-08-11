/**
 * Created by Administrator on 2017/8/11.
 */
(function(angular){
    'use strict';
    angular.module('activity').controller('RegisterController',
        ['$scope', '$window', '$http', '$location', 'confirmMessageService', function($scope, $window,$http,$location,confirmMessageService){
            $scope.save = function(){
                if(!$scope.mobile)
                   return confirmMessageService.addAlert({title:'',msg:'没有输入手机号',btnText:''});
                if(!$scope.password)
                   return confirmMessageService.addAlert({title:'',msg:'没有输入密码',btnText:''});
                if($scope.password !== $scope.repassword)
                   return confirmMessageService.addAlert({title:'',msg:'请确认密码',btnText:''});
                $http.post('/wechat/register',{'mobile': $scope.mobile, 'password':$scope.password}).then(function successFn() {
                    confirmMessageService.addAlert({title:'',msg:'注册成功',btnText:''});
                    $location.path('/login').replace();
                }, function errorFn() {
                    confirmMessageService.addAlert({title:'',msg:'用户名或密码错误',btnText:''});
                });
                //function(response){
                //    console.log("response : " + response.status);
                //    if(response.status === 200) return $location.path('/index').replace();
                //    if(response.status === 400)
                //        confirmMessageService.addAlert({title:'',msg:'用户名或密码错误',btnText:''});
                //});
            };
            function init(){
                $window.document.title = '登录页面';
            }

            init();
        }]);
})(angular);