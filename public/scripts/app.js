'use strict';

/**
 * @ngdoc function
 * @name qiniuUploadApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the qiniuUploadApp
 */
angular.module('qiniuUploadApp', ['angularQFileUpload', 'LocalStorageModule'])
	.controller('MainCtrl', function ($scope, $log, $qupload,$http) {

		$scope.selectFiles = [];
		var uploadtoken = '';

		var start = function (index) {
			$scope.selectFiles[index].progress = {
				p: 0
			};
			console.log("start");
			console.log("key : " + $scope.selectFiles[index].file.name);
			$scope.selectFiles[index].upload = $qupload.upload({
				key: 'test/' + $scope.selectFiles[index].file.name,
				file: $scope.selectFiles[index].file,
				token: uploadtoken
			});
			console.log("end");
			$scope.selectFiles[index].upload.then(function (response) {
				$log.info(response);
			}, function (response) {
				$log.info(response);
			}, function (evt) {
				$scope.selectFiles[index].progress.p = Math.floor(100 * evt.loaded / evt.totalSize);
			});
		};

		$scope.abort = function (index) {
			$scope.selectFiles[index].upload.abort();
			$scope.selectFiles.splice(index, 1);
		};

		$scope.onFileSelect = function ($files) {
			$http.get('/qupload').then(function successFn(response){
				uploadtoken = response && response.data && response.data.token;
				var offsetx = $scope.selectFiles.length;
				for (var i = 0; i < $files.length; i++) {
					$scope.selectFiles[i + offsetx] = {
						file: $files[i]
					};
					start(i + offsetx);
				}
			}, function errorFn(response){
			});
		};
	});