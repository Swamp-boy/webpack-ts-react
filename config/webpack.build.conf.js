const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')

const buildWebpackConfig = merge(baseWebpackConfig, {
  // BUILD settings gonna be here
  mode: 'production',

  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.prod.json',
        },
      },
    ],
  },

  plugins: [],
});

// export buildWebpackConfig
module.exports = new Promise((resolve, reject) => {
  resolve(buildWebpackConfig)
})
