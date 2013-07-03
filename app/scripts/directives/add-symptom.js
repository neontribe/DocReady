'use strict';

angular.module('docready')
  .directive('addSymptom', function (symptomService) {
    return {
      transclude: true,
      templateUrl: 'views/add-symptom.html',
      restrict: 'EA',
      scope: {
        tag: '@',
        buttonText: '@'
      },
      link: function link(scope, element, attrs) {
        scope.sympt = '';
        attrs.buttonText = attrs.buttonText || '+';
        scope.buttonT = attrs.buttonText;
        scope.placeholder = attrs.placeholder || '';
        var mode = attrs.mode || false;
        scope.add = function (){
          symptomService.add(scope.sympt, scope.tag, true, mode);
          scope.sympt = '';
        };
      }
    };
  });
