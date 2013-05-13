'use strict';

angular.module('docready')
  .factory('symptomService', function ($resource) {
  var symptoms;
  symptoms = $resource('/api/symptom').query();

  // Public API here
  return {
    symptoms: symptoms
  };
});
