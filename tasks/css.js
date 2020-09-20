const gulp = require("gulp");
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require("gulp-sourcemaps");
const connect = require("gulp-connect");

function cssTask() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('styles.css'))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(connect.reload());
}


function watchCSS() {
  return gulp.watch("src/scss/**/*.scss", { ignoreInitial: false }, cssTask);
}

module.exports = {
  cssTask,
  watchCSS
};