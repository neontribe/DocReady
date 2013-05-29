'use strict';

describe('Controller: ExportCtrl', function () {

  // load the controller's module
  beforeEach(module('docready'));

  var ExportCtrl,
    $httpBackend,
    timeout,
    $window,
    scope,
    sservice;

  beforeEach(module(function($provide) {
    $provide.factory('symptomService', function() {
      var sympts = [{ title: 'test symptom', tags: ['test'], selected: true}, { title: 'test symptom2', tags: ['test'], selected: true}];
      return {
        mySymptoms: function(){
          return sympts;
        },
        exportSymptoms: function(){
          return sympts;
        }
      };
    });
  }));


  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$httpBackend_, mocks, $timeout, _$window_, symptomService) {
    $httpBackend = _$httpBackend_;
    timeout = $timeout;
    $window = _$window_;
    mocks.registerMocks($httpBackend);
    scope = $rootScope.$new();
    ExportCtrl = $controller('ExportCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of selected symptoms to the scope', function () {
    expect(scope.mySymptoms.length).toBe(2);
  });

  it('should have a prepareMail function which initializes the dialog and the model', function () {
    expect(scope.email).toBeFalsy();
    expect(scope.showMailer).toBeFalsy();
    scope.prepareMail();
    expect(scope.email).toBeTruthy();
    expect(scope.showMailer).toBeTruthy();
    scope.prepareMail();
    expect(scope.showMailer).toBeFalsy();
  });

  it('should have a prepareMail function which serializes the checklist into the Email', function () {
    scope.mySymptoms[0].selected = true;
    scope.mySymptoms[1].selected = true;
    scope.prepareMail();
    expect(scope.email.symptoms.length).toBe(2);
    expect(scope.email.symptoms[1]).toEqual(scope.mySymptoms[1].title);
  });

  it('should have a sendEmail function which posts the email', function () {
    scope.mySymptoms[0].selected = true;
    scope.mySymptoms[1].selected = true;
    scope.prepareMail();
    expect(scope.email).toBeTruthy();
    $httpBackend.expectPOST('/api/email');
    scope.sendEmail();
    $httpBackend.flush();
    expect(scope.email.state).toBe('sent');
    timeout.flush();
    expect(scope.showMailer).toBeFalsy();
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should have a getpdf function which returns a link to a pdf', function () {
    scope.mySymptoms[0].selected = true;
    expect(scope.getpdf().length).toEqual(470);
  });

  it('should have a print function which calls $window.print', function () {
    spyOn($window, 'print');
    scope.print();
    expect($window.print).toHaveBeenCalled();
  });
});
