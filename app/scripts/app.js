'use strict';
angular.module('docready', ['ngResource','ui.bootstrap', 'ngSanitize', 'ui.directives','angular-google-analytics'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/advice', {
        templateUrl: 'views/advice.html',
        controller: 'AdviceCtrl',
        reloadOnSearch: false
      })
      .when('/picker', {
        templateUrl: 'views/picker.html',
        controller: 'PickerCtrl'
      })
      .when('/picker/:tag', {
        templateUrl: 'views/picker.html',
        controller: 'PickerCtrl'
      })
      .when('/checklist', {
        templateUrl: 'views/checklist.html',
        controller: 'ChecklistCtrl'
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
      .when('/feedback', {
        templateUrl: 'views/feedback.html',
        controller: 'FeedbackCtrl'
      })
      .otherwise({
        redirectTo: '/home'
      });
  });
