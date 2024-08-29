// All this three lines bellow are importings
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');
const deps = require('./package.json').dependencies;

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
        new HtmlWebpackPlugin({
            template: "public/index.html" // create a template to start from
        }),
        new ModuleFederationPlugin({
            name: 'provider',
            filename: 'remoteEntry.js',
            exposes: {
                './button': './src/button.tsx'
            },
            shared: {
                react: {
                  requiredVersion: deps.react,
                  import: 'react', // the "react" package will be used a provided and fallback module
                  shareKey: 'react', // under this name the shared module will be placed in the share scope
                  shareScope: 'default', // share scope with this name will be used
                  singleton: true, // only a single version of the shared module is allowed
                },
                'react-dom': {
                  requiredVersion: deps['react-dom'],
                  singleton: true, // only a single version of the shared module is allowed
                },
              },
        })
    ],
    devServer: {
        host: 'localhost', // where to run
        historyApiFallback: true,
        port: 4002, //given port to exec. app
        open: true,  // open new tab
        hot: true // Enable webpack's Hot Module Replacement
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx', '.css', '.scss', '.pcss']
    }
}