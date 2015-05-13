'use strict';
angular.module('docready')
  .filter('join', function() {
    return function(input, joiner) {
      var jstring = joiner || ', ';
      return input.join(jstring);
    };
  })
  .filter('first', function() {
    return function(arr) {
      return (arr && arr.length) ? arr[0] : undefined;
    };
  })
  .filter('rest', function(){
    return function(arr, start){
      var s = start  || 1;
      return (arr && arr.length) ? arr.slice(s) : [];
    };
  });