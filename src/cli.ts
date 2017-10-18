#! /usr/bin/env node
import * as _ from "lodash";
import * as shell from "shelljs";
import * as Yargs from "yargs";

import { BuildTask } from "./tasks/build";
import { ServeTask } from "./tasks/serve";

interface IAngularCliArguments {
    aot?: boolean;
    app?: boolean;
    "deploy-url"?: string;
    environment?: string;
    "extract-css"?: boolean;
    force?: boolean;
    "i18n-file"?: string;
    "i18n-format"?: string;
    locale?: string;
    "missing-translation"?: string;
    "output-hashing"?: string;
    progress?: boolean;
    sourcemap?: boolean;
    target?: string;
    "vendor-chunk"?: boolean;
    "common-chunk"?: boolean;
    verbose?: boolean;
}

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
        const ngCliArgs = processArgs(argv);
        BuildTask.build(ngCliArgs);
    },
}).option("main", {
    alias: "m",
    default: false,
    describe: "Build the 'main' part of Electron only",
}).option("aot", {
    describe: "Build using Ahead of Time compilation.",
}).option("app", {
    alias: "a",
    describe: "Specifies app name to use.",
}).option("deploy-url", {
    alias: "d",
    describe: "Specifies app name to use.",
}).option("environment", {
    alias: "e",
    describe: "",
}).argv;

function processArgs(argv: {}): string[] {
    const obj: IAngularCliArguments = _.pick(argv, ["aot", "app", "deploy-url", "environment", "extract-css", "force", "i18n-file", "i18n-format", "locale", "missing-translation", "output-hashing", "progress", "sourcemap", "target", "vendor-chunk", "common-chunk", "verbose"]);
    const cleanseUnusedFlags = _.omitBy(obj, (o) => o === undefined);

    const arr = _.values(_.mapValues(cleanseUnusedFlags, (value, key) => {
        return `${key}=${value}`;
    }));

    const cleanedArray = _.without(arr, undefined);

    const dashedArray = _.map(cleanedArray, (o) => `--${o}`);

    return dashedArray;
}
