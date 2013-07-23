'use strict';

angular.module('docready')
  .directive('checklistWidget', function (symptomService, $animator) {
    return {
      templateUrl: 'views/checklist-widget.html',
      restrict: 'EA',
      replace: true,
      link: function postLink(scope, element, attrs) {
        var animator = $animator(scope, attrs);
        scope.countOnly = (attrs.countOnly !== undefined);
        scope.checklist = symptomService.selections;
        scope.$watch('checklist.length', function(newVal, oldVal){
          animator.animate((newVal > oldVal ? 'itemAdded' : 'itemRemoved'), element);
          if(!scope.$$phase) {
            scope.$apply();
          }
        });
      }
    };
  });
