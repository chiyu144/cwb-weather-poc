const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['./src/app.js', './src/apis.js'],
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/wehelp-team-15/'
  },
  devtool: 'source-map',
  devServer: {
    port: 3000,
    hot: true,
    static: {
      directory: path.join(__dirname, 'dist')
    }
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      },
      {
        test : /\.(png|jpe?g|gif)$/i,
        use : {
          loader: 'url-loader',
          options: {
            name: '[name].[hash].[ext]',
            limit : 8192,
            outputPath: 'assets',
            fallback: require.resolve('file-loader')
          }
        }
      },
      {
        test: /\.(svg|mp3|ttf|woff2|woff|eot)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]',
            outputPath: 'assets'
          } 
        }
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
};