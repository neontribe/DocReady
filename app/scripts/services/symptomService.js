'use strict';

angular.module('docready')
  .factory('symptomService', function ($resource) {
  var symptoms = [], 
    tags = [];

  symptoms = $resource('/api/symptom').query({}, function(data){
    var extracted = _.uniq(_.union.apply(null, _.pluck(data, 'tags')));
    tags.push.apply(tags, extracted);
  });

  // Public API here
  return {
    symptoms: symptoms,
    tags: tags
  };
});
