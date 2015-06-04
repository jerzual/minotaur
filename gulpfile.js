var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    connect = require('gulp-connect'),
    rjs = require('gulp-requirejs'),
    bowerFiles = require('main-bower-files'),
    bowerRequireJS = require('bower-requirejs'),
    rename = require('gulp-rename'),
    jade = require('jade'),
    gulpJade = require('gulp-jade'),
    uglify = require('gulp-uglify'),
    util = require('gulp-util'),
    path = require('path'),
    del = require('del');

var paths = {src: './src', out: './www/'}

//copy bower files to js libs
gulp.task('bower-requirejs', function () {
    gulp.src(bowerFiles()).pipe(gulp.dest(paths.src + '/scripts/vendor'));
    //util.log(bowerFiles());
    var options = {
        baseUrl: 'www',
        config: 'src/scripts/config.js',
        transitive: true
    };

    bowerRequireJS(options, function (rjsConfigFromBower) {
        util.log("Updated src/scripts/config.js !");
        util.log(rjsConfigFromBower);
    });
});
gulp.task('requirejs',['bower-requirejs'], function () {
    rjs({
        baseUrl: 'src/scripts/',
        name:'main',
        out: 'tribes.min.js',
        shim: {
            THREE:{exports:"THREE"}
            ,RNG:{exports:"RNG"}

        },
        paths: {
            "Backbone": "vendor/exoskeleton",
            "_": "vendor/lodash",
            "RNG": "vendor/rng",
            "THREE": "vendor/three",
            "Zepto": "vendor/zepto"
        }
        // ... more require.js options
    })
        .pipe(gulp.dest(paths.out + '/js/')); // pipe it to the output DIR
});
gulp.task('less', function () {
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
    // place code for your default task here
    return gulp.src('src/**/*.jade')
        .pipe(gulpJade({
            jade: jade,
            pretty: true
        }))
        .pipe(gulp.dest('www/'))
});


gulp.task('connect', function () {
    connect.server({
        root: 'www',
        livereload: true
    });
});

gulp.task('watch', function () {
    gulp.watch([paths.src + '/**/*.jade'], ['html']);
    gulp.watch([paths.src + '/**/*.js'], ['uglify']);
    gulp.watch([paths.src + '/**/*.scss'], ['sass']);
});
gulp.task('build', ['bower-requirejs','requirejs','html','uglify', 'sass']);

gulp.task('default', ['build','connect', 'watch']);
