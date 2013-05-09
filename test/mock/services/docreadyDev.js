'use strict';
angular.module('docreadyDev', ['docready', 'ngMockE2E']).
    run(function ($httpBackend) {
      $httpBackend.whenGET(/advice_topics/).respond([{
          title: 'Topic 1',
          slug: 'topic-1',
          weight: 1.0
        },
        {
          title: 'Topic 2',
          slug: 'topic-2',
          weight: 2.0
        }]
       );
    });