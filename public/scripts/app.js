'use strict';

/**
 * @ngdoc function
 * @name qiniuUploadApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the qiniuUploadApp
 */
angular.module('qiniuUploadApp', ['angularQFileUpload', 'LocalStorageModule'])
	.controller('MainCtrl', function ($scope, $log, $qupload) {

		$scope.selectFiles = [];

		var start = function (index) {
			$scope.selectFiles[index].progress = {
				p: 0
			};
			console.log("start");
			console.log("key : " + $scope.selectFiles[index].file.name);
			$scope.selectFiles[index].upload = $qupload.upload({
				key: 'test/' + $scope.selectFiles[index].file.name,
				file: $scope.selectFiles[index].file,
				token: 'TXXu7FXig6oU1gLNMGERucvQvYjMvoKKQs_WQjqe:2MDqOC9M9UNnjU9HF0KVBd1VGk4=:eyJzY29wZSI6InRlc3QiLCJkZWFkbGluZSI6MTUwMjE3MjkwM30='
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
			var offsetx = $scope.selectFiles.length;
			for (var i = 0; i < $files.length; i++) {
				$scope.selectFiles[i + offsetx] = {
					file: $files[i]
				};
				start(i + offsetx);
			}
		};
	});