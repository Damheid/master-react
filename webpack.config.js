const path = require('path');

const {
    ProvidePlugin
} = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const srcFolder = 'src';
const distFolder = 'dist';

module.exports = {
    entry: {
        'app': path.join(__dirname, srcFolder, 'ts', 'app.tsx')
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.json', '.scss'],
        modules: [
            path.join(__dirname, srcFolder, 'ts'),
            'node_modules'
        ]
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.scss$/,
                exclude: [path.join(__dirname, srcFolder, 'ts')],
                loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.scss$/,
                exclude: [path.join(__dirname, srcFolder, 'scss')],
                loaders: ['raw-loader', 'sass-loader']
            },
        ]
    },
    plugins: [
        new ProvidePlugin({
            'Promise': 'es6-promise',
            'fetch': 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
        }),
        new CopyWebpackPlugin([{
            from: path.join(srcFolder, 'images'),
            to: path.join('..', 'images')
        }]),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, srcFolder, 'index.html'),
            filename: path.join('..', 'index.html'),
            inject: 'body'
        })
    ],
    output: {
        path: path.join(__dirname, distFolder, 'js'),
        filename: '[name].js',
        publicPath: '/js'
    },
    devtool: 'source-map',
    devServer: {
        contentBase: 'dist',
        historyApiFallback: true,
        port: 5000,
        proxy: {
            '/widgets': {
                target: 'http://localhost:3010'
            }
        }
    }
};