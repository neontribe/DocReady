'use strict';

describe('Directive: trackRoute', function () {
  beforeEach(module('docready'));

  var element;

  it('updates the href if the route matches' , inject(function ($rootScope, $compile, $location) {
    element = angular.element('<a track-route="myroute" href="#/myroute"></a>');
    element = $compile(element)($rootScope);
    expect(element.attr('href')).toEqual('#/myroute');
    $location.url('/myroute/subpage?foo=bar');
    $rootScope.$apply();
    expect(element.attr('href')).toEqual('#/myroute/subpage?foo=bar');
  }));

  it('doesn\'t update the href if the route doesn\'t matche' , inject(function ($rootScope, $compile, $location) {
    element = angular.element('<a track-route="myroute" href="#/myroute"></a>');
    element = $compile(element)($rootScope);
    expect(element.attr('href')).toEqual('#/myroute');
    $location.url('/wrongroute/subpage?foo=bar');
    $rootScope.$apply();
    expect(element.attr('href')).toEqual('#/myroute');
  }));
});
