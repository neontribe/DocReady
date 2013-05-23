'use strict';

angular.module('docready')
  .controller('ExportCtrl', function ($scope, symptomService, $window) {
    $scope.symptoms = symptomService.symptoms;
    $scope.prepareMail = function(){
      $scope.email = {
        recipient: '',
        checklist: _.chain($scope.symptoms).where({selected: true}).pluck('title').value()
      };
    };
    $scope.sendEmail = function(){
      console.log($scope.email);
    };
    $scope.print = function(){
      $window.print();
    };
  });
