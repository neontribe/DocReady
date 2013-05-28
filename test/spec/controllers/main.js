'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('docready'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach getTransition to the scope', function () {
    expect(angular.isFunction(scope.getTransition)).toBeTruthy();
  });
});
