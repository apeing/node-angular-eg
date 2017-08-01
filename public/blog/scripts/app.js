(function(angular){
    'use strict';
    angular.module('mainblog',['ngRoute'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/t1', {
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