'use strict';

angular.module('docready')
  .controller('AdviceCtrl', function ($scope, adviceService) {
    $scope.activeTopic = null;
    $scope.topics = adviceService.Topic.query(function(topics){
      $scope.setActiveTopic(topics[0]);
    });
    $scope.items = adviceService.Item.query();

    $scope.setActiveTopic = function(topic) {
      $scope.activeTopic = topic;
    };

  });


