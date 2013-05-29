'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('docready'));

  var MainCtrl,
    route,
    scope;

  // mock up the route
  beforeEach(module(function($provide) {
    $provide.factory('$route', function() {
      return {
        current: {
          $$route: {
            animateFrom: null
          }
        }
      };
    });
  }));

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $route) {
    scope = $rootScope.$new();
    route = $route;
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach getTransition to the scope', function () {
    expect(angular.isFunction(scope.getTransition)).toBeTruthy();
  });

  it('should provide default enter and leave transitions', function(){
    delete route.current;
    expect(scope.getTransition().enter).toBeTruthy();
    expect(scope.getTransition().leave).toBeTruthy();
  });

  it('should provide default enter and leave transitions if no current route', function(){
    expect(scope.getTransition().enter).toBeTruthy();
    expect(scope.getTransition().leave).toBeTruthy();
  });

  it('should provide specific enter and leave transitions if the current route calls for them', function(){
    route.current.$$route.animateFrom = 'Left';
    expect(scope.getTransition().enter).toEqual('animated fadeInLeftBig');
    expect(scope.getTransition().leave).toEqual('animated fadeOutRightBig');
  });
});
