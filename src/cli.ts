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
            // BuildTask.buildMain();
            return;
        }
        console.log(argv);
        // BuildTask.build();
    },
}).option("main", {
    alias: "m",
    default: false,
    describe: "Build the 'main' part of Electron only",
}).option("aot", {
    default: false,
    describe: "Build using Ahead of Time compilation.",
}).option("app", {
    alias: "a",
    describe: "Specifies app name to use.",
}).option("deploy-url", {
    alias: "d",
    describe: "Specifies app name to use.",
}).argv;

// tslint:disable-next-line:no-any
function d(argv: any): string[] {
    const output: string[] = [];

    _.map(argv, (x: IAngularCliArguments) => {
        return {
            "aot": x.aot,
            "app": x.app,
            "deploy-url": x["deploy-url"],
            "environment": x.environment,
            "extract-css": x["extract-css"],
            "force": x.force,
            "i18n-file": x["i18n-file"],
            "i18n-format": x["i18n-format"],
            "locale": x.locale,
            "missing-translation": x["missing-translation"],
            "output-hashing": x["output-hashing"],
            "progress": x.progress,
            "sourcemap": x.sourcemap,
            "target": x.target,
            "vendor-chunk": x["vendor-chunk"],
            "common-chunk": x["common-chunk"],
            "verbose": x.verbose,
        };
    });

    return output;
}
