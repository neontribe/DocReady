'use strict';

angular.module('docready')
  .controller('MainCtrl', function ($scope, $route) {
    /**
     * A quick transition wrangler awaiting refactoring
     * @return {Object} [an object decribing enter and leave transitions]
     */
    $scope.getTransition = function(){
      var current = $route.current || null,
        reverse = {
          'Left': 'Right',
          'Right': 'Left'
        }, from, anim;

      from = current ? current.$$route.animateFrom : null;
      if (from) {
        anim = {
          enter:'animated fadeIn'+from+'Big',
          leave:'animated fadeOut'+reverse[from]+'Big'
        };
      } else {
        anim ={
          enter:'animated fadeIn',
          leave:'animated fadeOut'
        };
      }
      return anim;
    };
  });
