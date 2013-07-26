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
      .when('/press', {
        templateUrl: 'views/press.html',
        controller: 'PressCtrl'
      })
      .when('/gpfinder', {
        templateUrl: 'views/gpfinder.html',
        controller: 'GpfinderCtrl'
      })
      .otherwise({
        redirectTo: '/home'
      });
  })
  .value('settings', {
    touch: Modernizr.touch,
    geo: Modernizr.geolocation,
    userData: { symptoms: [] }
  })
  .filter('join', function() {
    return function(input, joiner) {
      var jstring = joiner || ', ';
      return input.join(jstring);
    };
  })
  .config(function(AnalyticsProvider) {
    // initial analytics configuration
    AnalyticsProvider.setAccount('UA-42308316-1');
    if (window.devMode) {
      AnalyticsProvider.setDomainName('none');
    }
    AnalyticsProvider.trackPages(true);
  })
  // Just injecting Analytics here performs its initialization
  .run(function(Analytics, settings, $location){
    // Populate userData from any 'load' 
    var load = $location.search().load;
    angular.extend(settings.userData, (load) ? JSON.parse(load) : {});

    // Prepopulate surgery details if supplied
    settings.surgery = {
      'title': $location.search().stitle,
      'a10:content': {
        's:organisationSummary': {
          's:contact': {
            's:telephone': $location.search().snumber
          }
        }
      }
    };

    // Direct dev requests to the staging api
    settings.apiRoot = ($location.host() === 'localhost') ? 'http://docready-staging.herokuapp.com/api': '/api';
  });
