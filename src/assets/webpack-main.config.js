var webpack = require('webpack');
var fs = require('fs');
const path = require('path');

var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
    devtool: 'source-map',

    entry: {
        'main': './main/index.ts'
    },

    output: {
        path: path.join(process.cwd(), "dist"),
        publicPath: './',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },

    resolve: {
        extensions: ['.js', '.ts']
    },

    module: {
        rules: [{
            test: /\.ts$/,
            loaders: 'awesome-typescript-loader'
        }]
    },

    externals: nodeModules,

    plugins: [
        new webpack.optimize.SplitChunksPlugin({
            name: ['main']
        })
    ],

    node: {
        __dirname: false,
        __filename: false
    },

    target: "electron-main"
};
