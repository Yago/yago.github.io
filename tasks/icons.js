import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import slug from 'slug';
import config from '../gulp_config.json';

const $ = loadPlugins();

const name = slug(config.iconsFontName).toLowerCase();

/*
 * Build icons font and stylesheets
 */
export const icons = () => {
  return gulp.src(`${config.assets}icons/**/*.svg`)
    .pipe($.iconfont({
      fontName: name,
      appendCodepoints: true,
      normalize: true,
      fontHeight: 1001,
    }))
    .on('glyphs', (glyphs) => {
      gulp.src('node_modules/toolbox-utils/templates/_icons.scss')
        .pipe($.consolidate('lodash', {
          glyphs: glyphs.map((glyph) => {
            return { name: glyph.name, codepoint: glyph.unicode[0].charCodeAt(0) };
          }),
          fontName: name,
          fontPath: '../fonts/',
          className: name,
        }))
        .pipe($.rename(`${name}.scss`))
        .pipe(gulp.dest(`${config.assets}sass/`));
    })
    .pipe(gulp.dest(`${config.build}fonts`));
};

export const iconsTask = gulp.task('icons', icons);
