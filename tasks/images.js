const gulp = require("gulp");
const connect = require("gulp-connect");
const imagemin = require('gulp-imagemin');
const recompress = require('imagemin-jpeg-recompress');

function imageTask() {
    gulp.src('src/images/**/*')
        .pipe(imagemin([
            recompress({
                min: 40,
                max: 95,
                target: 0.5,
            })
        ]))
        .pipe(gulp.dest('dist/assets/images'))
        .pipe(connect.reload());
}

function watchImages() {
    return gulp.watch("src/images/**/*", { ignoreInitial: false }, imageTask);
}

module.exports = {
    imageTask,
    watchImages
};