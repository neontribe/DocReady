'use strict';

describe('Directive: addSymptom', function () {
  var element, $httpBackend;
  beforeEach(module('docready'));

  beforeEach(inject(function ($rootScope, _$httpBackend_) {
      $httpBackend = _$httpBackend_;
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

  it('should add symptom objects to the supplied array', inject(function ($rootScope, $compile, $sniffer) {
    $rootScope.symptoms = [];
    element = angular.element('<add-symptom symptoms="symptoms"></add-symptom>');
    element = $compile(element)($rootScope);
    $httpBackend.flush();
    // use the (undocumented $siffer to discover if we're expected to dispatch 'inpu' or 'change' in this browser)
    jQuery(element[0]).find('input').val('A Title').trigger($sniffer.hasEvent('input') ? 'input' : 'change');
    element.find('button').click();
    expect($rootScope.symptoms[0].title).toEqual('A Title');
    expect($rootScope.symptoms[0].selected).toBeTruthy();
  }));

  it('should add tag the new symptom if a tag is provided', inject(function ($rootScope, $compile, $sniffer) {
    $rootScope.symptoms = [];
    element = angular.element('<add-symptom symptoms="symptoms" tag="newtag"></add-symptom>');
    element = $compile(element)($rootScope);
    $httpBackend.flush();
    // use the (undocumented $siffer to discover if we're expected to dispatch 'inpu' or 'change' in this browser)
    jQuery(element[0]).find('input').val('A Title').trigger($sniffer.hasEvent('input') ? 'input' : 'change');
    element.find('button').click();
    expect($rootScope.symptoms[0].tags).toContain('newtag');
  }));
});
