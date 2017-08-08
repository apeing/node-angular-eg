(function(angular){
    'use strict';
    angular.module('mainblog').controller('t1Controller',
        ['$scope', '$window', 'alertService', function($scope, $window,alertService){
            $scope.submitBtn = function(){
                console.log("submitbtn");
                alertService.addSuccess('submitbtn ok');
            };
            function init(){
                console.log("local : " + $window.location.href);
            }
            init();
        }]);
})(angular);