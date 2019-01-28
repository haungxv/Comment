const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';

const config = {
    mode: process.env.NODE_ENV||'production',
    target: 'web',
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        filename: 'bundle.[hash:8].js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test:/\.js$/,
                loader:'babel-loader',
                exclude:/node_modules/
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name: '[name].[ext]'
                        }
                    }

                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlPlugin({
            template: path.join(__dirname, 'template.html')
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
    ],
};

if (isDev) {
    config.devServer = {
        port: '8002',
        host: '0.0.0.0',
        overlay: {
            errors: true,
        },
        historyApiFallback: {
            index: '/index.html'
        }
    };
    config.module.rules.push({
        test: /\.css$/,
        use: [
            'vue-style-loader',
            'css-loader',
        ]
    })
} else {
    config.entry = {
        app: path.join(__dirname, 'src/index.js'),
        // vendor: ['vue','vue-router']
    };
    config.output.filename = '[name].[chunkhash:8].js';
    config.module.rules.push({
        test: /\.css$/,
        use: [
            {
                loader: MiniCssExtractPlugin.loader,
                options: {
                    publicPath: '../'
                }
            },
            "css-loader"
        ]
    });
    config.plugins.push(
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash:8].css",
            // chunkFilename: "[id].css"
        }),
    );
    config.optimization = {
        splitChunks: {
           chunks:'all'
        },
        runtimeChunk:true
    }
}

module.exports = config;