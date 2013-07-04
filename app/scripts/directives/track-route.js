'use strict';

angular.module('docready')
  .directive('trackRoute', function ($location) {
    return {
      restrict: 'A',
      scope: true,
      link: function postLink(scope, element, attrs) {
        var matcher = new RegExp(attrs.trackRoute);
        scope.$on('$locationChangeSuccess', function() {
          if (matcher.test($location.path())) {
            element.attr('href', '#' + $location.url());
          }
        });
      }
    };
  });
