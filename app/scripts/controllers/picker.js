'use strict';

angular.module('docready')
  .controller('PickerCtrl', function ($scope, symptomService, symptomTagService, $routeParams, $timeout, settings) {
    $scope.activeTag = $routeParams.tag;
    $scope.symptomService = symptomService;
    $scope.symptoms = symptomService.symptoms;
    $scope.tags = [];

    // Apply the data late to get fade-in anims
    $scope.tags = symptomTagService.symptomTags;

    $scope.settings = settings;

    $scope.hasActiveTag = function(symptom){
      return _.contains(symptom.tags, $scope.activeTag);
    };

    $scope.focusTitle = function() {
      $timeout(function() {
        $('#picker-region').focus();
      }, 500);
    };

    $scope.grid = true;
  });