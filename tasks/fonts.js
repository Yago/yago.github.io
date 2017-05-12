import gulp from 'gulp';
import del from 'del';
import loadPlugins from 'gulp-load-plugins';
import config from '../gulp_config.json';

const $ = loadPlugins();

 /*
  * Build font stylesheet base on raw fonts
  */
export const fontBold = () => {
  return gulp.src(`${config.fonts}/CalaBol-webfont.*`)
    .pipe($.inlineFonts({
      name: 'Cala',
      weight: 'bold',
      formats: ['woff', 'woff2'],
    }))
    .pipe($.concat('cala-bold.css'))
    .pipe(gulp.dest(`${config.build}css`));
};

export const fontItalic = () => {
  return gulp.src(`${config.fonts}/CalaIta-webfont.*`)
    .pipe($.inlineFonts({
      name: 'Cala',
      style: 'italic',
      weight: 'normal',
      formats: ['woff', 'woff2'],
    }))
    .pipe($.concat('cala-italic.css'))
    .pipe(gulp.dest(`${config.build}css`));
};

export const fontRegular = () => {
  return gulp.src(`${config.fonts}/CalaReg-webfont.*`)
    .pipe($.inlineFonts({
      name: 'Cala',
      style: 'normal',
      weight: 'normal',
      formats: ['woff', 'woff2'],
    }))
    .pipe($.concat('cala-regular.css'))
    .pipe(gulp.dest(`${config.build}css`));
};

export const fontConcat = () => {
  return gulp.src(`${config.build}css/cala-*.css`)
    .pipe($.concat('types.css'))
    .pipe(gulp.dest(`${config.build}css`));
};

export const fontClean = del.bind(null, [
  `${config.build}css/cala-*.css`,
]);

export const fonts = gulp.series(fontBold, fontItalic, fontRegular, fontConcat, fontClean);
export const fontsTask = gulp.task('fonts', fonts);
