'use strict';

angular.module('docready')
  .controller('PickerCtrl', function ($scope, symptomService, $routeParams, $location, $timeout, settings) {
    $scope.activeTag = $routeParams.tag;
    $scope.symptomService = symptomService;
    $scope.symptoms = symptomService.symptoms;
    $scope.tags = [];
    $scope.settings = settings;

    $scope.$watch('symptoms', function(newVal){
      // optimization due here apply a timeout to prevent population of the tags 'till the view has transitioned into view
      // Nesing animations at the same time with ng-animate seems to fail'
      $timeout(function(){
        $scope.$apply(function(){
          var rawTags = _.uniq(_.union.apply(null, _.pluck(newVal, 'tags')));
          $scope.tags = _.map(rawTags, function(tag){
            return { text: tag };
          });
        });
      }, 1100);
    });

    $scope.hasActiveTag = function(symptom){
      return _.contains(symptom.tags, $scope.activeTag);
    };
	  $scope.grid = false;
  });
