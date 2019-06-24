const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
                loader: require.resolve('url-loader'),
                options: {
                    limit: 10000,
                    name: '[name].[hash].[ext]',
                },
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