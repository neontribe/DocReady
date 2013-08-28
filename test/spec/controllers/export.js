'use strict';

describe('Controller: ExportCtrl', function () {

  // load the controller's module
  beforeEach(module('docready'));

  var ExportCtrl,
    $httpBackend,
    timeout,
    $window,
    scope,
    alocation,
    analytics;

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
    $provide.factory('Analytics', function(){
      return {
        trackPage: function(){}
      };
    });
  }));


  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$httpBackend_, mocks, $location, $timeout, _$window_, symptomService, Analytics) {
    $httpBackend = _$httpBackend_;
    timeout = $timeout;
    alocation = $location;
    analytics = Analytics;
    $window = _$window_;
    mocks.registerMocks($httpBackend);
    scope = $rootScope.$new();
    ExportCtrl = $controller('ExportCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of selected symptoms to the scope', function () {
    expect(scope.selections.length).toBe(2);
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
    scope.selections[0].selected = true;
    scope.selections[1].selected = true;
    scope.prepareMail();
    expect(scope.email.symptoms.length).toBe(2);
    expect(scope.email.symptoms[1]).toEqual(scope.selections[1].title);
  });

  it('should have a sendEmail function which posts the email', function () {
    scope.selections[0].selected = true;
    scope.selections[1].selected = true;
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

  it('should have a print function which calls $window.print', function () {
    spyOn($window, 'print');
    scope.print();
    expect($window.print).toHaveBeenCalled();
  });

  it('should have a track function which calls Analytics.trackPage with the current path + its argument', function () {
    alocation.path('/foo/bar');
    spyOn(analytics, 'trackPage');
    scope.track('thing');
    expect(analytics.trackPage).toHaveBeenCalledWith('/foo/bar/thing');
  });
});
