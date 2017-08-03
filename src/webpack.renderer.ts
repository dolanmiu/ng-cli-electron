import * as CopyWebpackPlugin from "copy-webpack-plugin";
import * as path from "path";
import * as StringReplacePlugin from "string-replace-webpack-plugin";
import * as webpack from "webpack";

import { Helper } from "./helper";

const scriptTags = `
<script src="app.bundle.js"></script>
`;

const config: webpack.Configuration = {
    // for faster builds use 'eval'
    devtool: "source-map",
    // cache: false,

    entry: {
        polyfills: Helper.root("src/polyfills.ts"),
        app: Helper.root("src/main.ts"),
    },

    // Config for our build files
    output: {
        path: Helper.root("dench-dist"),
        filename: "[name].bundle.js",
        sourceMapFilename: "[name].map",
        chunkFilename: "[id].chunk.js",
    },
    /*
    * Options affecting the resolving of modules.
    *
    * See: http://webpack.github.io/docs/configuration.html#resolve
    */
    resolve: {
        /*
         * An array of extensions that should be used to resolve modules.
         *
         * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
         */
        extensions: [".ts", ".js", ".json", ".css", ".scss", ".html"],

        // An array of directory names to be resolved to the current directory
        modules: [Helper.root("src"), "node_modules"],

    },
    /*
    * Options affecting the resolving of modules.
    *
    * See: http://webpack.github.io/docs/configuration.html#resolve
    */
    module: {
        rules: [
            // Support for .ts files.
            {
                test: /\.ts$/,
                loaders: ["awesome-typescript-loader", "angular2-template-loader"],
                exclude: [/\.(spec|e2e)\.ts$/],
            },

            // Support for *.json files.
            {
                test: /\.json$/,
                loader: "json-loader",
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loaders: ["raw-loader", "sass-loader"], // sass-loader not scss-loader
            },

            // support for .html antd .css as raw text
            {
                test: /\.html$/,
                loader: "raw-loader",
                exclude: [Helper.root("src/index.html")],
            },

            // support for fonts
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                loader: "file-loader?name=dist/[name]-[hash].[ext]",
            },

            // support for svg icons
            {
                test: /\.svg/,
                loader: "svg-url-loader",
            },
            {
                test: /index.html$/,
                loader: StringReplacePlugin.replace({
                    replacements: [
                        {
                            pattern: /<\/body>/ig,
                            replacement: (match, p1, offset, str) => {
                                return `${scriptTags}${match}`;
                            },
                        },
                    ],
                }),
            },
        ],
    },
    plugins: [
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            Helper.root("src"),
            {},
        ),
        // Plugin: CommonsChunkPlugin
        // Description: Shares common code between the pages.
        // It identifies common modules and put them into a commons chunk.
        //
        // See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
        // See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
        new webpack.optimize.CommonsChunkPlugin({ names: ["vendor", "polyfills"], minChunks: Infinity }),
        // Plugin: CopyWebpackPlugin
        // Description: Copy files and directories in webpack.
        //
        // Copies project static assets.
        //
        // See: https://www.npmjs.com/package/copy-webpack-plugin
        new CopyWebpackPlugin([
            { from: "src/assets", to: "assets" },
            { from: "src/index.html", to: "index.html" },
            { from: "node_modules/ng-cli-electron/src/main/main.js", to: "main.js" },
            { from: "package.json", to: "package.json" },

        ]),
    ],
    // we need this due to problems with es6-shim
    node: {
        global: true,
        progress: false,
        crypto: "empty",
        module: false,
        clearImmediate: false,
        setImmediate: false,
    },

    target: "electron-renderer",
};

module.exports = config;
