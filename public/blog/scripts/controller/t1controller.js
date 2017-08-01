(function(angular){
    'use strict';
    angular.module('mainblog').controller('t1Controller',
        ['$scope', '$window', function($scope, $window){
            function init(){
                console.log("local : " + $window.location.href);
            }
            init();
        }]);
})(angular);