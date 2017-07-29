// tslint:disable:only-arrow-functions
import * as ExtractTextPlugin from "extract-text-webpack-plugin";
import * as fs from "fs";
import * as webpack from "webpack";
import * as webpackMerge from "webpack-merge";

import { Helper } from "./helper";
import * as commonConfig from "./webpack.common";

const nodeModules = {};
fs.readdirSync("node_modules")
    // tslint:disable-next-line:typedef
    .filter(function(x) {
        return [".bin"].indexOf(x) === -1;
    })
    // tslint:disable-next-line:typedef
    .forEach(function(mod) {
        nodeModules[mod] = "commonjs " + mod;
    });

const ENV = process.env.NODE_ENV = process.env.ENV = "production";

module.exports = webpackMerge(commonConfig, {
    devtool: "source-map",

    output: {
        path: Helper.root("dench-dist"),
        publicPath: "./",
        filename: "[name].[hash].js",
        chunkFilename: "[id].[hash].chunk.js",
    },

    externals: nodeModules,

    // htmlLoader: {
    //     minimize: false, // workaround for ng2
    // },

    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        /*new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
          mangle: {
            keep_fnames: true
          }
        }),*/
        new ExtractTextPlugin("[name].[hash].scss"),
        new webpack.DefinePlugin({
            "process.env": {
                ENV: JSON.stringify(ENV),
            },
        }),
    ],
});
