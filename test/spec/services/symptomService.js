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
          tags: ['sleep']
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

  it('should provide an array of unique tags', function () {
    var tags;
    $httpBackend.expectGET('/api/symptom');
    tags = symptomService.tags;
    $httpBackend.flush();
    expect(tags.length).toEqual(3);
    expect(tags).toEqual(['sleep', 'drugs', 'anxiety']);
  });

});
