'use strict';
/**
 * @ngdoc function
 * @name demoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the demoApp
 */
angular.module('demoApp')
.controller('MainCtrl', function() {})
.controller('headerCtrl', ['$scope', 'pathService', 'dataService', 'loginService', '$location', function($scope, pathService, dataService, loginService, $location) {
  var thisUser = loginService.userId;
  $scope.searchSelect = {}; //autocomplete uses this to select a user
  dataService.getAllUsers().then(function(r) {
    $scope.allUsers = r.data;
  });
  $scope.goToUser = function(u) {
    $location.path('profile').search({
      id: u.originalObject.userId
    });
  };
  $scope.imagepath = pathService.imagepath;
  dataService.getUser(thisUser).then(function(r) { //get user data
    $scope.user = r.data;
  });
}]);