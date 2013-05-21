'use strict';

describe('Directive: addSymptom', function () {
  beforeEach(module('docready'));

  var element;

  it('should contain an input and a button', inject(function ($rootScope, $compile) {
    element = angular.element('<add-symptom></add-symptom>');
    element = $compile(element)($rootScope);
    expect(element.find('button')).toBeTruthy();
    expect(element.find('input')).toBeTruthy();
  }));

  it('should add symptom objects to the supplied array', inject(function ($rootScope, $compile) {
    $rootScope.symptoms = [];
    element = angular.element('<add-symptom symptoms="symptoms"></add-symptom>');
    element = $compile(element)($rootScope);
    element.find('input').text('A Title');
    element.find('button').click();
    console.log($rootScope.symptoms);
  }));
});
