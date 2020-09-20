let connect = require("gulp-connect")
let { watchHTML,htmlTask } = require("./tasks/html")
let { watchCSS,cssTask } = require("./tasks/css")
let { watchJS,jsTask } = require("./tasks/js")
let { watchImages,imageTask } = require("./tasks/images")
let { watchMedia,mediaTask } = require("./tasks/media")

function watch() {
  watchHTML();
  watchCSS();
  watchJS();
  watchImages();
  watchMedia();
  connect.server({
    livereload: true,
    root: "dist"
  });
};

function build(done){
  htmlTask();
  cssTask();
  jsTask();
  imageTask();
  mediaTask();
  done()
}

exports.default = watch;
exports.build = build;