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
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var size = require('gulp-size');
var del = require('del');
var vueify = require('vueify');

var paths = {source: './src', destination: './www'};

var production = (process.env.NODE_ENV === 'production');

gulp.task('browserify', function () {
    // set up the browserify instance on a task basis
    var b = browserify({
        entries: './src/main.js',
        debug: true
        // defining transforms here will avoid crashing your stream
    })
        .transform(browserifyShim)
        .transform(vueify)
        .transform(babelify,{presets: ["es2015"]});

    return b.bundle()
        .pipe(source('minotaur.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
            // Add transformation tasks to the pipeline here.
            .pipe(uglify())
            .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(size())
        .pipe(gulp.dest(paths.destination+'/scripts/'))
        .pipe(connect.reload());
});


gulp.task('sass', function () {
    return gulp.src(paths.source + '/styles/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(size())
        .pipe(gulp.dest(paths.destination + '/styles/'))
        .pipe(connect.reload());
});
gulp.task('uglify', function () {
    //uglify sources
    return gulp.src(paths.source + '/scripts/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(size())
        .pipe(uglify())
        .pipe(rename({'extname': '.min.js'}))
        .pipe(size())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.destination +'/scripts'))
        .pipe(connect.reload());
});
gulp.task('html', function () {
    gulp.src(paths.source+'/*.jade')
        .pipe(jade({
            pretty: true
        }))
        .pipe(size())
        .pipe(gulp.dest(paths.destination+'/'))
        .pipe(connect.reload())
});


gulp.task('connect', function () {
    connect.server({
        root: 'www',
        livereload: true
    });
});

gulp.task('watch', function () {
    gulp.watch([paths.source + '/**/*.jade'], ['html']);
    gulp.watch([paths.source + '/**/*.js'], ['browserify']);
    gulp.watch([paths.source + '/**/*.scss'], ['sass']);
});
gulp.task('build', ['bower-requirejs','requirejs','html','uglify', 'sass']);

gulp.task('build', ['html', 'sass', 'browserify']);

gulp.task('default', ['build','connect', 'watch']);
