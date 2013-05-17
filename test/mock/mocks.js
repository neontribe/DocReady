'use strict';

angular.module('docready')
  .factory('mocks', function(settings){
    var symptoms, items, topics;

    symptoms = [{
      'url': 'http://docready-staging.herokuapp.com/api/symptom/1',
      'title': 'I feel tired all the time',
      'tags': ['sleep', 'enthusiasm']
    }, {
      'url': 'http://docready-staging.herokuapp.com/api/symptom/2',
      'title': 'I\'m eating too much',
      'tags': ['appetite']
    }, {
      'url': 'http://docready-staging.herokuapp.com/api/symptom/3',
      'title': 'I can\'t get to sleep at night',
      'tags': ['sleep']
    }, {
      'url': 'http://docready-staging.herokuapp.com/api/symptom/4',
      'title': 'I lose my temper too much',
      'tags': ['anxiety', 'relationships']
    }, {
      'url': 'http://docready-staging.herokuapp.com/api/symptom/5',
      'title': 'Nobody seems to like me',
      'tags': ['anxiety', 'relationships']
    }, {
      'url': 'http://docready-staging.herokuapp.com/api/symptom/7',
      'title': 'I\'m getting into debt',
      'tags': ['finances']
    }, {
      'url': 'http://docready-staging.herokuapp.com/api/symptom/8',
      'title': 'My memory is playing tricks on me',
      'tags': ['memory']
    }, {
      'url': 'http://docready-staging.herokuapp.com/api/symptom/6',
      'title': 'I\'m drinking too much',
      'tags': ['health', 'drinking', 'drug use']
    }, {
      'url': 'http://docready-staging.herokuapp.com/api/symptom/9',
      'title': 'I don\'t eat properly',
      'tags': ['appetite', 'anxiety', 'health', 'eating']
    }, {
      'url': 'http://docready-staging.herokuapp.com/api/symptom/10',
      'title': 'I can\'t get out of bed',
      'tags': ['sleep', 'enthusiasm']
    }, {
      'url': 'http://docready-staging.herokuapp.com/api/symptom/11',
      'title': 'I feel depressed',
      'tags': ['mood', 'thoughts']
    }, {
      'url': 'http://docready-staging.herokuapp.com/api/symptom/12',
      'title': 'I think about killing myself',
      'tags': ['self harm', 'thoughts']
    }, {
      'url': 'http://docready-staging.herokuapp.com/api/symptom/13',
      'title': 'I don\'t feel quite real',
      'tags': ['anxiety', 'thoughts', 'unreality']
    }, {
      'url': 'http://docready-staging.herokuapp.com/api/symptom/14',
      'title': 'I\'ve started cutting myself',
      'tags': ['self harm']
    }];
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
      $httpBackend.whenGET(settings.apiRoot + '/advice_topic').respond(topics);
      $httpBackend.whenGET(settings.apiRoot + '/advice_item').respond(items);
      $httpBackend.whenGET(settings.apiRoot + '/symptom').respond(symptoms);
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