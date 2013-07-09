'use strict';

angular.module('docready')
  .controller('ExportCtrl', function ($scope, settings, symptomService, $window, $resource, $timeout, Analytics, $location) {
    var Email = $resource(settings.apiRoot + '/email');
    $scope.selections = symptomService.selections;
    $scope.showMailer = false;
    $scope.prepareMail = function(){
      $scope.showMailer = !$scope.showMailer;
      $scope.email = new Email({
        recipient: '',
        symptoms: _.chain(symptomService.exportSymptoms()).pluck('title').value(),
        permalink: $scope.permalink()
      });
    };
    $scope.sendEmail = function(){
      $scope.email.state = 'sending';
      $scope.email.$save(function(){
        $scope.email.state = 'sent';
        // close the send dialog after showing the sent state for a while
        $timeout(function(){ $scope.showMailer = false; }, 1000);
      });
    };
    $scope.getpdf = function(){
      var data = JSON.stringify({
        symptoms: _.chain(symptomService.exportSymptoms()).pluck('title').value(),
        permalink: $scope.permalink()
      });
      return settings.apiRoot + '/pdf?data=' + encodeURIComponent(data);
    };

    $scope.permalink = function(){
      var persist = JSON.stringify({
        symptoms: symptomService.exportSymptoms()
      });
      return '/#/checklist?load=' + encodeURIComponent(persist);
    };

    $scope.print = function(){
      $window.print();
    };

    $scope.track = function(type){
      Analytics.trackPage($location.path() + '/' + type);
    };

  });
