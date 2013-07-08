/* global devMode */
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
        redirectTo: '/home'
      });
  })
  .value('settings', {
    userData: { symptoms: [] }
  })
  .config(function(AnalyticsProvider) {
    // initial analytics configuration
    AnalyticsProvider.setAccount('UA-42308316-1');
    if (devMode) {
      AnalyticsProvider.setDomainName('none');
    }
    AnalyticsProvider.trackPages(true);
  })
  // Just injecting Analytics here performs its initialization
  .run(function(Analytics, settings, $location){
    // Populate userData from any 'load' 
    var load = $location.search().load;
    angular.extend(settings.userData, (load) ? JSON.parse(load) : {});
    settings.apiRoot = ($location.host() === 'localhost') ? 'http://docready-staging.herokuapp.com/api': '/api';
  });
