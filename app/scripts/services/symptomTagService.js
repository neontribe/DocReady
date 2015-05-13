'use strict';

angular.module('docready')
  .factory('symptomTagService', function (symptoms_content) {
  var tags = _.chain(symptoms_content)
    .pluck('tags')
    .flatten()
    .unique()
    .push('other')
    .shuffle()
    .value();
  // Public API here
  return {
    symptomTags: tags
  };
});
