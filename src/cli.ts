#! /usr/bin/env node
import * as shell from "shelljs";

import { AngularCLI } from "./angular-cli";
import { SetUp } from "./setup";

const setup = new SetUp();
setup.setup();

const ejector = new AngularCLI();
ejector.eject();

setup.addElectronToWebpack();
