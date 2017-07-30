#! /usr/bin/env node
import * as shell from "shelljs";
import * as webpack from "webpack";
import * as config from "./webpack.renderer";

// webpack(config).run((err, stats) => {
//     console.log(stats);
// });
shell.exec("webpack --config node_modules/ng-cli-electron/dist/webpack.renderer.js --progress --profile --bail --display-error-details");
