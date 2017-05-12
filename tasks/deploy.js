import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import config from '../gulp_config.json';

const $ = loadPlugins();

/**
 * Deploy to GH pages
 */
export const deploy = () => {
  return gulp.src(`${config.app.ghpages}/**/*`)
    .pipe($.ghPages({
      branch: 'master',
    }));
};

export const deployTask = gulp.task('deploy', deploy);
