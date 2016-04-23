'use strict';

var gulp          = require('gulp'),
    $             = require('gulp-load-plugins')(),
    config        = require('../gulp_config.json'),
    argv          = require('yargs').argv;

var markdown      = require('metalsmith-markdown'),
    prism         = require('metalsmith-prism'),
    permalinks    = require('metalsmith-permalinks'),
    layouts       = require('metalsmith-layouts'),
    pagination    = require('metalsmith-pagination'),
    emojify        = require('../node_modules/emojify.js/dist/js/emojify.js'),
    collections   = require('metalsmith-collections');

require('./filters.js')();

module.exports = function() {

  function errorAlert(error){
    if (!argv.production) {
      $.notify.onError({title: "Metalsmith Error", message: "Check your terminal", sound: "Sosumi"})(error);
      $.util.log(error);
    }
    this.emit("end");
  };

  gulp.task('cname', function() {
    return gulp.src('CNAME')
      .pipe(gulp.dest(config.build));
  });

  gulp.task('metalsmith', ['cname'], function() {
    return gulp.src(config.content + '**/*.md')
      .pipe($.plumber({errorHandler: errorAlert}))
      .pipe($.metalsmith({
        use: [
          markdown({ langPrefix: 'language-' }),
          prism({
            lineNumbers: true
          }),
          permalinks(config.metalsmith.plugins.permalinks),
          collections(config.metalsmith.plugins.collections),
          pagination(config.metalsmith.plugins.pagination),
          function(files, metalsmith, done){
            emojify.setConfig(config.metalsmith.plugins.emojify);
            for (var file in files) {
              files[file].contents = new Buffer(emojify.replace(files[file].contents.toString()));
            }
            done();
          },
          layouts(config.metalsmith.plugins.layouts),
        ]
      }))
      .pipe(gulp.dest(config.build));
  });

};
