'use strict';

angular.module('docready')
  .factory('adviceService', function ($resource, settings) {
    var topics, items;
    topics = $resource(settings.apiRoot + '/advice_topic/').query();
    items = $resource(settings.apiRoot + '/advice_item/').query();
    // Public API here
    return {
      topics: topics,
      items: items
    };
  });
