/* globals process, Buffer, require */

import gulp from 'gulp';
import yargs from 'yargs';
import config from '../gulp_config.json';
import autoprefixer from 'autoprefixer';

import loadPlugins from 'gulp-load-plugins';
const $ = loadPlugins();

import path from 'path';
import markdown from 'metalsmith-markdown';
import permalinks from 'metalsmith-permalinks';
import pagination from 'metalsmith-pagination';
import prism from 'metalsmith-prism';
import layouts from 'metalsmith-layouts';
import emojify from 'emojify.js/dist/js/emojify';
import define from 'metalsmith-define';
import collections from 'metalsmith-collections';

import * as filters from './filters';

let metadatas = [];

function errorAlert(error){
  if (!yargs.argv.production) {
    $.notify.onError({title: 'Metalsmith Error', message: 'Check your terminal', sound: 'Sosumi'})(error);
    $.util.log(error);
  }
  this.emit('end');
}

/*
 * Generate styleguide doc
 */
export const metalsmithDocs = () => {
  return gulp.src([
    `${config.content}**/*.md`,
  ])
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
        layouts(config.metalsmith.plugins.layouts)
      ]
    }))
    .pipe(gulp.dest(config.metalsmith.dist));
};

export const metalsmithAssets = () => {
  return gulp.src(`${config.build}**/*`)
    .pipe(gulp.dest(`${config.metalsmith.dist}/build`));
};

/*
 * Build metalsmith
 */
export const metalsmith = gulp.series(metalsmithAssets, metalsmithDocs);
