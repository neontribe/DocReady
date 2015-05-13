'use strict';
angular.module('docready', ['ngResource','ui.bootstrap', 'ngSanitize', 'ui.directives','angular-google-analytics'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        animateFrom: 'Left'
      })
      .when('/advice', {
        templateUrl: 'views/advice.html',
        controller: 'AdviceCtrl',
        reloadOnSearch: false,
        animateFrom: 'Left'
      })
      .when('/picker', {
        templateUrl: 'views/picker.html',
        controller: 'PickerCtrl',
        animateFrom: 'Right'
      })
      .when('/picker/:tag', {
        templateUrl: 'views/picker.html',
        controller: 'PickerCtrl'
      })
      .when('/checklist', {
        templateUrl: 'views/checklist.html',
        controller: 'ChecklistCtrl',
        animateFrom: 'Right'
      })
      .when('/checklist/export', {
        templateUrl: 'views/export.html',
        controller: 'ExportCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl'
      })
      .when('/gpfinder', {
        templateUrl: 'views/gpfinder.html',
        controller: 'GpfinderCtrl'
      })
      .otherwise({
        redirectTo: '/home'
      });
  });
