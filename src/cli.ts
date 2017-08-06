#! /usr/bin/env node
import * as shell from "shelljs";

import { AngularCLI } from "./angular-cli";
import { SetUp } from "./setup";

const PACKAGE_NAME = "ng-cli-electron";
const WORKING_DIR = `./node_modules/${PACKAGE_NAME}/dist/working-dir`;

const setup = new SetUp(WORKING_DIR);
setup.setup();

const angularCli = new AngularCLI(WORKING_DIR);
angularCli.eject();

setup.addElectronToWebpack();

angularCli.build();

// Copy main.js into folder
// Change index.html basehref to .
// Copy build dir to dist
