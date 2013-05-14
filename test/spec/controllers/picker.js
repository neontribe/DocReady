'use strict';

describe('Controller: PickerCtrl', function () {

  // load the controller's module
  beforeEach(module('docready'));

  var PickerCtrl,
    $httpBackend,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$httpBackend_, mocks) {
    $httpBackend = _$httpBackend_;
    mocks.registerMocks($httpBackend);
    scope = $rootScope.$new();
    PickerCtrl = $controller('PickerCtrl', {
      $scope: scope,
      $routeParams: {tag: 'sleep'}
    });
  }));

  it('should attach a list of symptoms to the scope', function () {
    $httpBackend.flush();
    expect(scope.symptoms.length).toBeGreaterThan(2);
  });

  it('should attach an array of tags to the scope', function () {
    $httpBackend.flush();
    expect(scope.tags.length).toBeGreaterThan(3);
  });

  it('should provide a filter method hasActiveTag', function(){
    $httpBackend.flush();
    expect(scope.hasActiveTag).toBeDefined();
    expect(_.filter(scope.symptoms, scope.hasActiveTag).length).toEqual(2);
  });

  it('should provide a method which counts the selected symptoms for a tag', function(){
    $httpBackend.flush();
    scope.symptoms[1].selected = true;
    expect(scope.countForTag('sleep')).toEqual(1);
    expect(scope.countForTag('drugs')).toEqual(1);
    expect(scope.countForTag('anxiety')).toEqual(1);
  });

});
