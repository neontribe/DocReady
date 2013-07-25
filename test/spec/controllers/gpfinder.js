'use strict';

describe('Controller: GpfinderCtrl', function () {

  // load the controller's module
  beforeEach(module('docready'));

  var GpfinderCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GpfinderCtrl = $controller('GpfinderCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings).toBeUndefined();
  });
});
