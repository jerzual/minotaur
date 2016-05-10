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
var del = require('del');
const vueify = require('vueify');

var paths = {source: './src', destination: './www'};

var production = (process.env.NODE_ENV === 'production');

gulp.task('browserify', function () {
    // set up the browserify instance on a task basis
    var b = browserify({
        entries: './src/scripts/main.js',
        debug: !production,
        // defining transforms here will avoid crashing your stream
        transform: [browserifyShim, vueify, babelify({presets: ["es2015"]})]
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

gulp.task('build:app', function () {
    // set up the browserify instance on a task basis
    var b = browserify({
        entries: './src/scripts/main.js',
        debug: !production,
        // defining transforms here will avoid crashing your stream
        transform: [browserifyShim, babelify({presets: ["es2015"]})]
    });
/*
    //for each dependencies manage by npm.
    packageJSON.dependencies.forEach((lib)=>{
        //treat them as external by browserify.
        b.external(lib);
    });*/
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
gulp.task('build:vendor', function () {
    // set up the browserify instance on a task basis
    var b = browserify({
        entries: './src/scripts/vendor.js',
        debug: !production,
        // defining transforms here will avoid crashing your stream
        transform: [browserifyShim, babelify({presets: ["es2015"]})]
    });

    return b.bundle()
        .pipe(source('vendor.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        //.pipe(uglify())
        .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.destination+'/js/'));
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
    gulp.watch([paths.source + '/**/*.js'], ['browserify']);
    gulp.watch([paths.source + '/**/*.scss'], ['sass']);
});
gulp.task('build', ['bower-requirejs','requirejs','html','uglify', 'sass']);

gulp.task('build', ['html', 'sass', 'browserify']);

gulp.task('default', ['build','connect', 'watch']);
