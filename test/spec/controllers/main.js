'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('docready'));

  var MainCtrl,
    route,
    scope;


  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $route) {
    scope = $rootScope.$new();
    route = $route;
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));
});
