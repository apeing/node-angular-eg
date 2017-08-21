/**
 * Created by Administrator on 2017/8/17.
 */
(function(angular){
    'use strict';
    angular.module('activity').directive('wxImg',['$scope' ,function($scope){
            return {
                restrict:'E',
                replace :true,
                template:'<img src="">',
                link: function(scope, elem, attr) {
                    $scope.$watch('per',function(nowVal){
                        elem.attr('src',nowVal);
                    })
                }
            };
}]);})(angular);