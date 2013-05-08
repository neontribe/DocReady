'use strict';

angular.module('docready')
  .controller('AdviceCtrl', function ($scope) {
    $scope.topics = [
        {
          title: 'Topic 1',
          slug: 'topic-1',
          weight: 1.0
        },
        {
          title: 'Topic 2',
          slug: 'topic-2',
          weight: 2.0
        }
      ];
    $scope.items = [
        {
            title: 'Item 1',
            slug: 'item-1',
            body: 'Blah',
            topic: 'Topic 1',
            weight: 1.0
          },
          {
            title: 'Item 2',
            slug: 'item-2',
            body: 'Blabber',
            topic: 'Topic 2',
            weight: 2.0
          },
          {
            title: 'Item 3',
            slug: 'item-3',
            body: 'Blah blah',
            topic: 'Topic 2',
            weight: 3.0
          }
        ];
  });


