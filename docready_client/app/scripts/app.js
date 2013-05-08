'use strict';

angular.module('docready', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/advice.html',
        controller: 'AdviceCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
