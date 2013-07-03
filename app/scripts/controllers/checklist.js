'use strict';

angular.module('docready')
  .controller('ChecklistCtrl', function ($scope, symptomService) {
    $scope.selections = symptomService.selections;
    $scope.deselect = function(symptom) {
      symptomService.toggle(symptom);
    };
  });
