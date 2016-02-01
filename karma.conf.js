module.exports = function(config)
{
    config.set({

        basePath: '',

        frameworks: ['browserify', 'mocha','chai'],

        files: [
            'src/**/*.js',
            'test/**/*.js'
        ],

        exclude: [
        ],

        preprocessors: {
            'src/**/*.js': ['browserify'],
            'tests/**/*.js': ['browserify']
        },

        reporters: ['progress'],

        port: 9876,

        colors: true,

        logLevel: config.LOG_INFO,

        autoWatch: false,

        browsers: ['PhantomJS'],

        browserify: {
            debug: true,
            transform: ['browserify-shim', 'babelify']
        },

        plugins: [
            'karma-phantomjs-launcher',
            'karma-browserify',
            'karma-mocha',
            'karma-chai',
            'karma-mocha-reporter'
        ],

        singleRun: true
    });
};