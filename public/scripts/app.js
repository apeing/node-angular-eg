'use strict';

/**
 * @ngdoc function
 * @name qiniuUploadApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the qiniuUploadApp
 */
angular.module('qiniuUploadApp', ['angularQFileUpload', 'LocalStorageModule'])
	.controller('MainCtrl', ['$scope','$log','$qupload','$http','qrCodeService',function ($scope, $log, $qupload,$http,qrCodeService) {

		$scope.selectFiles = [];
		var uploadtoken = '';

		var start = function (index) {
			$scope.selectFiles[index].progress = {
				p: 0
			};
			$scope.selectFiles[index].upload = $qupload.upload({
				key: 'test/' + $scope.selectFiles[index].file.name,
				file: $scope.selectFiles[index].file,
				token: uploadtoken
			});

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
			$http.get('/api/qupload').then(function successFn(response){
				uploadtoken = response && response.data && response.data.token;
				var offsetx = $scope.selectFiles.length;
				for (var i = 0; i < $files.length; i++) {
					$scope.selectFiles[i + offsetx] = {
						file: $files[i]
					};
					start(i + offsetx);
				}
			}, function errorFn(){
			});
		};

		$scope.downloadQRCode = function(){
			qrCodeService.downloadPNG({ text: 'http://www.baidu.com', fileName: '百度搜索' + '.png' });
		};
	}]);