'use strict';

describe('Directive: d3cloud', function () {
  beforeEach(module('docready'));

  var element;

  it('should contain an svg', inject(function ($rootScope, $compile) {
    $rootScope.words = [{text: 'this', count: 2},{text:'that',count:1}];
    element = angular.element('<d3cloud words=\"words\"></d3cloud>');
    element = $compile(element)($rootScope);
    expect(element.children()[0].tagName).toBe('svg');
  }));
});
