/**
 * Created by Administrator on 2017/8/4.
 */
(function(angular){
    'use strict';
    angular.module('mainblog')
        .controller('topBarController', ['$scope', '$cookies', '$window', '$location', '$http', function($scope, $cookies, $window, $location, $http){
            $scope.logout = function(){
                console.log("fdsad");
            //    $cookies.remove('token');
                $window.location.href = '/cookies.html';
            };
            $scope.setUser = function(){
          //      console.log(" location : " + $location.path());
                $cookies.put('token',null);
            };
            $scope.getUser2 = function(){
                console.log("deo : " + $cookies.get('deo'));
                console.log("token : " + $cookies.get('token'));
            };
            $scope.delUser2 = function(){
                $cookies.remove('deo');
                $cookies.remove('token');
            };
            function init(){
                $cookies.put('deo','lxl123');
                $http.get('/user').then(function successFn(response){
                    $scope.username = response && response.data && response.data.username;
                }, function errorFn(response){
                    if (response.status === 401) return $window.location.replace('login.html?returnUrl=' + encodeURIComponent($location.path()));
                });
            }
            init();
        }]);
})(angular);
