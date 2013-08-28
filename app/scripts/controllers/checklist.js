'use strict';

angular.module('docready')
  .controller('ChecklistCtrl', function ($scope, symptomService, settings) {
    $scope.selections = symptomService.selections;
    $scope.touch = settings.touch;
    $scope.deselect = function(symptom) {
      symptomService.toggle(symptom);
    };
  });
