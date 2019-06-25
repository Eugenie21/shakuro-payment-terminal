const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {

    entry: [
        '@babel/polyfill',
        './src/index'
    ],
    output: {
        path: path.join(__dirname, '/build'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', 'scss'],
        alias: {
            'Media': path.resolve(__dirname, 'public/media'),
            'Components': path.resolve(__dirname, 'src/components'),
            'Containers': path.resolve(__dirname, 'src/containers'),
            'Common': path.resolve(__dirname, 'src/common'),
            'Util': path.resolve(__dirname, 'src/util'),
            'Store': path.resolve(__dirname, 'src/store')
        }
    },
    module: {
        rules: [{
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                },
            },
            {
                test: /\.s?css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpe?g)$/,
                use: {
                    loader: require.resolve('file-loader'),
                    options: {
                        name: 'media/[name].[ext]',
                        publicPath: '/'
                    },
                }
            },
        ]
    },
    devServer: {
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
};