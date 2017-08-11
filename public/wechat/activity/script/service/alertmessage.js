/**
 * Created by Administrator on 2017/8/11.
 */
(function (angular){
    'use strict';
    angular.module('activity').factory('alertMessageService', ['$rootScope', '$timeout', function($rootScope,$timeout) {
        $rootScope.showAlertMessageBtn=false;
        $rootScope.alertMessage = '';
        return {
            addAlert: function(msg, delayTime){
                $rootScope.alertMessage = msg;
                var time=delayTime || 3000;
                $rootScope.showAlertMessageBtn=true;
                var timer=$timeout(function () {
                    $rootScope.showAlertMessageBtn=false;
                    $rootScope.alertMessage = '';
                    $timeout.cancel(timer);
                }, time);
            }
        };
    }]);
})(angular);