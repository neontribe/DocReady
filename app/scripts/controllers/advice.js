'use strict';

angular.module('docready')
  .controller('AdviceCtrl', function ($scope, adviceService, $routeParams, $location) {
    $scope.activeTopic = null;
    adviceService.topics.$then(function(data){
      $scope.topics = data.resource;
      $scope.setActiveTopic();
    });
    $scope.activeItem = null;
    adviceService.items.$then(function(data){
      $scope.items = data.resource;
      $scope.initialItem();
    });

    $scope.setActiveTopic = function(topic) {
      if (topic) {
        $scope.activeTopic = topic;
      } else {
        if ($routeParams.topic) {
          $scope.activeTopic = _.findWhere($scope.topics, {slug: $routeParams.topic});
        } else {
          $scope.activeTopic = $scope.topics[0];
        }
      }
      $location.search('topic', $scope.activeTopic.slug);
    };

    $scope.initialItem = function() {
      if ($routeParams.item) {
        $scope.activeItem = _.findWhere($scope.items, {slug: $routeParams.item});
        // since we're directly addressing an item we'll move it to the top of the list!
        $scope.elevateItem($scope.activeItem);
      }
    };

    $scope.setItem = function(slug) {
      $location.search('item', slug);
    };

    $scope.elevateItem = function(item) {
      var index, sp;
      index = _.indexOf($scope.items, item);
      if (item && index !== -1) {
        sp = $scope.items.splice(index, 1);
        $scope.items.unshift(sp[0]);
      }
    };
  });


