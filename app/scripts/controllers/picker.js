'use strict';

angular.module('docready')
  .controller('PickerCtrl', function ($scope, symptomService, $routeParams, $location, userData) {
    $scope.activeTag = $routeParams.tag || null;
    $scope.path = $location.path;

    $scope.activateTag = function(tag){
      $scope.activeSymptoms = _.filter($scope.symptoms, function(v){
        return _.contains(v.tags, tag);
      });

    };

    $scope.symptoms = symptomService.symptoms;

    $scope.go = function(path){
      $location.path(path);
    };

    $scope.userData = userData;

    $scope.select = function(symptom) {
      console.log(symptom.selected);
      if (symptom.selected) {
        $scope.userData.checklist.push(symptom);
      }
      $scope.userData.checklist.push('test');
      console.log(userData);
    };
  });
