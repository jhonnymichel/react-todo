var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require("autoprefixer");
var isDev = true;

var cssLoaderSetup = isDev ? 'css-loader?sourceMap' : 'css-loader?minimize';
var sassLoaderSetup = isDev ? 'sass-loader?sourceMap' : 'sass-loader';
var postcssLoaderStup = isDev ? 'postcss-loader?sourceMap=inline' : 'postcss-loader';

module.exports = {
  entry: {
    js: "./app/js/main.js",
    css: "./app/js/main.css"
  },
  output: {
    path: __dirname +'/app/dist/js',
    publicPath: "/dist/js/", //the path to the webserver
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: '/(npm_modules|bower_components)/',
        loader: 'babel-loader',
        query: {
          presets: ['react','es2015', 'stage-0']
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', String(cssLoaderSetup+'!'+postcssLoaderStup+'!'+sassLoaderSetup))
      }
    ]
  },
  postcss: function() {
    return [autoprefixer];
  },
  plugins: [
    new ExtractTextPlugin("../css/styles.css")
  ]
}
