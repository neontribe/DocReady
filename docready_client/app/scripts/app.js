'use strict';

var docready = angular.module('docready', ['ngResource','ui.bootstrap', 'ngSanitize'])
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
