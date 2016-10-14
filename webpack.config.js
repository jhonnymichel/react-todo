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
    publicPath: "/dist/js", //the path to the webserver
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: '/(node_modules|bower_components)/',
        loader: 'babel-loader',
        query: {
          presets: ['react','es2015', 'stage-0']
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', String(cssLoaderSetup+'!'+postcssLoaderStup+'!'+sassLoaderSetup), {publicPath: '../js/'})
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader'
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/octet-stream"
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file"
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=image/svg+xml"
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
