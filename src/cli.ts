#! /usr/bin/env node
import * as shell from "shelljs";

import { AngularCLI } from "./angular-cli";
import { SetUp } from "./setup";

const setup = new SetUp();
setup.setup();

const angularCli = new AngularCLI();
angularCli.eject();

setup.addElectronToWebpack();

angularCli.build();
