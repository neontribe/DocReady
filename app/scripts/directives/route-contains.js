'use strict';

angular.module('docready')
  .directive('routeContains', function ($location) {
    return {
      restrict: 'AC',
      scope: true,
      link: function postLink(scope, element, attrs) {
        var matcher = new RegExp(attrs.routeContains);
        function checkRoute(){
          scope.$routeContains = matcher.test($location.path());
        }
        scope.$on('$locationChangeSuccess', function() {
          checkRoute();
        });
        // init
        checkRoute();
      }
    };
  });
