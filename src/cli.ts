#! /usr/bin/env node
import * as shell from "shelljs";

import { AngularCLI } from "./angular-cli";
import { SetUp } from "./setup";

const PACKAGE_NAME = "ng-cli-electron";
const WORKING_DIR = `./node_modules/${PACKAGE_NAME}/dist/working-dir`;

const setup = new SetUp(WORKING_DIR);
const angularCli = new AngularCLI(WORKING_DIR);

console.log("Clearing working directory...");
setup.clearWorkingDirectory();
console.log("Copying files...");
setup.setup();
// console.log("Installing...");
// angularCli.install();
console.log("Ejecting...");
angularCli.eject();
console.log("Add webpack to electron...");
setup.addElectronToWebpack();
// console.log("Building...");
// angularCli.build();
console.log("Adding election main file...");
setup.addMainFileToDist();
// console.log("Changing index base href...");
// setup.addElectronBaseHref();
// console.log("Clearing out old dist folder...");
// // Perhaps delete old dist
// console.log("Copying in new dist folder...");
// setup.exportDist();
