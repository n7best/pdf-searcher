require('dotenv').config();
const commonPaths = require('./common-paths');
const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');

const config = {
  entry: {
    // vendor: ['semantic-ui-react']
  },
  output: {
    path: commonPaths.outputPath,
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      Components: path.join(commonPaths.appEntry, 'components'),
      Reducer: path.join(commonPaths.appEntry, 'reducer'),
      Store: path.join(commonPaths.appEntry, 'store'),
      Hooks: path.join(commonPaths.appEntry, 'hooks'),
      Container: path.join(commonPaths.appEntry, 'container'),
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          test: 'vendor',
          name: 'vendor',
          enforce: true
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `public/index.html`,
      favicon: `public/favicon.ico`
    }),
    new WebpackMd5Hash(),
    new webpack.DefinePlugin({
      API_ENV: JSON.stringify(process.env.NODE_ENV),
      API_BASE_URL: JSON.stringify(process.env.API_BASE_URL),
    })
  ]
};

module.exports = config;
