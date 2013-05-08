'use strict';

angular.module('docready')
  .factory('adviceService', function ($resource) {
    // Public API here
    return {
      'Topic': $resource('/api/advice_topics/:topicId', {}),
      'Item': $resource('/api/advice_items/', {})
    };
  });
