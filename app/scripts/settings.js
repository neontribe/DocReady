angular.module('docready')
  .value('settings', {
    touch: Modernizr.touch,
    geo: Modernizr.geolocation,
    userData: { symptoms: [] }
  });