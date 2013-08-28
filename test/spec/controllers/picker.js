'use strict';

describe('Controller: PickerCtrl', function () {

  // load the controller's module
  beforeEach(module('docready'));

  var PickerCtrl,
    httpBackend,
    location,
    timeout,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $httpBackend, mocks, $location, $timeout) {
    httpBackend = $httpBackend;
    timeout = $timeout;
    location = $location;
    mocks.registerMocks(httpBackend);
    scope = $rootScope.$new();
    PickerCtrl = $controller('PickerCtrl', {
      $scope: scope,
      $routeParams: {tag: 'sleep'}
    });
  }));

  it('should attach a list of symptoms to the scope', function () {
    httpBackend.flush();
    timeout.flush();
    expect(scope.symptoms.length).toBeGreaterThan(2);
  });

  it('should attach an array of tags to the scope', function () {
    httpBackend.flush();
    timeout.flush();
    expect(scope.tags.length).toBeGreaterThan(3);
  });

  it('should provide a filter method hasActiveTag', function(){
    httpBackend.flush();
    timeout.flush();
    expect(scope.hasActiveTag).toBeDefined();
    expect(_.filter(scope.symptoms, scope.hasActiveTag).length).toEqual(3);
  });

});
