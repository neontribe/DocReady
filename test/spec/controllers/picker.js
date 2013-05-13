'use strict';

describe('Controller: PickerCtrl', function () {

  // load the controller's module
  beforeEach(module('docready'));

  var PickerCtrl,
    $httpBackend,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$httpBackend_) {
    $httpBackend = _$httpBackend_;
    registerMocks($httpBackend);
    scope = $rootScope.$new();
    PickerCtrl = $controller('PickerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of symptoms to the scope', function () {
    $httpBackend.flush();
    expect(scope.symptoms.length).toBe(2);
  });

  it('should attach an array of tags to the scope', function () {
    $httpBackend.flush();
    expect(scope.tags.length).toBe(3);
  });
});
