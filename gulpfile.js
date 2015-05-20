
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