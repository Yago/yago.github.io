/* globals process, Buffer, require */

import gulp from 'gulp';
import yargs from 'yargs';
import loadPlugins from 'gulp-load-plugins';
import markdown from 'metalsmith-markdown';
import permalinks from 'metalsmith-permalinks';
import pagination from 'metalsmith-pagination';
import prism from 'metalsmith-prism';
import layouts from 'metalsmith-layouts';
import emojify from 'emojify.js/dist/js/emojify';
import define from 'metalsmith-define';
import collections from 'metalsmith-collections';

import config from '../gulp_config.json';
import * as filters from './filters';

const $ = loadPlugins();
const metadatas = [];

function errorAlert(error) {
  if (!yargs.argv.production) {
    $.notify.onError({ title: 'Metalsmith Error', message: 'Check your terminal', sound: 'Sosumi' })(error);
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
    .pipe($.plumber({ errorHandler: errorAlert }))
    .pipe($.metalsmith({
      use: [
        markdown({ langPrefix: 'language-' }),
        prism({
          lineNumbers: true,
        }),
        permalinks(config.metalsmith.plugins.permalinks),
        collections(config.metalsmith.plugins.collections),
        pagination(config.metalsmith.plugins.pagination),
        function (files, metalsmith, done) {
          emojify.setConfig(config.metalsmith.plugins.emojify);
          for (var file in files) {
            files[file].contents = new Buffer(emojify.replace(files[file].contents.toString()));
          }
          metadatas['bundlePath'] = yargs.argv.production ? '/js/' : '/';
          done();
        },
        define({
          data: metadatas
        }),
        layouts(config.metalsmith.plugins.layouts),
      ],
    }))
    .pipe(gulp.dest(config.metalsmith.dist));
};

/*
 * Build metalsmith
 */
export const metalsmith = metalsmithDocs;
