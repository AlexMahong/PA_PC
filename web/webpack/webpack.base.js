const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

//获取当前工作目录
const __RootPath = path.resolve('./');

module.exports = {
  entry: {
    app: [
      'babel-polyfill',
      path.join(__RootPath, 'src/index.js')
    ]
  },
  resolve: {
    alias: {
      "@": path.join(__RootPath, 'src'),
      "@assets": path.join(__RootPath, 'src/assets'),
      "jquery": "jquery"
    },
    // 约定省略后缀
    extensions: [".js", '.jsx', ".json", '.less'],
  },
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        loader: "babel-loader?cacheDirectory",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        exclude: path.resolve(__RootPath, '../src/assets/less'),
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: "css-loader",
              options: {
                modules: true,  //支持 css 模块化引入（意味着组件中模块化引入css时，文件名需.css为后缀）
              }
            },
            {
              loader: "postcss-loader",
              options: {
                ident: 'postcss',
                plugins: loader => [
                  require('postcss-import')({root: loader.resourcePath}),
                  require('autoprefixer')()
                ]
              }
            },
          ]
        }),
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'less-loader'
          ]
        }),
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: ['url-loader?limit=10240&name=images/[name].[ext]']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: ['url-loader?limit=1024&name=fonts/[name].[ext]']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__RootPath, 'index.html')
    }),
    new webpack.ProvidePlugin({
      $: 'jquery'
    }),
    /*将样式抽取出成单独文件*/
    new ExtractTextPlugin({
      filename: "css/[name][hash].css"
    }),
    // 复制static文件夹下的全部文件，不进行编译
    new CopyWebpackPlugin([
      {
        from: path.resolve(__RootPath, 'static'),
        to: 'static',
        ignore: ['.*']
      }
    ])
  ]
}