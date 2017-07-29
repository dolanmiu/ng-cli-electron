import * as ExtractTextPlugin from "extract-text-webpack-plugin";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as webpack from "webpack";

import { Helper } from "./helper";

// import 'style!@angular2-material/core/style/core.css';
// import 'style!@angular2-material/core/overlay/overlay.css';

const config: webpack.Configuration = {
    entry: {
        polyfills: Helper.root("src/polyfills.ts"),
        vendor: Helper.root("src/vendor.ts"),
        app: Helper.root("src/main.ts"),
    },

    resolve: {
        extensions: [".js", ".ts"],
    },

    module: {
        loaders: [{
            test: /\.ts$/,
            loaders: ["awesome-typescript-loader", "angular2-template-loader"],
        },
        {
            test: /\.html$/,
            loader: "html",
        },
        {
            test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?.*$|$)/,
            loader: "file?name=assets/[name].[hash].[ext]",
        },
        {
            test: /\.scss$/,
            exclude: [/node_modules/, /\.global\.scss$/],
            loaders: ["raw-loader", "sass-loader"],
        },
        {
            test: /\.css$/,
            loaders: ["raw-loader", "css-loader"],
        },
        {
            test: /\.global\.scss$/,
            loaders: ["style-loader", "css-loader", "sass-loader"],
        }],
        rules: [{
            test: /\.scss$/,
            use: [{
                loader: "sass-loader",
                options: {
                    includePaths: [
                        Helper.root("src/global-styles"),
                        Helper.root("node_modules/@angular"),
                    ],
                },
            }],
        }],
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ["app", "vendor", "polyfills"],
        }),

        new HtmlWebpackPlugin({
            template: "src/index.html",
        }),

        new ExtractTextPlugin("[name].css"),
    ],

    target: "electron-renderer",
};
module.exports = config;
