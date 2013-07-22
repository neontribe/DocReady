'use strict';

angular.module('docready')
  .controller('AdviceCtrl', function ($scope, adviceService, $routeParams, $location) {
    // Process income advice item/topic data
    function initData(data, type) {
      if ($routeParams[type]) {
        // Set the active entry, if any
        $scope[type] = _.findWhere(data, {slug: $routeParams[type]});
        if ($scope[type]) {
          // since we're directly addressing a topic/item we'll move it to the top of the list!
          data.splice(_.indexOf(data, $scope[type]), 1);
          data.unshift($scope[type]);
        }
      }
      return data;
    }

    adviceService.topics.$then(function(data){
      $scope.topics = initData(data.resource, 'topic');
    });
    adviceService.items.$then(function(data){
      $scope.items = initData(data.resource, 'item');
    });

    $scope.setItem = function(slug) {
      $location.search('item', slug);
    };

    $scope.setTopic = function(slug) {
      $location.search('topic', slug);
    };

  });


