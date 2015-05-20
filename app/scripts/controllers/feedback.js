'use strict';

angular.module('docready')
  .controller('FeedbackCtrl', function ($scope, settings, $http, $resource, Analytics, $location) {
    var Feedback = $resource(settings.apiRoot + '/feedback');
    $scope.feedback = new Feedback({});

    $scope.sendFeedback = function(){
      $scope.feedback.state = 'sending';
      $scope.feedback.$save(function(){
        $scope.feedback.state = 'sent';
      });
    };

    $scope.track = function(type){
      Analytics.trackPage($location.path() + '/' + type);
    };

  });