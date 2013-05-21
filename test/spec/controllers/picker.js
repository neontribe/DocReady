'use strict';

describe('Controller: PickerCtrl', function () {

  // load the controller's module
  beforeEach(module('docready'));

  var PickerCtrl,
    httpBackend,
    location,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $httpBackend, mocks, $location) {
    httpBackend = $httpBackend;
    location = $location;
    mocks.registerMocks(httpBackend);
    scope = $rootScope.$new();
    PickerCtrl = $controller('PickerCtrl', {
      $scope: scope,
      $routeParams: {tag: 'sleep'}
    });
  }));

  it('should attach a list of symptoms to the scope', function () {
    httpBackend.flush();
    expect(scope.symptoms.length).toBeGreaterThan(2);
  });

  it('should attach an array of tags to the scope', function () {
    httpBackend.flush();
    expect(scope.tags.length).toBeGreaterThan(3);
  });

  it('should provide a filter method hasActiveTag', function(){
    httpBackend.flush();
    expect(scope.hasActiveTag).toBeDefined();
    expect(_.filter(scope.symptoms, scope.hasActiveTag).length).toEqual(3);
  });

  it('should provide a method which counts the selected symptoms for a tag', function(){
    httpBackend.flush();
    scope.symptoms[0].selected = true;
    _.each(scope.symptoms[0].tags, function(tag){
      expect(scope.countForTag(tag)).toEqual(1);
    });
  });

  it('should provide a showTag method which adjusts the location', function(){
    httpBackend.flush();
    scope.showTag('test');
    expect(location.path()).toEqual('/tool/picker/test');
  });

  it('should provide a toggleSymptom method which toggles the selection state of s symptom', function(){
    httpBackend.flush();
    expect(scope.symptoms[0].selected).toBeFalsy();
    expect(scope.symptoms[0].tags).toEqual(['sleep', 'enthusiasm']);
    scope.toggleSymptom(scope.symptoms[0], 'sleep');
    expect(scope.symptoms[0].selected).toBeTruthy();
    expect(scope.symptoms[0].tags).toEqual(['sleep']);
    scope.toggleSymptom(scope.symptoms[0], 'sleep');
    expect(scope.symptoms[0].selected).toBeFalsy();
    expect(scope.symptoms[0].tags).toEqual(['sleep', 'enthusiasm']);
  });

});
