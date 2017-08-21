const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const path = require('path');
const ENV = process.env.NODE_ENV || 'development';
const CSS_MAPS = ENV === 'development';

module.exports = {
	// entry file - starting point for the app
	context: path.resolve(__dirname, "src"),
    entry: './index.js',

	// where to dump the output of a production build
	output: {
		path: path.join(__dirname, 'www'),
        publicPath: '/',
		filename: 'minotaur.js'
	},

	resolve: {
        extensions: ['.jsx', '.js', '.json', '.less'],
        alias: {
            "react": "preact-compat",
            "react-dom": "preact-compat"
        }
    },

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: path.resolve(__dirname, 'src'),
				enforce: 'pre',
				use: 'source-map-loader'
            },
			{
				test: /\.jsx?/i,
				loader: 'babel-loader',
				options: {
					presets: [
						'es2015'
					],
					plugins: [
						['transform-react-jsx', { pragma: 'h' }]
					]
				}
			},
			{
				// Transform our own .(less|css) files with PostCSS and CSS-modules
				test: /\.(scss|css)$/,
				include: [path.resolve(__dirname, 'src/')],
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: { modules: true, sourceMap: CSS_MAPS, importLoaders: 1 }
						},
						{
							loader: `postcss-loader`,
							options: {
								sourceMap: CSS_MAPS,
								plugins: () => {
									autoprefixer({ browsers: [ 'last 2 versions' ] });
								}
							}
						},
						{
							loader: 'sass-loader',
							options: { sourceMap: CSS_MAPS }
						}
					]
				})
            },
			{
				test: /\.json$/,
				use: 'json-loader'
			},
			{
				test: /\.pug$/,
				use: 'pug-loader'
			},
			{
				test: /\.(xml|html|txt|md)$/,
				use: 'raw-loader'
			},
			{
				test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
				use: ENV==='production' ? 'file-loader' : 'url-loader'
            }
		]
	},
	
	// enable Source Maps
	devtool: ENV==='production' ? 'source-map' : 'cheap-module-eval-source-map',

    plugins: ([
		new webpack.NoEmitOnErrorsPlugin(),
		new ExtractTextPlugin({
			filename: 'style.css',
			allChunks: true,
			disable: ENV !== 'production'
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(ENV)
		}),
		new HtmlWebpackPlugin({
			template: './index.pug',
			minify: { collapseWhitespace: true }
        }),
    ]).concat(ENV === 'production' ? [

		new webpack.optimize.UglifyJsPlugin({
			output: {
				comments: false
			},
			compress: {
				unsafe_comps: true,
				properties: true,
				keep_fargs: false,
				pure_getters: true,
				collapse_vars: true,
				unsafe: true,
				warnings: false,
				screw_ie8: true,
				sequences: true,
				dead_code: true,
				drop_debugger: true,
				comparisons: true,
				conditionals: true,
				evaluate: true,
				booleans: true,
				loops: true,
				unused: true,
				hoist_funs: true,
				if_return: true,
				join_vars: true,
				cascade: true,
				drop_console: true
			}
		}),

		new OfflinePlugin({
			relativePaths: false,
			AppCache: false,
			excludes: ['_redirects'],
			ServiceWorker: {
				events: true
			},
			cacheMaps: [
				{
					match: /.*/,
					to: '/',
					requestTypes: ['navigate']
				}
			],
			publicPath: '/'
        })
    ] : []),
	devServer: {
		// serve up any static files from www/
		contentBase: path.join(__dirname, 'www'),

		// enable gzip compression:
		compress: true,

		// enable pushState() routing, as used by preact-router et al:
		historyApiFallback: true
	}
};
