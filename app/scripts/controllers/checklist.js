'use strict';

angular.module('docready')
  .controller('ChecklistCtrl', function ($scope, symptomService) {
    $scope.symptoms = symptomService.symptoms;
  });
