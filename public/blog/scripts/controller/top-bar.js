/**
 * Created by Administrator on 2017/8/4.
 */
(function(angular){
    'use strict';
    angular.module('mainblog')
        .controller('topBarController', ['$scope', '$cookies', '$window', '$location', '$http', function($scope, $cookies, $window, $location, $http){
            $scope.logout = function(){
            //    $cookies.remove('token');
                $window.location.href = '/cookies.html';
            };
            $scope.setUser = function(){
          //      console.log(" location : " + $location.path());
            };

            function init(){
                $http.get('/blog/user').then(function successFn(response){
                    $scope.username = response && response.data && response.data.username;
                }, function errorFn(response){
                    if (response.status === 401) return $window.location.replace('login.html?returnUrl=' + encodeURIComponent($location.path()));
                });
            }
            init();
        }]);
})(angular);
