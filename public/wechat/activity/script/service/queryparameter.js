/**
 * Created by Administrator on 2017/8/11.
 */
(function (angular){
    'use strict';
    angular.module('activity').factory('queryParameterService', ['$window', function($window) {
        return {
            getQueryParamByName: function(name){
                name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
                var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
                    results = regex.exec($window.location.search);
                return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
            }
        };
    }]);
})(angular);