'use strict';
/**
 * @ngdoc function
 * @name demoApp.controller:SendCardCtrl
 * @description
 * # SendCardCtrl
 * Controller of the demoApp
 */
angular.module('demoApp')
.controller('SendCardCtrl', ['$scope', 'pathService', 'dataService', 'loginService', 'cardService', 'Popeye', '$location', 'slackService', function($scope, pathService, dataService, loginService, cardService, Popeye, $location, slackService) {
	var thisUser = loginService.userId;
	dataService.getCoreValueTypes().then(function(r) {
		$scope.coreValues = r.data;
		$scope.card = {};
		$scope.card.SenderUserId = thisUser;
		$scope.card.ReceiverUserId = 2;
		$scope.card.CoreValueTypeId = 1;
		$scope.card.NumCoins = 500;
		$scope.card.Message = '';
		$scope.card.IsFromAdmin = false;
		// $scope.card.AdminContainerId=null;
		$scope.sendCard = function(obj) {
			console.log(obj);
			dataService.sendCard(obj).success(function(data) {
				slackService.postSentCard(data);
				cardService.setModalId(data.cardId);
				modal(data.cardId);
				$location.path('gallery');
			});
		};
		var modal = function() {
			Popeye.openModal({
				templateUrl: '/views/cardmodal.html',
				containerTemplate: null,
				containerTemplateUrl: '/views/modal-container.html',
				controller: 'CardCtrl as ctrl',
			});
		};
	});
}]);