'use strict';

describe('Controller: AdviceCtrl', function () {

  // load the controller's module
  beforeEach(module('docready'));

  var AdviceCtrl,
    scope,
    $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$httpBackend_) {
    $httpBackend = _$httpBackend_;
    registerMocks($httpBackend);
    scope = $rootScope.$new();
    AdviceCtrl = $controller('AdviceCtrl', {
      $scope: scope
    });
  }));

  it('should attatch a list of topics to the scope', function () {
    $httpBackend.flush();
    expect(scope.topics.length).toBe(4);
  });

  it('should attatch a list of items to the scope', function () {
    $httpBackend.flush();
    expect(scope.items.length).toBe(4);
  });
});
