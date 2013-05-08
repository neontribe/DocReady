'use strict';

angular.module('docready', ['ngResource'])
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
