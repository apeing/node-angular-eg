(function(angular){
    'use strict';
    angular.module('mainblog',['ngRoute', 'ui.bootstrap', 'ngCookies'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/',{
                templateUrl: 'view/home.html'
            }).when('/t1', {
                templateUrl: 'view/1.html',
				controller: 't1Controller'
            }).when('/t2', {
				templateUrl: 'view/2.html'
			}).otherwise({
                redirectTo: '/'
            });
        }]).run(['$rootScope', '$window', function($rootScope, $window) {

    }]);
})(angular);