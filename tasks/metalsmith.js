'use strict';

var gulp          = require('gulp'),
    $             = require('gulp-load-plugins')(),
    config        = require('../gulp_config.json'),
    argv          = require('yargs').argv;

var markdown      = require('metalsmith-markdown'),
    permalinks    = require('metalsmith-permalinks'),
    layouts       = require('metalsmith-layouts'),
    collections   = require('metalsmith-collections');

module.exports = function() {

  function errorAlert(error){
    if (!argv.production) {
      $.notify.onError({title: "Metalsmith Error", message: "Check your terminal", sound: "Sosumi"})(error);
      $.util.log(error);
    }
    this.emit("end");
  };

  gulp.task('metalsmith', function() {
    return gulp.src(config.content + '**/*.md')
      .pipe($.plumber({errorHandler: errorAlert}))
      .pipe($.metalsmith({
        use: [
          markdown(),
          permalinks(),
          collections(config.metalsmith.plugins.collections),
          // function(files, metalsmith, done){
          //   console.log(files)
          //   done();
          // },
          layouts(config.metalsmith.plugins.layouts),
        ]
      }))
      .pipe(gulp.dest(config.build));
  });

};
