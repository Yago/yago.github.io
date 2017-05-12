import gulp from 'gulp';
import del from 'del';
import config from '../gulp_config.json';

/**
 * Clean output directories
 */
export const clean = del.bind(null, [
  config.build.substr(0, config.build.length - 1),
  config.metalsmith.dist,
]);

export const cleanTask = gulp.task('clean', clean);
