'use strict';
angular.module('docready')
  .run(function(Analytics, custom_config, settings, $window, $location, $rootScope, $timeout){
    $window.document.title = custom_config.app_name;

    // Populate userData from any 'load' 
    var load = $location.search().load;
    angular.extend(settings.userData, (load) ? JSON.parse(load) : {});

    // Prepopulate surgery details if supplied
    settings.surgery = {
      'title': $location.search().stitle,
      'a10:content': {
        's:organisationSummary': {
          's:contact': {
            's:telephone': $location.search().snumber
          }
        }
      }
    };

    // Direct dev requests to the api (currently simple statics)
    settings.apiRoot = '/api';

    // a11y hacks
    $rootScope.$on('$locationChangeSuccess', function() {
      $('#page').removeAttr('aria-live');
      $timeout(function() {
        $('#page').focus();
        $('#page').attr('aria-live', 'assertive');
      }, 1000);
    });
    // SOme jQuery to make it more accessible. Define "ugly" :-P
    $('body').on('focus', 'input[type="checkbox"]', function() {
      $(this).parents('label').css('background', '#FEF5DA');
    });
    $('body').on('blur', 'input[type="checkbox"]', function() {
      $(this).parents('label').css('background', '#fff');
    });
  });