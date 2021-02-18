const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');//to check size
const webpack = require('webpack');

const PATHS = {
  src: path.join(__dirname, './../src'),
  dist: path.join(__dirname, './../dist'),
  assets: 'assets/',
};
module.exports = {
  experiments: {
    asset: true,
  },
  target: 'web',
  externals: {
    paths: PATHS,
  },
  entry: {
    app: [/*'@babel/polyfill',*/ `${PATHS.src}/index.tsx`],
  },
  output: {
    filename: `${PATHS.assets}js/[name].js`,
    path: PATHS.dist,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '~': path.resolve(__dirname, 'node_modules'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },

  optimization: {
    // libraries
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'ts-loader',
        options: {/* Loader options go here */},
      },
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        loader: 'ts-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',

        exclude: [/node_modules/],
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
      },
      {
        test: /\.(scss|css)$/,
        use: [
          // 'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../../',
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: { path: './postcss.config.js' },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        type: 'asset',
        use: 'svgo-loader',
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: `${PATHS.assets}img/`,
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: `${PATHS.assets}fonts/`,
              // outputPath: 'fonts/',
            },
          },
        ],
      },
      {
        test: /\.xml$/,
        use: [
          {
            loader: 'xml-loader',
          },
        ],
      },
      {
        test: /\.csv$/,
        use: [
          {
            loader: 'csv-loader',
          },
        ],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].css`,
    }),

    new HtmlWebpackPlugin({
      template: `${PATHS.src}/pages/index/index.pug`,
      filename: 'index.html',
    }),

    /*    //automatization HtmlWebpackPlugin
    ...PAGES.map((page) => new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/${page}`,
      filename: `./${page.replace(/\.pug/, '.html')}`,
      excludeChunks: ['app'],
    })),
    */
    /*
    new CopyWebpackPlugin({
      patterns: [
        { from: `${PATHS.src}/assets/fonts`, to: `${PATHS.assets}fonts` },
        { from: `${PATHS.src}/assets/img`, to: `${PATHS.assets}img` },
      ],
    }),
    */
    new webpack.ProvidePlugin({
      'react': 'React',
      'react-dom': 'ReactDOM',
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    // new CleanWebpackPlugin(),
    
  ],
};
