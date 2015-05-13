'use strict';

describe('Controller: AdviceCtrl', function () {

  // load the controller's module
  beforeEach(module('docready'));

  var AdviceCtrl,
    scope,
    controller,
    location;

  beforeEach(module(function($provide){
    $provide.value('advice_topics_content', [
      {
          title: 'What can a GP help with?',
          slug: 'what-can-a-gp-help-with'
        },
        {
          title: 'Know your rights',
          slug: 'know-your-rights'
        },
        {
          title: 'Confidentiality',
          slug: 'confidentiality'
        },
        {
          title: 'Getting the most out of your appointment',
          slug: 'getting-the-most-out-of-your-appointment'
        },
        {
          title: 'How to give feedback',
          slug: 'how-to-give-feedback'
        },
        {
          title: 'How to find a GP',
          slug: 'how-to-find-a-gp'
        }
      ]);
      $provide.value('advice_content', [
        {
            title: 'Intro',
            slug: 'intro',
            body: '<p>Doc Ready is here to help you get ready to make a visit to the doctor.</p><p>Use our <a track-route="picker" ng-href="#/picker">checklist</a> to prepare a list of things you\'d like to talk to a doctor about so you can take it with you.</p>',
            topic: 'what-can-a-gp-help-with'
          },
          {
            title: 'Item 2',
            slug: 'item-2',
            body: '<strong>Blah</strong>',
            topic: 'know-your-rights'
          },
          {
            title: 'Item 3',
            slug: 'item-3',
            body: 'Blah blah',
            topic: 'know-your-rights'
          },
          {
            title: 'Item 4',
            slug: 'item-4',
            body: 'Blah blah',
            topic: 'know-your-rights'
          }
        ]);
  }));

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $location) {
    location = $location;
    scope = $rootScope.$new();
    controller = $controller;
    AdviceCtrl = $controller('AdviceCtrl', {
      $scope: scope
    });
  }));

  it('should attatch a list of topics to the scope', function () {
    expect(scope.topics.length).toBe(6);
  });

  it('should attatch a list of items to the scope', function () {
    expect(scope.items.length).toBe(4);
  });

  it('should respect the active topic set in routeParams', function(){
    var routeParams = {topic: 'confidentiality'};
    AdviceCtrl = controller('AdviceCtrl', {
      $scope: scope,
      $routeParams: routeParams
    });
    expect(scope.topic.slug).toEqual('confidentiality');
  });

  it('should respect the active item set in routeParams', function(){
    var routeParams = {item: 'item-3'};
    AdviceCtrl = controller('AdviceCtrl', {
      $scope: scope,
      $routeParams: routeParams
    });
    expect(scope.item.slug).toEqual('item-3');
  });

  it('should provide a setItem method which sets the item in the location search', function(){
    scope.setItem('test-slug');
    expect(location.search().item).toEqual('test-slug');
  });

  it('should provide a setTopic method which sets the topic in the location search', function(){
    scope.setTopic('test-slug');
    expect(location.search().topic).toEqual('test-slug');
  });
});
