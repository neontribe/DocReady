'use strict';

angular.module('docready')
  .controller('PickerCtrl', function ($scope, symptomService, $routeParams, $location, settings) {
    $scope.activeTag = $routeParams.tag;
    $scope.symptomService = symptomService;
    $scope.symptoms = symptomService.symptoms;
    $scope.tags = [];
    $scope.settings = settings;

    $scope.cloudConfig = {
      font: 'Roboto',
      colors: ['#f4bcaa', '#f09f86', '#eb7f5d', '#e86f49', '#e65f35']
    };

    $scope.$watch('symptoms', function(newVal){
      // optimization due here
      var rawTags = _.uniq(_.union.apply(null, _.pluck(newVal, 'tags')));
      $scope.tags = _.map(rawTags, function(tag){
        return { text: tag, count: $scope.countForTag(tag) };
      });
    }, true);

    $scope.hasActiveTag = function(symptom){
        return _.contains(symptom.tags, $scope.activeTag);
      };

    $scope.showTag = function(tag) {
      $location.path('/tool/picker/' + tag);
      $scope.$apply();
    };

    $scope.countForTag = function(tag){
      return _.size(_.filter($scope.symptoms, function(symptom){
        return _.contains(symptom.tags, tag) && symptom.selected;
      }));
    };
  });
