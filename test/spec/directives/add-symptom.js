/* global jQuery */
'use strict';

describe('Directive: addSymptom', function () {
  var element, $httpBackend, sservice;
  beforeEach(module('docready'));

  beforeEach(module(function($provide) {
    $provide.factory('symptomService', function() {
      return {
        add: angular.noop
      };
    });
  }));

  beforeEach(inject(function ($rootScope, _$httpBackend_, symptomService) {
      $httpBackend = _$httpBackend_;
      sservice = symptomService;
      $httpBackend.whenGET('views/add-symptom.html').respond([
        '<label>',
        '<span ng-transclude></span>',
        '<input type="text" ng-model="sympt"/>',
        '</label>',
        '<button type="button" ',
        'ng-click="add()" ',
        'ng-disabled="sympt.length === 0">',
        '{{buttonText}}',
        '</button>'
      ].join(''));
    }));

  it('should contain an input and a button', inject(function ($rootScope, $compile) {
    element = angular.element('<div add-symptom></div>');
    element = $compile(element)($rootScope);
    $httpBackend.flush();
    expect(element.find('button').text()).toEqual('+');
    expect(element.find('input').val()).toBeFalsy();
  }));

  it('should use the symptomProvider to add symptoms', inject(function ($rootScope, $compile, $sniffer) {
    element = angular.element('<add-symptom></add-symptom>');
    element = $compile(element)($rootScope);
    spyOn(sservice, 'add');
    $httpBackend.flush();
    // use the (undocumented $siffer to discover if we're expected to dispatch 'inpu' or 'change' in this browser)
    jQuery(element[0]).find('input').val('A Title').trigger($sniffer.hasEvent('input') ? 'input' : 'change');
    element.find('button').click();
    expect(sservice.add).toHaveBeenCalledWith('A Title', undefined, true, false);
  }));

  it('should add to tag the new symptom if a tag is provided', inject(function ($rootScope, $compile, $sniffer) {
    element = angular.element('<add-symptom tag="test"></add-symptom>');
    element = $compile(element)($rootScope);
    spyOn(sservice, 'add');
    $httpBackend.flush();
    // use the (undocumented $siffer to discover if we're expected to dispatch 'inpu' or 'change' in this browser)
    jQuery(element[0]).find('input').val('A Title').trigger($sniffer.hasEvent('input') ? 'input' : 'change');
    element.find('button').click();
    expect(sservice.add).toHaveBeenCalledWith('A Title', 'test', true, false);
  }));
});
