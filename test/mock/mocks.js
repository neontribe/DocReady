'use strict';

angular.module('docready')
  .factory('mocks', function(settings){
    var symptoms, items, topics, mailer, gps;

    symptoms = [{
      'url': 'http://docready-staging.herokuapp.com/api/symptom/1',
      'title': 'I feel tired all the time',
      'tags': ['sleep', 'enthusiasm']
    }, {
      'url': 'http://docready-staging.herokuapp.com/api/symptom/2',
      'title': 'I\'m eating too much',
      'tags': ['appetite']
    }, {
      'url': 'http://docready-staging.herokuapp.com/api/symptom/3',
      'title': 'I can\'t get to sleep at night',
      'tags': ['sleep']
    }, {
      'url': 'http://docready-staging.herokuapp.com/api/symptom/4',
      'title': 'I lose my temper too much',
      'tags': ['anxiety', 'relationships']
    }, {
      'url': 'http://docready-staging.herokuapp.com/api/symptom/5',
      'title': 'Nobody seems to like me',
      'tags': ['anxiety', 'relationships']
    }, {
      'url': 'http://docready-staging.herokuapp.com/api/symptom/7',
      'title': 'I\'m getting into debt',
      'tags': ['finances']
    }, {
      'url': 'http://docready-staging.herokuapp.com/api/symptom/8',
      'title': 'My memory is playing tricks on me',
      'tags': ['memory']
    }, {
      'url': 'http://docready-staging.herokuapp.com/api/symptom/6',
      'title': 'I\'m drinking too much',
      'tags': ['health', 'drinking', 'drug use']
    }, {
      'url': 'http://docready-staging.herokuapp.com/api/symptom/9',
      'title': 'I don\'t eat properly',
      'tags': ['appetite', 'anxiety', 'health', 'eating']
    }, {
      'url': 'http://docready-staging.herokuapp.com/api/symptom/10',
      'title': 'I can\'t get out of bed',
      'tags': ['sleep', 'enthusiasm']
    }, {
      'url': 'http://docready-staging.herokuapp.com/api/symptom/11',
      'title': 'I feel depressed',
      'tags': ['mood', 'thoughts']
    }, {
      'url': 'http://docready-staging.herokuapp.com/api/symptom/12',
      'title': 'I think about killing myself',
      'tags': ['self harm', 'thoughts']
    }, {
      'url': 'http://docready-staging.herokuapp.com/api/symptom/13',
      'title': 'I don\'t feel quite real',
      'tags': ['anxiety', 'thoughts', 'unreality']
    }, {
      'url': 'http://docready-staging.herokuapp.com/api/symptom/14',
      'title': 'I\'ve started cutting myself',
      'tags': ['self harm']
    }];
    items = [
        {
            title: 'Intro',
            slug: 'intro',
            body: '<p>Doc Ready is here to help you get ready to make a visit to the doctor.</p><p>Use our <a track-route="picker" ng-href="#/picker">checklist</a> to prepare a list of things you\'d like to talk to a doctor about so you can take it with you.</p>',
            topic: 'what-can-a-gp-help-with',
            weight: 1.0
          },
          {
            title: 'Item 2',
            slug: 'item-2',
            body: '<strong>Blah</strong>',
            topic: 'know-your-rights',
            weight: 2.0
          },
          {
            title: 'Item 3',
            slug: 'item-3',
            body: 'Blah blah',
            topic: 'know-your-rights',
            weight: 3.0
          },
          {
            title: 'Item 4',
            slug: 'item-4',
            body: 'Blah blah',
            topic: 'know-your-rights',
            weight: 4.0
          }
        ];

    topics = [
        {
            title: 'What can a GP help with?',
            slug: 'what-can-a-gp-help-with',
            weight: 1.0
          },
          {
            title: 'Know your rights',
            slug: 'know-your-rights',
            weight: 2.0
          },
          {
            title: 'Confidentiality',
            slug: 'confidentiality',
            weight: 3.0
          },
          {
            title: 'Getting the most out of your appointment',
            slug: 'getting-the-most-out-of-your-appointment',
            weight: 4.0
          },
          {
            title: 'How to give feedback',
            slug: 'how-to-give-feedback',
            weight: 5.0
          },
          {
            title: 'How to find a GP',
            slug: 'how-to-find-a-gp',
            weight: 6.0
          }
        ];
    mailer = {};

    gps = [{'guid': {'@isPermaLink': 'false', '#text': 'http://v1.syndication.nhschoices.nhs.uk/organisations/gppractices/5784'}, 'link': 'http://www.nhs.uk/Services/GP/Overview/DefaultView.aspx?id=39428', 'title': 'Dr Lennox & Partners', 'a10:link': {'@rel': 'self', '@title': 'Dr Lennox & Partners', '@href': 'http://v1.syndication.nhschoices.nhs.uk/organisations/gppractices/5784?apikey=WUNSDMAH'}, 'a10:content': {'@type': 'application/xml', 's:organisationSummary': {'s:name': 'Dr Lennox & Partners', 's:odsCode': 'D82004', 's:address': {'s:addressLine': ['Overstrand Road', 'Cromer', 'Norfolk'], 's:postcode': 'NR27 0AJ'}, 's:contact': {'@type': 'General', 's:telephone': '01263 513148', 's:email': 'sara.ponder@gp-d82004.nhs.uk'}, 's:geographicCoordinates': {'s:longitude': '1.30589282512665', 's:latitude': '52.9275588989258'}, 's:Distance': '3.08421318656155'}}}, {'guid': {'@isPermaLink': 'false', '#text': 'http://v1.syndication.nhschoices.nhs.uk/organisations/gppractices/5928'}, 'link': 'http://www.nhs.uk/Services/GP/Overview/DefaultView.aspx?id=35763', 'title': 'Aldborough Surgery', 'a10:link': {'@rel': 'self', '@title': 'Aldborough Surgery', '@href': 'http://v1.syndication.nhschoices.nhs.uk/organisations/gppractices/5928?apikey=WUNSDMAH'}, 'a10:content': {'@type': 'application/xml', 's:organisationSummary': {'s:name': 'Aldborough Surgery', 's:odsCode': 'D82628', 's:address': {'s:addressLine': ['Chapel Road', 'Aldborough', 'Norwich', 'Norfolk'], 's:postcode': 'NR11 7NP'}, 's:contact': {'@type': 'General', 's:telephone': '01263 768602/768184', 's:email': 'aldborough.surgery@nhs.net'}, 's:geographicCoordinates': {'s:longitude': '1.24738776683807', 's:latitude': '52.8617248535156'}, 's:Distance': '5.35442566973301'}}}, {'guid': {'@isPermaLink': 'false', '#text': 'http://v1.syndication.nhschoices.nhs.uk/organisations/gppractices/5785'}, 'link': 'http://www.nhs.uk/Services/GP/Overview/DefaultView.aspx?id=35283', 'title': 'Dr Sampson P & Partners', 'a10:link': {'@rel': 'self', '@title': 'Dr Sampson P & Partners', '@href': 'http://v1.syndication.nhschoices.nhs.uk/organisations/gppractices/5785?apikey=WUNSDMAH'}, 'a10:content': {'@type': 'application/xml', 's:organisationSummary': {'s:name': 'Dr Sampson P & Partners', 's:odsCode': 'D82005', 's:address': {'s:addressLine': ['Cromer Road', 'Sheringham', 'Norfolk'], 's:postcode': 'NR26 8RT'}, 's:contact': {'@type': 'General', 's:telephone': '01263 822066'}, 's:geographicCoordinates': {'s:longitude': '1.21447694301605', 's:latitude': '52.9390640258789'}, 's:Distance': '6.80170169075711'}}}, {'guid': {'@isPermaLink': 'false', '#text': 'http://v1.syndication.nhschoices.nhs.uk/organisations/gppractices/5852'}, 'link': 'http://www.nhs.uk/Services/GP/Overview/DefaultView.aspx?id=43816', 'title': 'Dr Harris-Hall & Partners', 'a10:link': {'@rel': 'self', '@title': 'Dr Harris-Hall & Partners', '@href': 'http://v1.syndication.nhschoices.nhs.uk/organisations/gppractices/5852?apikey=WUNSDMAH'}, 'a10:content': {'@type': 'application/xml', 's:organisationSummary': {'s:name': 'Dr Harris-Hall & Partners', 's:odsCode': 'D82053', 's:address': {'s:addressLine': ['Munhaven Close', 'Mundesley', 'Norfolk'], 's:postcode': 'NR11 8AR'}, 's:contact': {'@type': 'General', 's:telephone': '01263 724500', 's:email': 'mundesley.medicalcentre@nhs.net'}, 's:geographicCoordinates': {'s:longitude': '1.42976319789886', 's:latitude': '52.8754768371582'}, 's:Distance': '9.60130107284538'}}}, {'guid': {'@isPermaLink': 'false', '#text': 'http://v1.syndication.nhschoices.nhs.uk/organisations/gppractices/5863'}, 'link': 'http://www.nhs.uk/Services/GP/Overview/DefaultView.aspx?id=36356', 'title': 'Dr Everden & Partners', 'a10:link': {'@rel': 'self', '@title': 'Dr Everden & Partners', '@href': 'http://v1.syndication.nhschoices.nhs.uk/organisations/gppractices/5863?apikey=WUNSDMAH'}, 'a10:content': {'@type': 'application/xml', 's:organisationSummary': {'s:name': 'Dr Everden & Partners', 's:odsCode': 'D82059', 's:address': {'s:addressLine': ['Park Lane', 'North Walsham', 'Norfolk'], 's:postcode': 'NR28 0BQ'}, 's:contact': {'@type': 'General', 's:telephone': '01692 402035', 's:email': 'birchwood.surgery@fsmail.net'}, 's:geographicCoordinates': {'s:longitude': '1.38228046894073', 's:latitude': '52.8192825317383'}, 's:Distance': '10.8768111170187'}}}, {'guid': {'@isPermaLink': 'false', '#text': 'http://v1.syndication.nhschoices.nhs.uk/organisations/gppractices/5874'}, 'link': 'http://www.nhs.uk/Services/GP/Overview/DefaultView.aspx?id=42880', 'title': 'Paston Surgery', 'a10:link': {'@rel': 'self', '@title': 'Paston Surgery', '@href': 'http://v1.syndication.nhschoices.nhs.uk/organisations/gppractices/5874?apikey=WUNSDMAH'}, 'a10:content': {'@type': 'application/xml', 's:organisationSummary': {'s:name': 'Paston Surgery', 's:odsCode': 'D82066', 's:address': {'s:addressLine': ['9-11 Park Lane', 'North Walsham', 'Norfolk'], 's:postcode': 'NR28 0BQ'}, 's:contact': {'@type': 'General', 's:telephone': '01692 403015'}, 's:geographicCoordinates': {'s:longitude': '1.38228046894073', 's:latitude': '52.8192825317383'}, 's:Distance': '10.8768111170187'}}}, {'guid': {'@isPermaLink': 'false', '#text': 'http://v1.syndication.nhschoices.nhs.uk/organisations/gppractices/5781'}, 'link': 'http://www.nhs.uk/Services/GP/Overview/DefaultView.aspx?id=43699', 'title': 'Dr Brooks & Partners', 'a10:link': {'@rel': 'self', '@title': 'Dr Brooks & Partners', '@href': 'http://v1.syndication.nhschoices.nhs.uk/organisations/gppractices/5781?apikey=WUNSDMAH'}, 'a10:content': {'@type': 'application/xml', 's:organisationSummary': {'s:name': 'Dr Brooks & Partners', 's:odsCode': 'D82001', 's:address': {'s:addressLine': ['Old Cromer Road', 'High Kelling', 'Holt', 'Norfolk'], 's:postcode': 'NR25 6QA'}, 's:contact': {'@type': 'General', 's:telephone': '01263 712461'}, 's:geographicCoordinates': {'s:longitude': '1.11590504646301', 's:latitude': '52.9138145446777'}, 's:Distance': '12.0308075226718'}}}, {'guid': {'@isPermaLink': 'false', '#text': 'http://v1.syndication.nhschoices.nhs.uk/organisations/gppractices/5819'}, 'link': 'http://www.nhs.uk/Services/GP/Overview/DefaultView.aspx?id=43404', 'title': 'Aylsham Surgery', 'a10:link': {'@rel': 'self', '@title': 'Aylsham Surgery', '@href': 'http://v1.syndication.nhschoices.nhs.uk/organisations/gppractices/5819?apikey=WUNSDMAH'}, 'a10:content': {'@type': 'application/xml', 's:organisationSummary': {'s:name': 'Aylsham Surgery', 's:odsCode': 'D82030', 's:address': {'s:addressLine': ['60 Hungate Street', 'Aylsham', 'Norwich', 'Norfolk'], 's:postcode': 'NR11 6AA'}, 's:contact': {'@type': 'General', 's:telephone': '01263 733693', 's:email': 'andrew.coytemckenzie@nhs.net (non clinical matters)'}, 's:geographicCoordinates': {'s:longitude': '1.24970388412476', 's:latitude': '52.7933120727539'}, 's:Distance': '12.3342601696303'}}}, {'guid': {'@isPermaLink': 'false', '#text': 'http://v1.syndication.nhschoices.nhs.uk/organisations/gppractices/5798'}, 'link': 'http://www.nhs.uk/Services/GP/Overview/DefaultView.aspx?id=43703', 'title': 'The Market Surgery', 'a10:link': {'@rel': 'self', '@title': 'The Market Surgery', '@href': 'http://v1.syndication.nhschoices.nhs.uk/organisations/gppractices/5798?apikey=WUNSDMAH'}, 'a10:content': {'@type': 'application/xml', 's:organisationSummary': {'s:name': 'The Market Surgery', 's:odsCode': 'D82016', 's:address': {'s:addressLine': ['26 Norwich Road', 'Aylsham', 'Norwich', 'Norfolk'], 's:postcode': 'NR11 6BW'}, 's:contact': {'@type': 'General', 's:telephone': '01263 733331', 's:email': 'fionahinton@nhs.net'}, 's:geographicCoordinates': {'s:longitude': '1.25394451618195', 's:latitude': '52.7904968261719'}, 's:Distance': '12.5734924753196'}}}, {'guid': {'@isPermaLink': 'false', '#text': 'http://v1.syndication.nhschoices.nhs.uk/organisations/gppractices/5853'}, 'link': 'http://www.nhs.uk/Services/GP/Overview/DefaultView.aspx?id=44010', 'title': 'Dr Harris-Hall & Partners', 'a10:link': {'@rel': 'self', '@title': 'Dr Harris-Hall & Partners', '@href': 'http://v1.syndication.nhschoices.nhs.uk/organisations/gppractices/5853?apikey=WUNSDMAH'}, 'a10:content': {'@type': 'application/xml', 's:organisationSummary': {'s:name': 'Dr Harris-Hall & Partners', 's:odsCode': 'D82053', 's:address': {'s:addressLine': ['Coast Road', 'Bacton', 'Mundesley', 'Norfolk'], 's:postcode': 'NR12 0EW'}, 's:contact': {'@type': 'General', 's:telephone': '01263 724500', 's:email': 'mundesley.medicalcentre@nhs.net'}, 's:geographicCoordinates': {'s:longitude': '1.47697973251343', 's:latitude': '52.8525199890137'}, 's:Distance': '13.4805814186712'}}}];

    function registerMocks($httpBackend) {
      $httpBackend.whenGET(settings.apiRoot + '/advice_topic').respond(topics);
      $httpBackend.whenGET(settings.apiRoot + '/advice_item').respond(items);
      $httpBackend.whenGET(settings.apiRoot + '/symptom').respond(symptoms);
      $httpBackend.whenGET(settings.apiRoot + '/gps').respond(gps);
      $httpBackend.whenPOST(settings.apiRoot + '/email').respond(function(){
        return [200];
      });
    }

    return {
      registerMocks: registerMocks,
      data: {
        symptoms: symptoms,
        topics: topics,
        items: items,
        gps: gps
      }
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
                  }, (method === 'POST') ? 1500 : 0);
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
});

angular.element(document).find('body').attr('data-ng-app', 'docreadyTest');