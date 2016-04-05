'use strict';

var gulp          = require('gulp'),
    $             = require('gulp-load-plugins')(),
    config        = require('../gulp_config.json'),
    runSequence   = require('run-sequence');

module.exports = function() {

 /*
  * Build font stylesheet base on raw fonts
  */
  gulp.task('bold', function(){
    return gulp.src(config.fonts + '/CalaBol-webfont.*')
      .pipe($.inlineFonts({
        name: 'Cala',
        weight: 'bold',
        formats: ['ttf', 'eot', 'svg', 'woff', 'woff2']
      }))
      .pipe($.concat('cala-bold.css'))
      .pipe(gulp.dest(config.build + 'css'));
  });

  gulp.task('italic', function(){
    return gulp.src(config.fonts + '/CalaIta-webfont.*')
      .pipe($.inlineFonts({
        name: 'Cala',
        style: 'italic',
        weight: 'normal',
        formats: ['ttf', 'eot', 'svg', 'woff', 'woff2']
      }))
      .pipe($.concat('cala-italic.css'))
      .pipe(gulp.dest(config.build + 'css'));
  });

  gulp.task('regular', function(){
    return gulp.src(config.fonts + '/CalaReg-webfont.*')
      .pipe($.inlineFonts({
        name: 'Cala',
        style: 'normal',
        weight: 'normal',
        formats: ['ttf', 'eot', 'svg', 'woff', 'woff2']
      }))
      .pipe($.concat('cala-regular.css'))
      .pipe(gulp.dest(config.build + 'css'));
  });

  gulp.task('concat-fonts', function(){
    return gulp.src(config.build + 'css/cala-*.css')
      .pipe($.concat('types.css'))
      .pipe(gulp.dest(config.build + 'css'));
  });

  gulp.task('clean-fonts', function(){
    return gulp.src(config.build + 'css/cala-*.css', {read: false})
      .pipe($.clean());
  });

  gulp.task('fonts', ['bold', 'italic', 'regular'], function(){
    runSequence('concat-fonts', 'clean-fonts');
  });

};
