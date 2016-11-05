Package.describe({
  documentation: 'Meteor.md',
  git: 'https://github.com/VodkaBears/Vide.git',
  name: 'vodkabears:vide',
  summary: 'Easy as hell jQuery plugin for video backgrounds',
  version: '0.5.1'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.use('jquery', 'client');
  api.addFiles('dist/jquery.vide.js', 'client');
});

Package.onTest(function(api) {
  api.use('vodkabears:vide', 'client');
  api.use('tinytest', 'client');
  api.addFiles('test/meteor_test.js', 'client');
});
