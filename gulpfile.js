'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var browserifyShim = require('browserify-shim');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var connect = require('gulp-connect');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var jade = require('gulp-jade');
var del = require('del');
var paths = {source: './src', destination: './www'};

gulp.task('browserify', function () {
    // set up the browserify instance on a task basis
    var b = browserify({
        entries: './src/scripts/main.js',
        debug: true,
        // defining transforms here will avoid crashing your stream
        transform: [browserifyShim,babelify]
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
    return gulp.src(paths.source+'/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default', {verbose: true}));
});

gulp.task('sass', function () {
    return gulp.src(paths.source + '/styles/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.destination + '/styles/'))
        .pipe(connect.reload());
});
gulp.task('uglify', function () {
    //copy sources to www/
    gulp.src(paths.source + '/scripts/**/*.js')
        .pipe(gulp.dest(paths.destination + '/scripts'));
    //uglify them
    return gulp.src(paths.destination + '/scripts/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename({'extname': '.min.js'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.destination +'/scripts'))
        .pipe(connect.reload());
});
gulp.task('html', function () {
    gulp.src(paths.source+'/*.jade')
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
    gulp.watch([paths.source + '/**/*.jade'], ['html']);
    gulp.watch([paths.source + '/**/*.js'], ['lint','browserify']);
    gulp.watch([paths.source + '/**/*.scss'], ['sass']);
});
gulp.task('build', ['bower-requirejs','requirejs','html','uglify', 'sass']);

gulp.task('build', ['html', 'less','lint', 'browserify']);

gulp.task('default', ['connect', 'watch']);
