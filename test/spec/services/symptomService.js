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
    $httpBackend.flush();
    symptoms = symptomService.symptoms;
    expect(symptoms.length).toEqual(2);
  });

  it('should provide an array of selected symptom objects', function () {
    var selections;
    $httpBackend.expectGET('/api/symptom');
    $httpBackend.flush();
    selections = symptomService.selections;
    expect(selections.length).toEqual(0);
  });

  describe('toggle()', function(){
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

    it('should add selected symptoms to the selections array', function(){
      var symptoms = symptomService.symptoms,
        selections = symptomService.selections;
      $httpBackend.expectGET('/api/symptom');
      $httpBackend.flush();
      expect(selections.length).toEqual(0);
      symptomService.toggle(symptoms[0], 'sleep');
      expect(selections[0]).toBe(symptoms[0]);
    });

    it('should remove deselected symptoms from the selections array', function(){
      var symptoms = symptomService.symptoms,
        selections = symptomService.selections;
      $httpBackend.expectGET('/api/symptom');
      $httpBackend.flush();
      expect(selections.length).toEqual(0);
      symptomService.toggle(symptoms[0], 'sleep');
      expect(selections[0]).toBe(symptoms[0]);
      symptomService.toggle(symptoms[0]);
      expect(selections.length).toEqual(0);
    });

  });

  describe('exportSymptoms()', function(){
    it('returns a stripped-down array of selected symptoms', function(){
      var symptoms = symptomService.symptoms;
      $httpBackend.expectGET('/api/symptom');
      $httpBackend.flush();
      symptomService.toggle(symptoms[0], 'sleep');
      expect(symptomService.exportSymptoms()).toEqual([{ title : 'Feeling Tired', tags : [ 'sleep' ], selected : true }]);
    });
  });

  describe('add()', function(){
    it('should construct a new symptom and push it to symptoms', function(){
      var symptoms = symptomService.symptoms;
      $httpBackend.expectGET('/api/symptom');
      $httpBackend.flush();
      expect(symptoms.length).toEqual(2);
      symptomService.add('New Symptom', 'hope');
      expect(symptoms.length).toEqual(3);
      expect(_.last(symptoms).title).toBe('New Symptom');
      expect(_.last(symptoms).tags).toEqual(['hope']);
    });

    it('should use toggle to select a symptom is the selected argument is true', function(){
      var selections = symptomService.selections;
      $httpBackend.expectGET('/api/symptom');
      $httpBackend.flush();
      expect(selections.length).toEqual(0);
      symptomService.add('New Symptom', 'hope', true);
      expect(_.first(selections).title).toEqual('New Symptom');
    });

    it('should add new symptoms at the front of the array if called with mode=prepend and no symptom exists with the same tag', function(){
      var symptoms = symptomService.symptoms;
      $httpBackend.expectGET('/api/symptom');
      $httpBackend.flush();
      symptomService.add('Prepend New Symptom', 'hope', false, 'prepend');
      expect(_.first(symptoms).title).toEqual('Prepend New Symptom');
    });

    it('should add new symptoms before the first symptom with the same tag if called with mode=prepend', function(){
      var symptoms = symptomService.symptoms;
      $httpBackend.expectGET('/api/symptom');
      $httpBackend.flush();
      symptomService.add('Prepend New Symptom', 'drugs', false, 'prepend');
      expect(symptoms[1].title).toEqual('Prepend New Symptom');
    });

    it('should add new symptoms at the end of the array if called with mode=append and no symptom exists with the same tag', function(){
      var symptoms = symptomService.symptoms;
      $httpBackend.expectGET('/api/symptom');
      $httpBackend.flush();
      symptomService.add('Append New Symptom', 'hope', false, 'append');
      expect(_.last(symptoms).title).toEqual('Append New Symptom');
    });

    it('should add new symptoms after the last symptom with the same tag if called with mode=append', function(){
      var symptoms = symptomService.symptoms;
      $httpBackend.expectGET('/api/symptom');
      $httpBackend.flush();
      symptomService.add('Append New Symptom', 'enthusiasm', false, 'append');
      expect(symptoms[1].title).toEqual('Append New Symptom');
    });

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
