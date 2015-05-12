'use strict';

angular.module('docready')
  .factory('symptomTagService', function ($resource, settings) {
  var symptomTags = $resource(settings.apiRoot + '/symptom_tag', {}, {
    shuffle: {
      method: 'GET',
      isArray: true,
      transformResponse: function(data) {
        return _.shuffle(angular.fromJson(data));
      }
    }
  }).shuffle({});

  // Public API here
  return {
    symptomTags: symptomTags
  };
});
