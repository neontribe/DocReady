'use strict';
angular.module('docready', ['ngResource','ui.bootstrap', 'ngSanitize', 'ui.directives'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/advice', {
        templateUrl: 'views/advice.html',
        controller: 'AdviceCtrl',
        reloadOnSearch: false
      })
      .when('/tool', {
        templateUrl: 'views/picker.html',
        controller: 'PickerCtrl'
      })
      .when('/tool/picker', {
        templateUrl: 'views/picker.html',
        controller: 'PickerCtrl'
      })
      .when('/tool/picker/:tag', {
        templateUrl: 'views/picker.html',
        controller: 'PickerCtrl'
      })
      .when('/tool/checklist', {
        templateUrl: 'views/checklist.html',
        controller: 'ChecklistCtrl'
      })
      .when('/tool/export', {
        templateUrl: 'views/export.html',
        controller: 'ExportCtrl'
      })
      .otherwise({
        redirectTo: '/advice'
      });
  })
  .value('settings', {})
  .run(function(settings, $location){
    settings.svg = Modernizr.inlinesvg && !/nosvg/.test($location.absUrl());
  });
