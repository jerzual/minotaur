module.exports = function(config)
{
    config.set({

        basePath: '',

        frameworks: ['browserify', 'mocha','chai'],

        files: [
            'test/**/*.js'
        ],

        exclude: [
        ],

        preprocessors: {
            'src/tests/*.js': ['babelify','browserify']
        },

        reporters: ['progress'],

        port: 9876,

        colors: true,

        logLevel: config.LOG_INFO,

        autoWatch: false,

        browsers: ['PhantomJS'],

        browserify: {
            debug: true,
            transform: ['babelify']
        },

        plugins: [
            'karma-phantomjs-launcher',
            'karma-mocha','karma-browserify'],

        singleRun: true
    });
};