const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            // disable type checker - we will use it in fork plugin
            transpileOnly: true,
          },
        },
        exclude: /node_modules/,
      },
      {
          test: /\.pug$/,
          use: 'pug-loader'
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      eslint: { files: ['src/index.ts'], enabled: true },
    }),
    new HtmlWebpackPlugin({
        template: './src/index.pug',
        minify: { collapseWhitespace: true }
    }),
  ],
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
