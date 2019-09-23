const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isEnvDevelopment = process.env.NODE_ENV === 'development';

let config = {
  mode: isEnvDevelopment ? 'development' : 'production',
  entry: [path.resolve(__dirname, 'src/index')],
  output: {
    filename: isEnvDevelopment ? '[name].[ext]' : '[name].[chunkhash].bundle.js',
    path: path.resolve(__dirname, 'build')
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
      use: [!isEnvDevelopment && {
          loader: MiniCssExtractPlugin.loader
        },
        // Creates `style` nodes from JS strings
        isEnvDevelopment && 'style-loader',
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
          outputPath: 'asset'
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
      filename: isEnvDevelopment ? '[name].css' : '[name].[hash].css',
      chunkFilename: isEnvDevelopment ? '[id].css' : '[id].[hash].css',
    }),
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
            return `npm.${packageName.replace('@', '')}`;
            // const moduleFileName = module.identifier().split('/').reduceRight(item => item);
            // const allChunksNames = chunks.map((item) => item.name).join('~');
            // return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
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