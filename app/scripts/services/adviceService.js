'use strict';

angular.module('docready')
  .factory('adviceService', function (settings, advice_content, advice_topics_content) {
    var topics = advice_topics_content,
     items = advice_content;

    // Public API here
    return {
      topics: topics,
      items: items
    };
  });
