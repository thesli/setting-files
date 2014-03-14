
// this allows us to load this file either directly in to
// an html file before requireJs is loaded (it'll use window.require = conf)
// or as a mainConfigurationFile for the grunt-contrib-requirejs
// optimizer
window.require = window.require || {};
require.config = require.config || function(conf) {
  window.require = conf;
};

require.config({
  baseUrl: "../scripts/",
  shim: {
    'controllers/application': {
      deps: [
      'qowtRoot/lib/framework/framework',
      'third_party/googleAnalytics/google-analytics-bundle'
      ]
    },
    'qowtRoot/qowt': {
      deps: ['qowtRoot/lib/framework/framework']
    },
    'qowtRoot/features/utils': {
    deps: ['configs/chromeFeatures']
    }
  },
  paths: {
    // NOTE: paths are relative to app/views/qowt.html

    // note: monkey server is not included in a release build; but in
    // order to keep the optimiser happy, it needs to at the minimum
    // point to a valid file; even if it's not used
    'monkeyTests': '../scripts/lib/qowt/monkeyMock/_allTests',
    'monkeyClient': '../scripts/lib/qowt/monkeyMock/monkeyClient',
    'monkeyAppClient': '../scripts/lib/qowt/monkeyMock/monkeyAppClient',

    // set the qowt root
    "qowtRoot": "../scripts/lib/qowt",

    // set the variant to chrome
    "qowtRoot/variants": "../scripts/lib/qowt/variants/chrome"
  }
});

