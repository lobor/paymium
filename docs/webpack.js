const path = require('path')
const webpack = require('webpack')

const docs = path.resolve(__dirname)
const root = docs.replace('/docs', '')

const outputConfig = {
  path: `${docs}/styleguide`,
  filename: 'build/bundle.js',
  chunkFilename: 'build/[name].js',
}
const rulesConfig = {
  module: {
    rules: [
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react', ['next/babel', { 'preset-env': { modules: 'commonjs' } }]],
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true
            }
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
  ]
}

module.exports = {
  webpackConfig: rulesConfig,
  dangerouslyUpdateWebpackConfig: (config) => {
    config.output = outputConfig
    return config
  },
}