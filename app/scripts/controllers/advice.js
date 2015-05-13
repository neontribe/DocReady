'use strict';

angular.module('docready')
  .controller('AdviceCtrl', function ($scope, adviceService, $routeParams, $location) {
    // Process income advice item/topic data
    function initData(data, type) {
      if ($routeParams[type]) {
        // Set the active entry, if any
        $scope[type] = _.findWhere(data, {slug: $routeParams[type]});
      }
      return data;
    }

    $scope.topics = initData(adviceService.topics, 'topic');
    $scope.items = initData(adviceService.items, 'item');

    $scope.setItem = function(slug) {
      $location.search('item', slug);
    };

    $scope.setTopic = function(slug) {
      $location.search('topic', slug);
    };

  });


