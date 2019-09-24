const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isEnvDevelopment = process.env.NODE_ENV === 'development';
const CopyPlugin = require('copy-webpack-plugin');

const cdnHost = isEnvDevelopment ? '//cdn.blog.com' : '//cdn.zhuwenlong.com';

let config = {
  mode: isEnvDevelopment ? 'development' : 'production',
  entry: [path.resolve(__dirname, 'src/index')],
  output: {
    filename: isEnvDevelopment ? '[name].js' : '[name].[chunkhash].bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: cdnHost,
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
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'public/index.html')
    }),
    new HtmlWebpackPlugin({
      filename: 'index-en.html',
      template: path.resolve(__dirname, 'public/index-en.html')
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: isEnvDevelopment ? 'asset/css/[name].css' : 'asset/css/[name].[hash].css',
      chunkFilename: isEnvDevelopment ? 'asset/css/[id].css' : 'asset/css/[id].[hash].css',
    }),
    new CopyPlugin([{
      from: 'public/**/*',
      to: '',
      toType: 'dir',
      transformPath(targetPath, absolutePath) {
        return targetPath.replace(/^public\//, '');
      },
      ignore: ['index.html', 'index-en.html'],
    }, ]),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          // cacheGroupKey here is `commons` as the key of the cacheGroup
          name(module, chunks, cacheGroupKey) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            return `asset/js/npm.${packageName.replace('@', '')}`;
          },
          chunks: 'all'
        }
      }
    }
  }
};

if (isEnvDevelopment) {
  config = Object.assign(config, {
    devServer: {
      contentBase: path.join(__dirname, 'build'),
      compress: true,
      port: 9000
    }
  })
}


module.exports = config;