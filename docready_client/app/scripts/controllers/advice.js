'use strict';

angular.module('docreadyClientApp')
  .controller('AdviceCtrl', function ($scope) {
    $scope.topics = ['Topic 1', 'Topic 2'];
    $scope.items = [
        {
            title: 'Item 1',
            body: 'Blah',
            topic: 'Topic 1'
          },
          {
            title: 'Item 2',
            body: 'Blah',
            topic: 'Topic 2'
          }
        ];
  });
