'use strict';

angular.module('docready')
  .factory('symptomService', function ($resource, settings) {
  var symptoms = [],
    selections = [];

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

    // Populate the current state of the selections array
    _.each(data, function(sympt) {
      if (sympt.selected) {
        selections.push(sympt);
      }
    });
  }

  function exportSymptoms() {
    return _.map(selections, function(v){
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
      // add to bottom of selections
      selections.push(symptom);
    } else {
      symptom.tags = symptom.originalTags;
      // remove from selections
      selections.splice(_.indexOf(selections, symptom), 1);
    }
  }

  function add(title, tag, selected, mode) {
    var symptom = {
      title: title,
      tags: tag ? [tag] : [],
      selected: false
    },
    insertMode = mode || 'last',
    insertAt,
    tagGroup = _.filter(symptoms, function(sympt){
      return (_.indexOf(sympt.tags, tag) !== -1);
    });

    if (insertMode === 'prepend') {
      insertAt = tagGroup.length ? _.indexOf(symptoms, _.first(tagGroup)) : 0;
    } else if (mode === 'append') {
      insertAt = tagGroup.length ? _.indexOf(symptoms, _.last(tagGroup)) +1 : symptoms.length;
    } else {
      insertAt = symptoms.length;
    }

    symptoms.splice(insertAt, 0, symptom);

    if (selected) {
      toggle(symptom);
    }
  }

  // Public API here
  return {
    symptoms: symptoms,
    selections: selections,
    exportSymptoms: exportSymptoms,
    toggle: toggle,
    add: add
  };
});
