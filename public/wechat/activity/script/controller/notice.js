(function(angular){
    'use strict';
    angular.module('activity')
    .controller('noticeController', ['$scope', '$window', function($scope, $window){
        $scope.goToPrevPage = function(){
            $window.history.go(-1);
        };
        function init(){
            $window.document.title = '报名须知';
        }
        init();
    }]);
})(angular);
