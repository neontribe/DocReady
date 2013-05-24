'use strict';

angular.module('docready')
  .controller('ExportCtrl', function ($scope, settings, symptomService, $window, $resource, $timeout) {
    var Email = $resource(settings.apiRoot + '/email');
    $scope.symptoms = symptomService.symptoms;

    $scope.prepareMail = function(){
      // Toggle our email object
      if ($scope.email) {
        $scope.email = null;
      } else {
        $scope.email = new Email({
          recipient: '',
          symptoms: _.chain($scope.symptoms).where({selected: true}).pluck('title').value()
        });
      }
    };
    $scope.sendEmail = function(){
      $scope.email.state = 'sending';
      $scope.email.$save(function(){
        $scope.email.state = 'sent';
        // close the send dialog after showing the sent state for a while
        $timeout(function(){ $scope.email = null; }, 1000);
      });
    };

    $scope.print = function(){
      $window.print();
    };
  });
