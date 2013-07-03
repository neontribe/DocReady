'use strict';

describe('Controller: ChecklistCtrl', function () {

  // load the controller's module
  beforeEach(module('docready'));

  var ChecklistCtrl,
    $httpBackend,
    scope,
    ss;

  beforeEach(module(function($provide) {
    $provide.factory('symptomService', function() {
      var sympts = [{ title: 'test symptom', tags: ['test'], selected: true}, { title: 'test symptom2', tags: ['test'], selected: true}];
      return {
        selections: sympts,
        toggle: function(){}
      };
    });
  }));

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$httpBackend_, mocks, symptomService) {
    $httpBackend = _$httpBackend_;
    mocks.registerMocks($httpBackend);
    ss = symptomService;
    scope = $rootScope.$new();
    ChecklistCtrl = $controller('ChecklistCtrl', {
      $scope: scope
    });
  }));



  it('should attach a list of selected symptoms to the scope', function () {
    expect(scope.selections.length).toEqual(2);
  });

  it('should call the symptomservices toggle method when an item is deselected', function(){
    spyOn(ss, 'toggle');
    scope.deselect(scope.selections[0]);
    expect(ss.toggle).toHaveBeenCalledWith(scope.selections[0]);
  });
});
