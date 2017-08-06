#! /usr/bin/env node
import * as shell from "shelljs";

import { AngularCLI } from "./angular-cli";
import { SetUp } from "./setup";

const PACKAGE_NAME = "ng-cli-electron";
const WORKING_DIR = `./node_modules/${PACKAGE_NAME}/dist/working-dir`;

const setup = new SetUp(WORKING_DIR);
const angularCli = new AngularCLI(WORKING_DIR);

setup.setup();

angularCli.eject();

setup.addElectronToWebpack();

angularCli.build();

setup.addMainFileToDist();
setup.addElectronBaseHref();
setup.exportDist();
