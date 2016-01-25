'use strict';

var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    browserify = require('browserify');
var browserifyShim = require('browserify-shim');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var connect = require('gulp-connect');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var paths = {source: './src', destination: './www'};

var paths = {src: './src', out: './www/'}

gulp.task('browserify', function () {
    // set up the browserify instance on a task basis
    var b = browserify({
        entries: './src/scripts/main.js',
        debug: true,
        // defining transforms here will avoid crashing your stream
        transform: [browserifyShim]
    });

    return b.bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
            // Add transformation tasks to the pipeline here.
            //.pipe(uglify())
            .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.destination+'/js/'));
});

gulp.task('lint', function () {
    return gulp.src('./src/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default', {verbose: true}));
});

gulp.task('sass', function () {
    return gulp.src(paths.src + '/styles/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.out + '/styles/'))
        .pipe(connect.reload());
});

gulp.task('uglify', function () {
    //copy sources to www/
    gulp.src(paths.src + '/scripts/**/*.js')
        .pipe(gulp.dest(paths.out + '/scripts'));
    //uglify them
    return gulp.src(paths.out + '/scripts/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename({'extname': '.min.js'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.out +'/scripts'))
        .pipe(connect.reload());
});

gulp.task('html', function () {
    gulp.src('./src/*.jade')
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest(paths.destination+'/'))
});


gulp.task('connect', function () {
    connect.server({
        root: 'www',
        livereload: true
    });
});

gulp.task('watch', function () {
    gulp.watch([paths.src + '/**/*.jade'], ['html']);
    gulp.watch([paths.src + '/**/*.js'], ['lint','browserify']);
    gulp.watch([paths.src + '/**/*.scss'], ['sass']);
});

gulp.task('build', ['html', 'sass','lint', 'browserify']);

gulp.task('default', ['build','connect', 'watch']);