'use strict';

angular.module('docready')
  .controller('ExportCtrl', function ($scope, symptomService) {
    $scope.symptoms = symptomService.symptoms;
  });
