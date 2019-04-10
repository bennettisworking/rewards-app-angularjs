'use strict';
/**
 * @ngdoc function
 * @name demoApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the demoApp
 */
angular.module('demoApp')
.controller('CardCtrl', ['$scope', 'pathService', 'dataService', 'cardService', function($scope, pathService, dataService, cardService) {
  //$('#cardModal').modal('toggle');
  //$scope.cid = cardService.cid;
  dataService.getCardById(cardService.getModalId()).then(function(r) { //get user data
    $scope.card = r.data;
    $scope.markRead = function() {
      var data = {
        'isRead': true
      };
      dataService.readCard($scope.card.cardId, data).then(function() {
        //getCardData();
      });
    };
    $scope.markRead(); // FIX THIS
  });
}])
.controller('GalleryCtrl', ['$scope', 'dataService', 'loginService', '$routeParams', 'cardService', 'Popeye', '$timeout', function($scope, dataService, loginService, $routeParams, cardService, Popeye, $timeout) {
  $scope.sentReceived = false;
  var thisUser = $routeParams.id || loginService.userId;
  function getCardData() {
    $scope.phrase = ($scope.sentReceived) ? 'sent' : 'received';
    dataService.getUser(thisUser).then(function(r) { //get user data
      $scope.user = r.data;
      dataService.getCards(thisUser, $scope.phrase, $scope.user.totalCardsReceived, 0).then(function(r) {
        $scope.cards = angular.copy(r.data.cards);
        console.log($scope.cards);
      });
    });
  }
  getCardData();
  $scope.$watch('sentReceived', function(newValue, oldValue) {
    console.log(oldValue, newValue);
    getCardData();
  });

  function modal() {
    Popeye.openModal({
      templateUrl: '/views/cardmodal.html',
      containerTemplate: null,
      containerTemplateUrl: '/views/modal-container.html',
      controller: 'CardCtrl as ctrl',
    });
  }
  $scope.popCard = function(id) {
    cardService.setModalId(id);
    modal(id);
    $timeout(getCardData, 1000);
  };
}]);