/**
 * Created by Administrator on 2017/8/11.
 */
(function (angular){
    'use strict';
    angular.module('activity').factory('confirmMessageService', ['$rootScope', function($rootScope) {
        $rootScope.showConfirmMessageBtn = false;
        return {
            addAlert: function(json){
                $rootScope.confirmTitle = json.title || '友情提示';
                $rootScope.confirmMessage = json.msg || '';
                $rootScope.confirmBtnText = json.btnText || '我知道了';
                $rootScope.showConfirmMessageBtn = true;
            }
        };
    }]);
})(angular);