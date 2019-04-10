'use strict';
/**
 * @ngdoc function
 * @name demoApp.controller:ScoreboardCtrl
 * @description
 * # AboutCtrl
 * Controller of the demoApp
 */
angular.module('demoApp')
.controller('ScoreboardCtrl', ['$scope', 'pathService', 'dataService', function($scope, pathService, dataService) {
  $scope.usericonpath = pathService.usericonpath;
  dataService.getScoreboardTypes().then(function(r) {
    $scope.boardTypes = r.data;
    $scope.bottomBoardTypes = $scope.boardTypes.slice(6);
    var limit = 5;
    angular.forEach($scope.boardTypes, function(value, i) {
      //console.log(value.scoreboardTypeName);
      var id = value.scoreboardTypeId;
      if (i > -1 && i < 2) {
        limit = 10;
      } else {
        limit = 5;
      }
      dataService.getScoreboardData(id, limit).then(function(r) {
        value.scoreboardData = r.data;
        //console.log(value.scoreboardData.scoreboardEntries);
      });
    });
  });
}]);