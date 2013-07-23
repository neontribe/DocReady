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
    sizeParams: '?width=350px&height=450px',
    sizes: [
      { label: 'auto', value: ''},
      { label: '350x450', value: '?width=350px&height=450px'},
      { label: '750x1200', value: '?width=750px&height=1200px'}
    ]
  })
  .controller('genCtrl', function ($scope, settings){
    $scope.settings = settings;
    $scope.settings.scriptUrl = settings.scriptPath + settings.scriptName;
    $scope.gen = function(){
      angular.element('.demo').html(angular.element('.embed').val());
    };
  })
  // Just injecting Analytics here performs its initialization
  .run(function(Analytics, settings, $location){
    settings.scriptPath = $location.absUrl().split('generator.html')[0];
  });