'use strict';

angular.module('docready')
  .controller('GpfinderCtrl', function ($scope, settings, $resource) {
    var Surgery = $resource(settings.apiRoot + '/gps', {range: 50});
    $scope.settings = settings;
    $scope.surgeries = [];
    $scope.params = {
        postcode: null,
        latitude: null,
        longitude: null
      };

    $scope.search = function(locate){
      if (locate) {
        navigator.geolocation.getCurrentPosition(function (position) {
          $scope.$apply(function () {
            $scope.params.longitude = position.coords.longitude;
            $scope.params.latitude = position.coords.latitude;
          });
          $scope.surgeries = Surgery.query($scope.params);
        });
      } else {
        $scope.surgeries = Surgery.query($scope.params);
      }
    };

    $scope.select = function(surgery){
      settings.surgery = surgery;
    };
  });
