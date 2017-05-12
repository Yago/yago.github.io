import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import merge from 'merge-stream';
import config from '../gulp_config.json';

const $ = loadPlugins();

/**
 * Deploy to GH pages
 */
export const single = (done) => {
  return merge(config.singles.map((item) => {
    return gulp.src(item.source)
      .pipe(item.name ? $.rename(item.name) : $.util.noop())
      .pipe(gulp.dest(item.destination));
  }));
};

export const singleTask = gulp.task('single', single);
