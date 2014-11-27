var fs = Npm.require('fs');
var packageJson = JSON.parse(fs.readFileSync('vide.jquery.json'));
var packageName = 'vodkabears:vide';
var where = 'client';

Package.describe({
    git: 'https://github.com/VodkaBears/Vide',
    name: packageName,
    summary: 'Easy as hell jQuery plugin for video backgrounds',
    version: packageJson.version
});

Package.onUse(function(api) {
    api.versionsFrom('1.0');
    api.use('jquery', where);
    api.addFiles('dist/jquery.vide.js', where);
});

Package.onTest(function(api) {
    api.use(packageName, where);
    api.use('tinytest', where);
    api.addFiles('meteor/test.js', where);
});
