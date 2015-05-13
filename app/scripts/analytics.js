'use strict';
angular.module('docready').config(function(AnalyticsProvider, custom_config) {
    AnalyticsProvider.setAccount(custom_config.ga_code);
    AnalyticsProvider.trackPages(true);
  });