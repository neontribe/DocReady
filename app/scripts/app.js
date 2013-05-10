'use strict';
angular.module('docready', ['ngResource','ui.bootstrap', 'ngSanitize'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/advice', {
        templateUrl: 'views/advice.html',
        controller: 'AdviceCtrl'
      })
      .when('/tool', {
        templateUrl: 'views/tool.html',
        controller: 'ToolCtrl'
      })
      .otherwise({
        redirectTo: '/advice'
      });
  });
