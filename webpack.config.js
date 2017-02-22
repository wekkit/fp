var Path = require('path')
var Webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    index: './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: './dist',
    library: 'for-pickup',
    libraryTarget: 'umd'
  },
  devServer: {
    stats: 'errors-only'
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
      config: Path.join(__dirname, 'src/config', 'local.js'),
      utils: Path.join(__dirname, 'src/utils.js')
    }
  },

  plugins: [
    new ExtractTextPlugin('style.css', { allChunks: true }),
    new Webpack.ProvidePlugin({
      'Promise': 'es6-promise',
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ]
}
