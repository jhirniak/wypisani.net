/**
 *  Welcome to your gulpfile!
 *  The gulp tasks are splitted in several files in the gulp directory
 *  because putting all here was really too long
 */

'use strict';

var gulp = require('gulp');
var wrench = require('wrench');

/**
 *  This will load all js or coffee files in the gulp directory
 *  in order to load all gulp tasks
 */
wrench.readdirSyncRecursive('./gulp').filter(function(file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
  require('./gulp/' + file);
});


/**
 *  Default task clean temporaries directories and launch the
 *  main optimization build task
 */
gulp.task('default', ['clean'], function () {
  gulp.start('build');
});


var gulp = require('gulp');
var gls = require('gulp-live-server');
gulp.task('serve', function() {
  //1. serve with default settings
  var server = gls.static(); //equals to gls.static('public', 3000);
  server.start();

  //2. serve at custom port
  var server = gls.static('dist', 8888);
  server.start();

  //3. serve multi folders
  var server = gls.static(['dist', '.tmp']);
  server.start();

  //use gulp.watch to trigger server actions(notify, start or stop)
  gulp.watch(['static/**/*.css', 'static/**/*.html'], function () {
    server.notify.apply(server, arguments);
  });
});
