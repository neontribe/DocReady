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
      $('#picker-region').removeAttr('aria-live');
      $timeout(function() {
        $('#picker-region').focus();
        $('#picker-region').attr('aria-live', 'assertive');
      }, 500);
    };
	

	  $scope.grid = true;
  });
  
  // SOme jQuery to make it more accessible. Define "ugly" :-P
  
  $('body').on('focus', 'input[type="checkbox"]', function() {
	$(this).parents('label').css('background', '#FEF5DA');
  });
  $('body').on('blur', 'input[type="checkbox"]', function() {
	$(this).parents('label').css('background', '#fff');
  });  