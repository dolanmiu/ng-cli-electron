#! /usr/bin/env node
import * as shell from "shelljs";
import * as webpack from "webpack";

import { Ejector } from "./ejector";
import { SetUp } from "./setup";
import * as config from "./webpack.renderer";

// webpack(config).run((err, stats) => {
//     console.log(stats);
// // });
// shell.exec("webpack --config node_modules/ng-cli-electron/dist/webpack.renderer.js --progress --profile --bail --display-error-details");
const setup = new SetUp();
setup.setup();

const ejector = new Ejector();
ejector.eject();

setup.addElectronToWebpack();
