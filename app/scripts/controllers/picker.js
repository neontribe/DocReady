'use strict';

angular.module('docready')
  .controller('PickerCtrl', function ($scope, symptomService, $resource, $routeParams, $timeout, settings) {
    $scope.activeTag = $routeParams.tag;
    $scope.symptomService = symptomService;
    $scope.symptoms = symptomService.symptoms;

    $scope.tags = [];
    $resource(settings.apiRoot + '/symptom_tag').query({}, function(data){
      $timeout(function(){
        $scope.$apply(function(){
          $scope.tags = data;
        });
      }, 1100);
    });
    $scope.settings = settings;

    $scope.hasActiveTag = function(symptom){
      return _.contains(symptom.tags, $scope.activeTag);
    };
	
	$scope.focusTitle = function() {
		$timeout(function() { 
			$('#symptom-title').focus();
			//console.log('title focus');
		}, 1000);
	}
	
	$scope.focusSymptoms = function() {
		$timeout(function() { 
			$('#symptom-title').attr('aria-live', 'assertive');
			$('#symptom-title').focus();
			//console.log('title focus');
		}, 1000);
	}

	  $scope.grid = true;
  });
