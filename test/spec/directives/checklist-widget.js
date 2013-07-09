'use strict';

describe('Directive: checklistWidget', function () {
  beforeEach(module('docready'));

  var element, httpBackend, sservice;

  beforeEach(module(function($provide) {
    $provide.factory('symptomService', function() {
      return {
        selections: [],
        add: function(item) {this.selections.push(item);}
      };
    });
  }));

  beforeEach(inject(function ($rootScope, $httpBackend, symptomService) {
      httpBackend = $httpBackend;
      sservice = symptomService;
      httpBackend.whenGET('views/checklist-widget.html').respond([
        '<figure ng-switch on="countOnly">',
        '<span ng-switch-when="false">My Checklist</span>',
        '<span ng-switch-when="false">{{checklist.length}} item{{checklist.length !== 1 && \'s\' || \'\'}}</span>',
        '<span ng-switch-when="true">{{checklist.length > 0 && checklist.length || \'\'}}</span>',
        '</figure>'
      ].join(''));
    }));

  it('should show a figure counting symptoms', inject(function ($rootScope, $compile) {
    sservice.add('thing');
    element = angular.element('<checklist-widget count-only></checklist-widget>');
    element = $compile(element)($rootScope);
    httpBackend.flush();
    expect(element.text()).toBe('1');
  }));

  it('should show a figure with context elements if count-only is not specified', inject(function ($rootScope, $compile) {
    sservice.add('thing');
    element = angular.element('<checklist-widget></checklist-widget>');
    element = $compile(element)($rootScope);
    httpBackend.flush();
    expect(element.text()).toBe('My Checklist1 item');
  }));
});
