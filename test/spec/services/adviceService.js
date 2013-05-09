'use strict';

describe('Service: adviceService', function () {

  // load the service's module
  beforeEach(module('docready'));

  // instantiate service
  var adviceService, $httpBackend;
  

  beforeEach(inject(function(_$httpBackend_, _adviceService_){
    $httpBackend = _$httpBackend_;
    adviceService = _adviceService_;
    $httpBackend.whenGET('/api/advice_topics').respond([
      {
          title: 'Topic 1',
          slug: 'topic-1',
          weight: 1.0
        },
        {
          title: 'Topic 2',
          slug: 'topic-2',
          weight: 2.0
        }
    ]);
    $httpBackend.whenGET('/api/advice_items').respond([
        {
            title: 'Item 1',
            slug: 'item-1',
            body: 'Blah',
            topic: 'Topic 1',
            weight: 1.0
          },
          {
            title: 'Item 2',
            slug: 'item-2',
            body: 'Blah',
            topic: 'Topic 2',
            weight: 2.0
          }
        ]);
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should provide topics and items', function () {
    expect(adviceService.Topic).toBeDefined();
    expect(typeof adviceService.Topic).toEqual('function');
    expect(adviceService.Item).toBeDefined();
    expect(typeof adviceService.Item).toEqual('function');
  });

  describe('Service: adviceService.Topic', function(){
    it('should resolve to an array of topic objects', function(){
      var topics = null;
      $httpBackend.expectGET('/api/advice_topics');
      topics = adviceService.Topic.query();
      $httpBackend.flush();
      expect(topics.length).toEqual(2);
    });
  });

  describe('Service: adviceService.Items', function(){
    it('should resolve to an array of topic objects', function(){
      var items;
      $httpBackend.expectGET('/api/advice_items');
      items = adviceService.Item.query();
      $httpBackend.flush();
      expect(items.length).toEqual(2);
    });
  });
  

});
