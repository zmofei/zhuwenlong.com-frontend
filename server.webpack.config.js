const nodeExternals = require('webpack-node-externals');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isEnvDevelopment = process.env.NODE_ENV === 'development';
const cdnHost = isEnvDevelopment ? '//cdn.blog.com' : '//cdn.zhuwenlong.com';

let config = {
  mode: isEnvDevelopment ? 'development' : 'production',
  entry: [path.resolve(__dirname, 'src/server')],
  output: {
    filename: isEnvDevelopment ? '[name].js' : '[name].server.js',
    path: path.resolve(__dirname, 'build-ssr'),
  },
  target: 'node',
  externals: [nodeExternals()],
  // context: __dirname,
  node: {
    __filename: false,
    __dirname: false
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader"
      }
    }, {
      test: /\.s[ac]ss$/i,
      use: [{
          loader: MiniCssExtractPlugin.loader
        },
        // Creates `style` nodes from JS strings
        // isEnvDevelopment && 'style-loader',
        // Translates CSS into CommonJS
        {
          loader: 'css-loader',
          options: { url: true, modules: true }
        },
        // Compiles Sass to CSS
        'sass-loader',
      ].filter(Boolean),
    }, {
      test: /\.(png|jpe?g|gif|svg|eot|woff|ttf)$/i,
      use: [{
        loader: 'file-loader',
        options: {
          name: isEnvDevelopment ? '[name].[ext]' : '[name].[hash].[ext]',
          publicPath: cdnHost + '/asset/media',
          outputPath: 'asset/media'
        }
      }, ],
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: isEnvDevelopment ? 'asset/css/[name].css' : 'asset/css/[name].[hash].css',
      chunkFilename: isEnvDevelopment ? 'asset/css/[id].css' : 'asset/css/[id].[hash].css',
    })
  ]
};


module.exports = config;