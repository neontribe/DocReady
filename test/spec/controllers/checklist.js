'use strict';

describe('Controller: ChecklistCtrl', function () {

  // load the controller's module
  beforeEach(module('docready'));

  var ChecklistCtrl,
    $httpBackend,
    scope;

  beforeEach(module(function($provide) {
    $provide.factory('symptomService', function() {
      var sympts = [{ title: 'test symptom', tags: ['test'], selected: true}, { title: 'test symptom2', tags: ['test'], selected: true}];
      return {
        selections: sympts,
        exportSymptoms: function(){
          return sympts;
        }
      };
    });
  }));

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$httpBackend_, mocks) {
    $httpBackend = _$httpBackend_;
    mocks.registerMocks($httpBackend);
    scope = $rootScope.$new();
    ChecklistCtrl = $controller('ChecklistCtrl', {
      $scope: scope
    });
  }));



  it('should attach a list of selected symptoms to the scope', function () {
    expect(scope.selections.length).toEqual(2);
  });
});
