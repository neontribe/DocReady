'use strict';

angular.module('docready')
  .directive('activePage', function () {
    return {
      restrict: 'A',
      link: function link(scope, element, attrs) {
        var urlStr = window.location.href;
        var hrefStr = element.attr('href');
        if (urlStr.indexOf("/tool") > -1 && hrefStr.indexOf("/tool") > -1) {
          element.addClass('active');
        }
        if (urlStr.indexOf("/advice") > -1 && hrefStr.indexOf("/info") > -1) {
          element.addClass('active');
        }
      }
    };
  });
