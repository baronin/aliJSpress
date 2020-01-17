const { series, parallel, dest ,src, watch } = require('gulp');

const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const autoprefixer =require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');

function sassTask() {
  return src('./scss/**/*.scss')
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(sourcemaps.write())
      .pipe(dest('./scss/'))
      .pipe(browserSync.stream());
}

function browserSyncTask() {
  browserSync.init({
    server: {
      baseDir: './'
    },
    notify: false
  });

  watch('./scss/**/*.scss', sassTask);
  watch('./*.html').on('change', browserSync.reload);
  watch('./js/**/*.js').on('change', browserSync.reload);
}

exports.default = series(sassTask, browserSyncTask);