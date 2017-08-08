/**
 * Created by Administrator on 2017/8/4.
 */
angular.module('mainblog').factory('alertService', ['$rootScope', function($rootScope) {
    'use strict';
    $rootScope.alerts = [];
    $rootScope.closeAlert = function(index){
        $rootScope.alerts.splice(index);
    };
    return {
        addSuccess: function (msg, delayTime){
            $rootScope.alerts.push({'type': 'success', 'msg': msg, delayTime: delayTime || 3000});
        },
        addError: function (msg, delayTime){
            $rootScope.alerts.push({'type': 'danger', 'msg': msg, delayTime: delayTime || 3000});
        },
        closeAlert: function (index){
            $rootScope.alerts.splice(index);
        }
    };
}]);