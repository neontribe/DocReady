'use strict';

describe('Service: symptomService', function () {

  // load the service's module
  beforeEach(module('docready'));

  // instantiate service
  var symptomService, $httpBackend;
  

  beforeEach(inject(function(_$httpBackend_, _symptomService_){
    $httpBackend = _$httpBackend_;
    symptomService = _symptomService_;
    $httpBackend.whenGET('/api/symptom').respond([
      {
          title: 'Feeling Tired',
          tags: ['sleep', 'enthusiasm']
        },
        {
          title: 'Trouble Falling Asleep',
          tags: ['sleep', 'drugs', 'anxiety']
        }
    ]);
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should provide an array of symptom objects', function () {
    var symptoms;
    $httpBackend.expectGET('/api/symptom');
    symptoms = symptomService.symptoms;
    $httpBackend.flush();
    expect(symptoms.length).toEqual(2);
  });

  it('should provide a toggle method which toggles the selection state of a symptom', function(){
    var symptoms = symptomService.symptoms;
    $httpBackend.expectGET('/api/symptom');
    $httpBackend.flush();
    expect(symptoms[0].selected).toBeFalsy();
    expect(symptoms[0].tags).toEqual(['sleep', 'enthusiasm']);
    symptomService.toggle(symptoms[0], 'sleep');
    expect(symptoms[0].selected).toBeTruthy();
    expect(symptoms[0].tags).toEqual(['sleep']);
    symptomService.toggle(symptoms[0]);
    expect(symptoms[0].selected).toBeFalsy();
    expect(symptoms[0].tags).toEqual(['sleep', 'enthusiasm']);
  });

  it('should not change the tags if no activeTag is passed to toggle', function(){
    var symptoms = symptomService.symptoms;
    $httpBackend.expectGET('/api/symptom');
    $httpBackend.flush();
    expect(symptoms[0].tags).toEqual(['sleep', 'enthusiasm']);
    symptomService.toggle(symptoms[0]);
    expect(symptoms[0].tags).toEqual(['sleep', 'enthusiasm']);
  });

  it('should provide an exportSymptoms method which returns a stripped-down array of selected symptoms', function(){
    var symptoms = symptomService.symptoms;
    $httpBackend.expectGET('/api/symptom');
    $httpBackend.flush();
    symptomService.toggle(symptoms[0], 'sleep');
    expect(symptomService.exportSymptoms()).toEqual([{ title : 'Feeling Tired', tags : [ 'sleep' ], selected : true }]);
  });

  describe('restore userData', function(){

    beforeEach(inject(function(settings){
      settings.userData.symptoms = [
        { title: 'New Symptom', tags: ['ennui'], selected: true },
        { title : 'Feeling Tired', tags : [ 'replaced' ], selected : true }
      ];
    }));

    it('should merge any symptoms found in settings.userData.symptoms into the symptom list', function(){
      var symptoms = symptomService.symptoms;
      $httpBackend.expectGET('/api/symptom');
      $httpBackend.flush();
      expect(symptoms.length).toEqual(3);
      expect(symptoms[1].tags).toEqual(['replaced']);
    });
  });

});
