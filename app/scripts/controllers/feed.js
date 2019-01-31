'use strict';
/**
 * @ngdoc function
 * @name demoApp.controller:feedCtrl
 * @description
 * # feedCtrl
 * Feed controller
 */
angular.module('demoApp')
	//.controller('feedCtrl', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {
	.controller('feedCtrl', ['$scope', 'pathService', 'dataService', '$location', '$timeout', 'ngAudio', function($scope, pathService, dataService, $location, $timeout, ngAudio) {
		$scope.imagepath = pathService.imagepath;
		$scope.usericonpath = pathService.usericonpath;
		(function getFeed() {
			dataService.getFeed().then(function(r) {
				if (!angular.equals(r.data, $scope.feedcopy)) {
					$scope.ding();
					$scope.feed = r.data;
					$scope.feedcopy = angular.copy(r.data);
					angular.forEach($scope.feed, function(value) {
						//console.log(value.cardId);
						if (value.cardId !== null) {
							dataService.getCardById(value.cardId).then(function(r) {
								value.cardMessage = r.data.message;
								//console.log(r.data.message);
							});
						}
					});
					console.log($scope.feed);
				}
				$timeout(getFeed, 10000);
			});
		})();
		$scope.htmlToPlaintext = function(text) {
			return text ? String(text).replace(/<[^>]+>/gm, '') : '';
		};
		$scope.ding = function() {
			//console.log('ding');
			$scope.sound = ngAudio.load('audio/bell.mp3'); // returns NgAudioObject
			$scope.sound.play();
		};
	}]);