/**
 * Created by Administrator on 2017/8/18.
 */
(function(angular){
    'use strict';
    angular.module('activity').controller('unionidloginController',
        ['$scope', '$location', '$http', '$window', 'confirmMessageService', 'queryParameterService',
            function($scope, $location, $http, $window, confirmMessageService, queryParameterService){
                function getUnionId(){
                    $window.location.replace( 'http://5307c5e1.nat123.net/signature/authorize/advanced?requestUrl=' + encodeURIComponent($window.location.href));
                }

                function init(){
                    var unionid = queryParameterService.getQueryParamByName('unionid');
                    if(!unionid) return getUnionId();
                    var str = "unionid : " + unionid;
                    confirmMessageService.addAlert({title:'',msg:str,btnText:''});
                }

                init();
            }]);
})(angular);
