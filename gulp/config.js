module.exports = {
    input: 'src/**/*',
    output: 'www/',
    scripts: {
        input: 'src/scripts/*',
        output: 'www/js/'
    },
    styles: {
        input: 'src/styles/index.scss',
        output: 'www/css/'
    },
    svgs: {
        input: 'src/svg/*',
        output: 'www/svg/'
    },
    test: {
        input: 'src/scripts/**/*.js',
        karma: 'test/karma.conf.js',
        spec: 'test/spec/**/*.js',
        coverage: 'test/coverage/',
        results: 'test/results/'
    },
    docs: {
        input: 'src/docs/*.{html,md,markdown}',
        output: 'docs/',
        templates: 'src/docs/_templates/',
        assets: 'src/docs/assets/**'
    }
};
