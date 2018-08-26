'use strict';

/**
 * @ngdoc function
 * @name demoApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the demoApp
 */
angular.module('demoApp')
  .controller('UserCtrl', ['$scope', 'pathService', 'dataService', 'loginService', '$routeParams', 'Popeye', 'cardService', function ($scope, pathService, dataService, loginService, $routeParams, Popeye, cardService) {
  	var thisUser = $routeParams.id || loginService.userId;

  	$scope.imagepath = pathService.imagepath;
  	dataService.getUser(thisUser).then(function (r) { //get user data
                $scope.user = r.data;
                $scope.deptIcon = r.data.department.imageUrl;
                $scope.levelIcon = r.data.level.imageUrl;
            });
  	dataService.getCardSummary(thisUser).then(function (r) {
                $scope.userSummary = r.data; //main summary data
                $scope.coreScores = [];
                for(var c=0; c < $scope.userSummary.coreValueTypeCoinBreakdown.length; c++){ // loop through breakdown for each core value
                	$scope.coreScores[c]={};
                	$scope.coreScores[c].coins = $scope.userSummary.coreValueTypeCoinBreakdown[c].totalCoinsReceived;
                	$scope.coreScores[c].cards = $scope.userSummary.coreValueTypeCoinBreakdown[c].totalCardsReceived;
                	$scope.coreScores[c].coreValueName = $scope.userSummary.coreValueTypeCoinBreakdown[c].coreValueType.coreValueName;
                	$scope.coreScores[c].coreValueImage = $scope.userSummary.coreValueTypeCoinBreakdown[c].coreValueType.coreValueTypeImageUrl;
                	$scope.coreScores[c].coreValueId = $scope.userSummary.coreValueTypeCoinBreakdown[c].coreValueType.coreValueTypeId;
                	$scope.coreScores[c].flagHeight = 30-Math.floor(($scope.userSummary.coreValueTypeCoinBreakdown[c].totalCoinsReceived/$scope.userSummary.totalCoinsReceived)*30);

                }
                 dataService.getCards(thisUser, 'received', 5, 0).then(function (r) {
					$scope.cards=angular.copy(r.data.cards);
					console.log($scope.cards);
				});
            $scope.data = [ // coins chart
	            {
	                key: '',
	                y: $scope.userSummary.coinPercentile
	            },
	            {
	                key: '',
	                y: 100-$scope.userSummary.coinPercentile
	            }
        	];
        	$scope.data2 = [ //cards chart
	            {
	                key: '',
	                y: $scope.userSummary.cardPercentile
	            },
	            {
	                key: '',
	                y: 100-$scope.userSummary.cardPercentile
	            }
        	];
   		});

function modal (){
	  	Popeye.openModal({
      	templateUrl: '/views/cardmodal.html',
      	containerTemplate: null,
      	containerTemplateUrl: '/views/modal-container.html',
      	controller: 'CardCtrl as ctrl',
    	});
	  }

	  $scope.popCard=function(id){
	  	cardService.setModalId(id);
	    modal(id);
	    
	  };


		$scope.options = {  // general chart options
		            chart: {
		                type: 'pieChart',
		                height: 205,
		                donut: true,
		                x: function(d){return d.key;},
		                y: function(d){return d.y;},
		                showLabels: false,

		                pie: {
		                    startAngle: function(d) { return d.startAngle/2 -Math.PI/2;},
		                    endAngle: function(d) { return d.endAngle/2 -Math.PI/2; }
		                },
		                duration: 500,
		                legend: {
		                    margin: {
		                        top: 5,
		                        right: 70,
		                        bottom: 5,
		                        left: 0
		                    }
		                }
		            }
		        };

		}]);
