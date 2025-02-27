const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const uglify = require("gulp-uglify");
const obfuscate = require("gulp-obfuscate");
const imagemin = require("gulp-imagemin");

function compilaSaas() {
  return gulp
    .src("./src/styles/main.scss")
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: "compressed",
      })
    )
    .pipe(sourcemaps.write("./maps"))
    .pipe(gulp.dest("./build/styles")); // encadeia as funçoes
}

function comprimeImg() {
  return gulp
    .src("./src/images/*")
    .pipe(imagemin())
    .pipe(gulp.dest("./build/images"));
}

function comprimeJs() {
  return gulp
    .src("./src/scripts/*.js")
    .pipe(uglify())
    .pipe(obfuscate())
    .pipe(gulp.dest("./build/scripts"));
}

exports.default = function () {
  gulp.watch(
    "./src/styles/*.scss",
    { ignoreInitial: false },
    gulp.series(compilaSaas)
  );
  gulp.watch(
    "./src/scripts/*.js",
    { ignoreInitial: false },
    gulp.series(comprimeJs)
  );
  gulp.watch(
    "./src/images/*",
    { ignoreInitial: false },
    gulp.series(comprimeImg)
  );
};
