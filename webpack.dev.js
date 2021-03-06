const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

  entry: './app/index.js',
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: 'http://localhost:8080/',
    filename: "bundle.js",
  },

  devtool: "cheap-module-source-map",

  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    hot: true,
    noInfo: false // only errors & warns on hot reload
  },

  module: {
    rules: [{
      test: /\.s?css$/,
      exclude: /node_modules/,
      use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { importLoaders: 1 } },
            {
              loader: 'postcss-loader',
              options: {
                plugins: (loader) => [

                  require('autoprefixer')(),
                  require('cssnano')()
                ]
              }
            },
            'sass-loader'
          ]
      })
    }, {
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      options: {
          presets: ['es2015', 'react']
        }
    },
    {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
    }]
  },

  plugins: [
    new ExtractTextPlugin('style.css'),

    new HtmlWebpackPlugin({
     template: './app/index.html',
     minify: {
       collapseWhitespace: true,
       removeComments: true,
       removeRedundantAttributes: true,
       removeScriptTypeAttributes: true,
       removeStyleLinkTypeAttributes: true
     }
   })
  ]

}
