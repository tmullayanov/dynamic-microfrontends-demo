// All this three lines bellow are importings
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require('@module-federation/enhanced').ModuleFederationPlugin;
const path = require('path');

// Here goes all configuration
module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/, // apply to all JS files
                exclude: /node_modules/, // exclude all files on node_modules
                use: {
                    loader: 'babel-loader', // looks at .babelrc
                }
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'host',
            // adds react as shared module
            shared: ['react', 'react-dom']
        }),
        new HtmlWebpackPlugin({
            template: "public/index.html" // create a template to start from
        }),
    ],
    devServer: {
        host: 'localhost', // where to run
        historyApiFallback: true,
        port: 4001, //given port to exec. app
        open: true,  // open new tab
        hot: true // Enable webpack's Hot Module Replacement
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx', '.css', '.scss', '.pcss']
    }
}