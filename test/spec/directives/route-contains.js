'use strict';

describe('Directive: routeContains', function () {
  beforeEach(module('docready'));

  var element;

  it('can match the route path and set a class', inject(function ($rootScope, $compile, $location) {
    element = angular.element('<a route-contains="myroute" ng-class="{active: $routeContains}"></a>');
    element = $compile(element)($rootScope);
    expect(element.hasClass('active')).toBeFalsy();
    $location.path('/myroute/subpage');
    $rootScope.$apply();
    expect(element.hasClass('active')).toBeTruthy();
  }));
});
