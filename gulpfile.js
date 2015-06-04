'use strict';

var browserify = require('browserify');
var browserifyShim = require('browserify-shim');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var less = require('gulp-less');
var jade = require('gulp-jade');

gulp.task('javascript', function () {
  // set up the browserify instance on a task basis
  var b = browserify({
    entries: './src/scripts/main.js',
    debug: true,
    // defining transforms here will avoid crashing your stream
    transform: [browserifyShim]
  });

  return b.bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('html', function () {
    // place code for your default task here
});


gulp.task('connect', function () {
    connect.server({
        root: 'www',
        livereload: true
    });
});

gulp.task('watch', function () {
    gulp.watch([paths.src + '/**/*.html'], ['html']);
    gulp.watch([paths.out + '/**/*.js'], ['uglify']);
    gulp.watch([paths.out + '/**/*.less'], ['less']);
});

gulp.task('default', ['connect', 'watch']);