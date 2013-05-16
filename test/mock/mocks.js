'use strict';

angular.module('docready')
  .factory('mocks', function(){
    var symptoms, items, topics;

    symptoms = [
        {
            title: 'Feeling Tired',
            tags: ['sleep']
          },
          {
            title: 'Trouble Falling Asleep Sometimes Which Is Horrid & I Hate It',
            tags: ['sleep', 'drugs', 'anxiety']
          },
          {
            title: 'Don\'t Feel Like Eating',
            tags: ['anxiety', 'appetite']
          },
          {
            title: 'Feel I Eat Too Much',
            tags: ['appetite']
          }
        ];
    items = [
        {
            title: 'Item 1',
            slug: 'item-1',
            body: 'Blah',
            topic: 'topic-1',
            weight: 1.0
          },
          {
            title: 'Item 2',
            slug: 'item-2',
            body: '<strong>Blah</strong>',
            topic: 'topic-2',
            weight: 2.0
          },
          {
            title: 'Item 3',
            slug: 'item-3',
            body: 'Blah blah',
            topic: 'topic-2',
            weight: 3.0
          },
          {
            title: 'Item 4',
            slug: 'item-4',
            body: 'Blah blah',
            topic: 'topic-2',
            weight: 4.0
          }
        ];

    topics = [
        {
            title: 'Topic 1',
            slug: 'topic-1',
            weight: 1.0
          },
          {
            title: 'Topic 2',
            slug: 'topic-2',
            weight: 2.0
          },
          {
            title: 'Topic 3',
            slug: 'topic-3',
            weight: 3.0
          },
          {
            title: 'Topic 4',
            slug: 'topic-4',
            weight: 4.0
          }
        ];

    function registerMocks($httpBackend) {
      $httpBackend.whenGET('/api/advice_topic').respond(topics);
      $httpBackend.whenGET('/api/advice_item').respond(items);
      $httpBackend.whenGET('/api/symptom').respond(symptoms);
    }

    return {
      registerMocks: registerMocks,
      data: {
        symptoms: symptoms,
        topics: topics,
        items: items
      }
    };
  });

angular.module('docreadyTest', ['docready', 'ngMockE2E'])
.run(function($httpBackend, mocks) {
  mocks.registerMocks($httpBackend);
  $httpBackend.whenGET().passThrough();
});

angular.element(document).find('body').attr('ng-app', 'docreadyTest');