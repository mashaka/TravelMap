var webpack = require('webpack');

var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);

module.exports = {
    devtool: 'source-map' ,
    entry: [
        path.resolve(ROOT_PATH, 'src/index')
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['react-hot', 'babel-loader']
            },
            {
                test: /\..?css$/,
                loaders: ['style','css','sass']
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file?name=fonts/[name].[ext]'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'file?name=img/[name].[ext]'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: path.resolve(ROOT_PATH, 'build'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.resolve(ROOT_PATH, 'build'),
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlwebpackPlugin({
            title: 'Travel Map'
        })
    ]
};
