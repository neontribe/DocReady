'use strict';

angular.module('docready')
  .factory('adviceService', function ($resource) {
    var topics, items;
    topics = $resource('/api/advice_topic/:topicId').query();
    items = $resource('/api/advice_item/').query();
    // Public API here
    return {
      topics: topics,
      items: items
    };
  });
