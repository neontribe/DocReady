'use strict';
angular.module('docready', ['ngResource','ui.bootstrap', 'ngSanitize', 'ui.directives'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/advice', {
        templateUrl: 'views/advice.html',
        controller: 'AdviceCtrl',
        reloadOnSearch: false,
        animateFrom: 'Left'
      })
      .when('/tool', {
        templateUrl: 'views/picker.html',
        controller: 'PickerCtrl',
        animateFrom: 'Right'
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
  .value('settings', {
    userData: { symptoms: [] }
  })
  .run(function(settings, $location){
    // Populate userData from any 'load' 
    var load = $location.search().load;
    angular.extend(settings.userData, (load) ? JSON.parse(load) : {});
    settings.svg = Modernizr.inlinesvg && !/nosvg/.test($location.absUrl());
    settings.apiRoot = ($location.host() === 'localhost') ? 'http://docready-staging.herokuapp.com/api': '/api';
  });
