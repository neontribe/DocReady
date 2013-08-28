// Karma configuration

// base path, that will be used to resolve files and exclude
basePath = '';

// list of files / patterns to load in the browser
files = [
  JASMINE,
  JASMINE_ADAPTER,
  'test/libs/*.js',
  'app/components/modernizr/modernizr.js',
  'app/components/jquery/jquery.js',
  'app/components/jquery-ui/ui/jquery-ui.js',
  'app/components/angular-unstable/angular.js',
  'app/components/angular-resource-unstable/angular-resource.js',
  'app/components/angular-sanitize-unstable/index.js',
  'app/components/angular-mocks-unstable/index.js',
  'app/components/lodash/dist/lodash.underscore.js',
  'app/components/angular-ui/common/module.js',
  'app/components/angular-ui/modules/directives/sortable/sortable.js',
  'app/components/angular-google-analytics/src/angular-google-analytics.js',
  'app/scripts/*.js',
  'app/scripts/**/*.js',
  'test/mock/**/*.js',
  'test/spec/**/*.js'
];

preprocessors = {
  'app/scripts/*.js' : 'coverage',
  'app/scripts/**/*.js': 'coverage'
};

// list of files to exclude
exclude = [];

// test results reporter to use
// possible values: dots || progress || growl
reporters = ['progress', 'coverage'];

// web server port
port = 8080;

// cli runner port
runnerPort = 9100;

// enable / disable colors in the output (reporters and logs)
colors = true;

// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_INFO;

// enable / disable watching file and executing tests whenever any file changes
autoWatch = true;


process.env['PHANTOMJS_BIN'] = './node_modules/.bin/phantomjs';
// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
browsers = ['PhantomJS'];

// If browser does not capture in given timeout [ms], kill it
captureTimeout = 5000;

// Continuous Integration mode
// if true, it capture browsers, run tests and exit
singleRun = false;
