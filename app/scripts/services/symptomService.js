'use strict';

angular.module('docready')
  .factory('symptomService', function ($resource, settings) {
  var symptoms = [];
  symptoms = $resource(settings.apiRoot + '/symptom').query({}, function(data){
    // Restore any saved symptoms
    restore(settings.userData.symptoms, data);
  });

  /**
   * Collect any user symptom data from settings and merge it with the symptoms from the API
   * Modifies the array data in place
   */
  function restore(saved, data){
    _.each(saved.reverse(), function(sym){
      var dupe = _.findWhere(data, {title: sym.title});
      if (dupe) {
        sym.originalTags = dupe.tags;
        data.splice(_.indexOf(data, dupe), 1);
      }
      data.unshift(sym);
    });
  }

  /**
   * Extract a simplified array of selected symptoms
   * @return {array}
   */
  function mySymptoms() {
    return _.map(_.where(symptoms, {selected: true}), function(v){
      return _.pick(v, 'title', 'tags', 'selected');
    });
  }

  /**
   * Toggle the selection state of a symptom
   * setting a single active tag if provided
   */
  function toggle(symptom, activeTag) {
    symptom.selected = !symptom.selected;
    symptom.originalTags = symptom.originalTags || angular.copy(symptom.tags);
    if (symptom.selected) {
      symptom.tags = activeTag ? [activeTag] : symptom.tags;
    } else {
      symptom.tags = symptom.originalTags;
    }
  }

  // Public API here
  return {
    symptoms: symptoms,
    mySymptoms: mySymptoms,
    toggle: toggle
  };
});
