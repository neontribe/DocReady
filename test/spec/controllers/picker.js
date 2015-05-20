'use strict';

describe('Controller: PickerCtrl', function () {

  // load the controller's module
  beforeEach(module('docready'));

  var PickerCtrl,
    location,
    scope;

  beforeEach(module(function($provide){
      $provide.value('symptoms_content', [
        {
          'title': 'I feel tired all the time',
          'tags': ['sleep', 'enthusiasm']
        }, {
          'title': 'I\'m eating too much',
          'tags': ['appetite']
        }, {
          'title': 'I can\'t get to sleep at night',
          'tags': ['sleep']
        }, {
          'title': 'I lose my temper too much',
          'tags': ['anxiety', 'relationships']
        }, {
          'title': 'Nobody seems to like me',
          'tags': ['anxiety', 'relationships']
        }, {
          'title': 'I\'m getting into debt',
          'tags': ['finances']
        }, {
          'title': 'My memory is playing tricks on me',
          'tags': ['memory']
        }, {
          'title': 'I\'m drinking too much',
          'tags': ['health', 'drinking', 'drug use']
        }, {
          'title': 'I don\'t eat properly',
          'tags': ['appetite', 'anxiety', 'health', 'eating']
        }, {
          'title': 'I can\'t get out of bed',
          'tags': ['sleep', 'enthusiasm']
        }, {
          'title': 'I feel depressed',
          'tags': ['mood', 'thoughts']
        }, {
          'title': 'I think about killing myself',
          'tags': ['self harm', 'thoughts']
        }, {
          'title': 'I don\'t feel quite real',
          'tags': ['anxiety', 'thoughts', 'unreality']
        }, {
          'title': 'I\'ve started cutting myself',
          'tags': ['self harm']
        }
      ]);
  }));

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $location, $timeout) {
    location = $location;
    scope = $rootScope.$new();
    PickerCtrl = $controller('PickerCtrl', {
      $scope: scope,
      $routeParams: {tag: 'sleep'}
    });
  }));

  it('should attach a list of symptoms to the scope', function () {
    expect(scope.symptoms.length).toBeGreaterThan(2);
  });

  it('should attach an array of tags to the scope', function () {
    expect(scope.tags.length).toBeGreaterThan(3);
  });

  it('should provide a filter method hasActiveTag', function(){
    expect(scope.hasActiveTag).toBeDefined();
    expect(_.filter(scope.symptoms, scope.hasActiveTag).length).toEqual(3);
  });

});
