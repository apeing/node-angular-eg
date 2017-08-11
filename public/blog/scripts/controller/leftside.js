/**
 * Created by Administrator on 2017/8/10.
 */
(function(angular){
    'use strict';
    angular.module('mainblog')
        .controller('leftSidebarController', ['$scope', '$cookies', '$http', '$location', 'alertService', '$window', function($scope, $cookies, $http, $location, alertService, $window){
            const leftSidebarItems = [
                {
                    'name':'管理员',
                    'auth': 'admin',
                    'iconClass':'glyphicon-user',
                    'list':[
                        {'title':'管理员列表','path':'/user/list'}
                    ]
                },
                {
                    'name':'前端',
                    'auth': 'organization',
                    'iconClass':'glyphicon-tower',
                    'list':[
                        {'title':'angularjs','path':'/kindergarten/list'},
                        {'title':'jequry','path':'/people/list'}
                    ]
                },
                {
                    'name':'后端',
                    'auth': 'flower',
                    'iconClass':'glyphicon-asterisk',
                    'list':[
                        {'title':'nodejs','path':'/flower-points/product-list'},
                        {'title':'javaspring','path':'/flower-points/order-list'},
                        {'title':'.net','path':'/flower-points/banner-list'}
                    ]
                },
                {
                    'name':'杂谈',
                    'auth': 'discovery',
                    'iconClass':'glyphicon-th-large',
                    'list':[
                        {'title':'科技','path':'/discovery-mall/product/list'},
                        {'title':'农业','path':'/discovery-mall/order/list'},
                        {'title':'金融','path':'/discovery-mall/vendor/list'}
                    ]
                }
            ];

            $scope.showItem = function(menuItem, index){
                $location.path(menuItem.list[index].path);
            };

            function init(){
                $scope.menuList = [];
                //获取登录用户信息
                $http.get('/api/user').then(function successFn(response){
                    var authorizations = response && response.data && response.data.authorization;
                    $window._.uniq(authorizations).forEach(function(auth){
                        var item = $window._.find(leftSidebarItems, {'auth':auth});
                        if (item) $scope.menuList.push(item);
                    });
                }, function errorFn(response){
                    alertService.addError(response.data.message);
                });
            }
            init();
        }]);
})(angular);
