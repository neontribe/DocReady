'use strict';

angular.module('docready')
  .directive('addSymptom', function () {
    return {
      transclude: true,
      templateUrl: 'views/add-symptom.html',
      restrict: 'EA',
      scope: {
        symptoms: '=',
        tag: '@',
        buttonText: '@'
      },
      link: function link(scope, element, attrs) {
        scope.sympt = '';
        attrs.buttonText = attrs.buttonText || '+';
        scope.buttonT = attrs.buttonText;
        scope.add = function (){
          var symptom = {
            title: scope.sympt,
            selected: true,
            tags: scope.tag ? [scope.tag] : []
          };
          scope.symptoms.push(symptom);
          scope.sympt = '';
        };
      }
    };
  });
