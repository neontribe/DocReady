'use strict';
angular.module('generator', ['angular-google-analytics'])
  .config(function(AnalyticsProvider) {
    // initial analytics configuration
    AnalyticsProvider.setAccount('UA-42308316-1');
    if (window.devMode) {
      AnalyticsProvider.setDomainName('none');
    }
    AnalyticsProvider.trackPages(true);
  })
  .value('settings', {
    scriptName: 'docready.js',
    params: {
      width: null,
      height: null,
      stitle: null,
      snumber: null
    }
  })
  .controller('genCtrl', function ($scope, settings){
    $scope.settings = settings;
    $scope.settings.scriptUrl = settings.scriptPath + settings.scriptName;
    $scope.query = '';
    $scope.$watch('settings.params', function(obj){
      var str = [];
      for(var p in obj){
        if (obj.hasOwnProperty(p)) {
          if (obj[p]) {
            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
          }
        }
      }
      $scope.query = '?' + str.join('&');
    }, true);
    $scope.gen = function(){
      angular.element('.demo').html(angular.element('.embed').val());
    };
  })
  // Just injecting Analytics here performs its initialization
  .run(function(Analytics, settings, $location){
    settings.scriptPath = $location.absUrl().split('generator.html')[0];
  });