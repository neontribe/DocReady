'use strict';

describe('Controller: ChecklistCtrl', function () {

  // load the controller's module
  beforeEach(module('docready'));

  var ChecklistCtrl,
    $httpBackend,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$httpBackend_) {
    $httpBackend = _$httpBackend_;
    registerMocks($httpBackend);
    scope = $rootScope.$new();
    ChecklistCtrl = $controller('ChecklistCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of symptoms to the scope', function () {
    $httpBackend.flush();
    expect(scope.symptoms.length).toBe(2);
  });
});
