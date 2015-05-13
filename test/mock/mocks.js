'use strict';

angular.module('docready')
  .factory('mocks', function(settings){
    
    function registerMocks($httpBackend) {
      $httpBackend.whenPOST(settings.apiRoot + '/email').respond(function(){
        return [200];
      });
    }

    return {
      registerMocks: registerMocks
    };
  });

angular.module('docreadyTest', ['docready', 'ngMockE2E'])
// add a 700ms delay to all mocked requests
.config(function($provide) {
    $provide.decorator('$httpBackend', function($delegate) {
        var proxy = function(method, url, data, callback, headers) {
            var interceptor = function() {
                var _this = this,
                    _arguments = arguments;
                setTimeout(function() {
                    callback.apply(_this, _arguments);
                  }, (method === 'POST') ? 1500 : 700);
              };
            return $delegate.call(this, method, url, data, interceptor, headers);
          };
        for(var key in $delegate) {
          proxy[key] = $delegate[key];
        }
        return proxy;
      });
  })
.run(function($httpBackend, mocks) {
  mocks.registerMocks($httpBackend);
  $httpBackend.whenGET().passThrough();
  $httpBackend.whenPOST().passThrough();
});

angular.element(document).find('body').attr('data-ng-app', 'docreadyTest');