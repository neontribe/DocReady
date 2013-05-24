'use strict';

angular.module('docready')
  .controller('ExportCtrl', function ($scope, settings, symptomService, $window, $resource, $timeout) {
    var Email = $resource(settings.apiRoot + '/email');
    $scope.symptoms = symptomService.symptoms;
    $scope.showMailer = false;
    $scope.prepareMail = function(){
      $scope.showMailer = !$scope.showMailer;
      $scope.email = new Email({
        recipient: '',
        symptoms: _.chain($scope.symptoms).where({selected: true}).pluck('title').value()
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

    $scope.print = function(){
      $window.print();
    };
  });
