const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './client/index.html',
    filename: 'index.html',
    inject: 'body'
})

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

const ExtractTextPluginConfig = new ExtractTextPlugin({
    filename: "bundle.css",
    disable: false,
    allChunks: true
});

module.exports = {
    entry: './client/index.js',
    output: {
        path: path.resolve('dist'),
        filename: 'index_bundle.js'
    },
    resolve: {
        alias: {
          img: path.resolve(__dirname, 'images'),
          data: path.resolve(__dirname, 'client/data'),
          js: path.resolve(__dirname, 'client/js')
        }
    },
    module: {
        rules: [
            {test: /\.js$/, use: { loader: 'babel-loader', options: {presets: ['es2015']}}, exclude: /node_modules/},
            {test: /\.jsx$/, use: { loader: 'babel-loader', options: {presets: ['es2015']}}, exclude: /node_modules/},
            {test: /\.scss$/, use: ExtractTextPlugin.extract({
              fallback: "style-loader",
              use: [ "css-loader", "sass-loader"]
            })},
            {
              test: /\.(jpg|png|svg)$/,
              use: [
                {
                      loader: "url-loader",
                      options: { limit: 2000 }
                },
                'image-webpack-loader'
                ]
              }
        ]
    },

    plugins: [HtmlWebpackPluginConfig, ExtractTextPluginConfig]
}
