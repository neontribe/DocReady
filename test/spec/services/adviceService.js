'use strict';

describe('Service: adviceService', function () {

  // load the service's module
  beforeEach(module('docready'));

  // instantiate service
  var adviceService;
  
  beforeEach(module(function($provide){
     $provide.value('advice_content', [
      {
          title: 'Item 1',
          slug: 'item-1',
          body: 'Blah',
          topic: 'topic-1'
        },
        {
          title: 'Item 2',
          slug: 'item-2',
          body: 'Blah',
          topic: 'topic-2'
        }
      ]);
    $provide.value('advice_topics_content', [
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
  }));

  beforeEach(inject(function(_adviceService_){
    adviceService = _adviceService_;
  }));


  describe('Service: adviceService.topics', function(){
    it('should resolve to an array of topic objects', function(){
      var topics = adviceService.topics;
      expect(topics.length).toEqual(2);
    });
  });

  describe('Service: adviceService.items', function(){
    it('should resolve to an array of topic objects', function(){
      var items = adviceService.items;
      expect(items.length).toEqual(2);
    });
  });
  

});
