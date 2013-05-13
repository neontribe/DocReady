'use strict';
angular.module('docready', ['ngResource','ui.bootstrap', 'ngSanitize'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/advice', {
        templateUrl: 'views/advice.html',
        controller: 'AdviceCtrl'
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
  .value('userData', { checklist:[] });
