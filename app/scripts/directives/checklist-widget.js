'use strict';

angular.module('docready')
  .directive('checklistWidget', function (symptomService) {
    return {
      templateUrl: 'views/checklist-widget.html',
      restrict: 'EA',
      replace: true,
      link: function postLink(scope, element, attrs) {
        scope.countOnly = (attrs.countOnly !== undefined);
        scope.checklist = symptomService.selections;
      }
    };
  });
