'use strict';

function registerMocks($httpBackend) {
  $httpBackend.whenGET('/api/advice_topics').respond([
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
      ]);
  $httpBackend.whenGET('/api/advice_items').respond([
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
          body: '<strong>Blah</strong>',
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
      ]);
}

angular.module('docreadyTest', ['docready', 'ngMockE2E'])
.run(function($httpBackend) {
  registerMocks($httpBackend);
  $httpBackend.whenGET().passThrough();
});