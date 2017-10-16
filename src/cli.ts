#! /usr/bin/env node
import * as shell from "shelljs";
import * as Yargs from "yargs";

import { BuildTask } from "./tasks/build";
import { ServeTask } from "./tasks/serve";

const serveCommand = Yargs.command({
    command: "serve",
    describe: "Serve the app in Electron window",
    handler: (argv) => {
        ServeTask.serve();
    },
}).command({
    command: "build",
    describe: "Build the app",
    handler: (argv) => {
        if (argv.main === true) {
            BuildTask.buildMain();
            return;
        }
        BuildTask.build();
    },
}).option("main", {
    alias: "m",
    default: false,
    describe: "Build the 'main' part of Electron only",
}).argv;
