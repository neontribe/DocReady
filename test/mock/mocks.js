'use strict';

angular.module('docready')
  .factory('mocks', function(settings){
    var symptoms, items, topics, mailer;

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
            title: 'Intro',
            slug: 'intro',
            body: '<p>Doc Ready is here to help you get ready to make a visit to the doctor.</p><p>Use our <a track-route="picker" ng-href="#/picker">checklist</a> to prepare a list of things you\'d like to talk to a doctor about so you can take it with you.</p>',
            topic: 'what-can-a-gp-help-with',
            weight: 1.0
          },
          {
            title: 'Item 2',
            slug: 'item-2',
            body: '<strong>Blah</strong>',
            topic: 'know-your-rights',
            weight: 2.0
          },
          {
            title: 'Item 3',
            slug: 'item-3',
            body: 'Blah blah',
            topic: 'know-your-rights',
            weight: 3.0
          },
          {
            title: 'Item 4',
            slug: 'item-4',
            body: 'Blah blah',
            topic: 'know-your-rights',
            weight: 4.0
          }
        ];

    topics = [
        {
            title: 'What can a GP help with?',
            slug: 'what-can-a-gp-help-with',
            weight: 1.0
          },
          {
            title: 'Know your rights',
            slug: 'know-your-rights',
            weight: 2.0
          },
          {
            title: 'Confidentiality',
            slug: 'confidentiality',
            weight: 3.0
          },
          {
            title: 'Getting the most out of your appointment',
            slug: 'getting-the-most-out-of-your-appointment',
            weight: 4.0
          },
          {
            title: 'How to give feedback',
            slug: 'how-to-give-feedback',
            weight: 5.0
          },
          {
            title: 'How to find a GP',
            slug: 'how-to-find-a-gp',
            weight: 6.0
          }
        ];
    mailer = {};

    function registerMocks($httpBackend) {
      $httpBackend.whenGET(settings.apiRoot + '/advice_topic').respond(topics);
      $httpBackend.whenGET(settings.apiRoot + '/advice_item').respond(items);
      $httpBackend.whenGET(settings.apiRoot + '/symptom').respond(symptoms);
      $httpBackend.whenPOST(settings.apiRoot + '/email').respond(function(){
        return [200];
      });
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
// add a 700ms delay to all mocked requests
.config(function($provide) {
    $provide.decorator('$httpBackend', function($delegate) {
        var proxy = function(method, url, data, callback, headers) {
            var interceptor = function() {
                var _this = this,
                    _arguments = arguments;
                setTimeout(function() {
                    callback.apply(_this, _arguments);
                  }, (method === 'POST') ? 1500 : 0);
              };
            return $delegate.call(this, method, url, data, interceptor, headers);
          };
        for(var key in $delegate) {
          proxy[key] = $delegate[key];
        }
        return proxy;
      });
  })
.run(function($httpBackend, mocks) {
  mocks.registerMocks($httpBackend);
  $httpBackend.whenGET().passThrough();
});

angular.element(document).find('body').attr('data-ng-app', 'docreadyTest');