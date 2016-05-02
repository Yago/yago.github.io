'use strict';
/**
 * Import plugins
 */
var gulp          = require('gulp'),
    $             = require('gulp-load-plugins')(),
    config        = require('./gulp_config.json'),
    runSequence   = require('run-sequence');


require(config.tasks + 'vendors')();            // $ gulp vendors
require(config.tasks + 'images')();             // $ gulp img
require(config.tasks + 'styles')();             // $ gulp styles
require(config.tasks + 'scripts')();            // $ gulp scripts
require(config.tasks + 'fonts')();              // $ gulp fonts
require(config.tasks + 'icons')();              // $ gulp icons
require(config.tasks + 'favicons')();           // $ gulp favicons
require(config.tasks + 'clean')();              // $ gulp clean
require(config.tasks + 'server')();             // $ gulp serve
require(config.tasks + 'metalsmith')();         // $ gulp metalsmith
require(config.tasks + 'gh-pages')();           // $ gulp deploy
require(config.tasks + 'tests-regression')();   // $ gulp regression
require(config.tasks + 'tests-unit')();         // $ gulp test:unit
require(config.tasks + 'tests-navigation')();   // $ gulp test:navigation


/**
 * Init project
 */
gulp.task('init', function() {
  return gulp.src('node_modules/bootstrap-sass/assets/stylesheets/bootstrap/_variables.scss')
    .pipe($.rename('bootstrap-variables.scss'))
    .pipe(gulp.dest(config.assets + 'sass/'));
});


/**
 * Task to build assets on production server
 */
gulp.task('build',['clean'], function() {
  return gulp.start('vendors', 'styles', 'img', 'scripts', 'fonts', 'icons', 'metalsmith');
});


/**
 * Default task
 */
gulp.task('default', ['clean'], function(done){
  runSequence(['css-vendors', 'js-vendors', 'headjs-vendors', 'fonts-vendors', 'polyfills-vendors', 'img', 'fonts', 'icons', 'styles', 'scripts'], 'favicons', 'metalsmith', done);
});
