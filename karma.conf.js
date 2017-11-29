module.exports = function(config)
{
    config.set({

        basePath: '',

        frameworks: ['webpack', 'mocha','chai'],

        files: [
            'src/scripts/minotaur.js',
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
            entry: './src/main.js',
            transform: ['browserify-shim', 'babelify','vueify'],
            extensions: ['.js','.vue']
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