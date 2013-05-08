'use strict';

angular.module('docready')
  .controller('AdviceCtrl', function ($scope, adviceService) {
    $scope.topics = adviceService.Topic.query();
    $scope.items = adviceService.Item.query();
  });


