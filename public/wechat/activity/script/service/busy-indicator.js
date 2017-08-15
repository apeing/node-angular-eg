/**
 * Created by Administrator on 2017/8/14.
 */
(function (angular){
    'use strict';
    angular.module('activity').factory('busyIndicatorService', ['$rootScope', function($rootScope) {
        return {
            showBusyIndicator: function(){
                $rootScope.isBusy = true;
            },
            hideBusyIndicator: function(){
                $rootScope.isBusy = false;
            }
        };
    }]);
})(angular);