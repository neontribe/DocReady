'use strict';

angular.module('docready')
  .controller('ChecklistCtrl', function ($scope, symptomService, settings, supplementary_content, Analytics, $location) {
    $scope.selections = symptomService.selections;
    $scope.touch = settings.touch;
    $scope.supplementary = supplementary_content;
    $scope.deselect = function(symptom) {
      symptomService.toggle(symptom);
    };

    $scope.track = _.debounce(function(type){
      Analytics.trackPage($location.path() + '/' + type);
    }, 3000);
  });
