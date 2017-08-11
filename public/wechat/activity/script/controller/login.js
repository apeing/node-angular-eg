(function(angular){
    'use strict';
    angular.module('activity').controller('loginController',
    ['$scope', '$window', '$http', '$location', 'confirmMessageService', function($scope, $window,$http,$location,confirmMessageService){
        $scope.verify = function(){
            if(!$scope.mobile)
               return confirmMessageService.addAlert({title:'',msg:'没有输入手机号',btnText:''});
            if(!$scope.password)
               return confirmMessageService.addAlert({title:'',msg:'没有输入密码',btnText:''});
            $http.post('/wechat/load',{'mobile': $scope.mobile, 'password':$scope.password}).then(function successFn() {
                $location.path('/index').replace();
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
