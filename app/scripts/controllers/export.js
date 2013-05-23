'use strict';

angular.module('docready')
  .controller('ExportCtrl', function ($scope, symptomService, $window) {
    $scope.symptoms = symptomService.symptoms;
    $scope.print = function(){
      $window.print();
    };
  });
