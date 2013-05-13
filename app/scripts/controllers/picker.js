'use strict';

angular.module('docready')
  .controller('PickerCtrl', function ($scope, symptomService, $routeParams) {
    $scope.activeTag = $routeParams.tag || null;
    $scope.symptoms = symptomService.symptoms;
    $scope.tags = symptomService.tags;

    $scope.hasActiveTag = function(symptom){
        return _.contains(symptom.tags, $scope.activeTag);
    };
  });
