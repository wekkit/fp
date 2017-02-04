var Path = require('path')
var Webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CompressionPlugin = require('compression-webpack-plugin')
var S3Plugin = require('webpack-s3-plugin')

var pkg = require('./package.json')

var srcPath = Path.join(__dirname, 'src')
var distPath = Path.join(__dirname, 'dist')

module.exports = {
  devtool: 'source-map',
  entry: {
    index: Path.join(srcPath, 'index.js')
  },
  output: {
    filename: '[name].[hash].js',
    sourceMapFilename: '[name].[hash].map.js',
    path: distPath,
    library: 'for-pickup',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/, query: { presets: ['es2015', 'stage-1', 'react'], 'plugins': ['transform-decorators-legacy'] } },
      { test: /\.css$/, loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]' },
      { test: /\.(jpe?g|png|gif|svg)$/i, loaders: ['file?hash=sha512&digest=hex&name=[hash].[ext]', 'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'] }
    ]
  },
  postcss: [
    require('autoprefixer'),
    require('postcss-color-rebeccapurple')
  ],
  resolve: {
    modulesDirectories: ['node_modules', 'components'],
    alias: {
      config: Path.join(srcPath, 'config', 'staging.js'),
      utils: Path.join(srcPath, 'utils.js')
    }
  },

  plugins: [
    new Webpack.DefinePlugin({'process.env': {'NODE_ENV': '"staging"'}}),
    new ExtractTextPlugin('style.css', { allChunks: true }),
    new Webpack.ProvidePlugin({
      'Promise': 'es6-promise',
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new Webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
    new HtmlWebpackPlugin({
      template: './src/template.html',
      filename: 'index.html',
      pkg: pkg,
      chunks: ['index']
    }),
    new CompressionPlugin({
      asset: '[path][query]',
      test: /\.js$|\.svg$/
    }),
    new S3Plugin({
      include: /\.html$/,
      s3Options: {
        region: 'us-west-1'
      },
      s3UploadOptions: {
        Bucket: 'stg.forpickup.com',
        Expires: new Date(),
        CacheControl: 'max-age=0, no-cache, private'
      }
    }),
    new S3Plugin({
      include: /\.js$|\.svg$/,
      s3Options: {
        region: 'us-west-1'
      },
      s3UploadOptions: {
        Bucket: 'stg.forpickup.com',
        ContentEncoding: 'gzip',
        Expires: new Date(2030, 1, 1),
        CacheControl: 'max-age=99999999'
      }
    }),
    new S3Plugin({
      exclude: /\.js$|\.svg$|\.html$/,
      s3Options: {
        region: 'us-west-1'
      },
      s3UploadOptions: {
        Bucket: 'stg.forpickup.com',
        Expires: new Date(2030, 1, 1),
        CacheControl: 'max-age=99999999'
      }
    })
  ]
}
