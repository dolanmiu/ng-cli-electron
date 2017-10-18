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
    describe: "Defines the build environment.",
}).option("extract-css", {
    alias: "ec",
    describe: "Extract css from global styles onto css files instead of js ones.",
}).option("force", {
    describe: "Overwrite any webpack.config.js and npm scripts already existing.",
}).option("i18n-file", {
    describe: "Localization file to use for i18n.",
}).option("i18n-format", {
    describe: "Format of the localization file specified with --i18n-file.",
}).option("locale", {
    describe: "Locale to use for i18n.",
}).option("missing-translation", {
    describe: "How to handle missing translations for i18n.",
}).option("output-hashing", {
    alias: "oh",
    describe: "Define the output filename cache-busting hashing mode. Possible values: none, all, media, bundles.",
}).option("progress", {
    alias: "pr",
    describe: "Log progress to the console while building.",
}).option("sourcemap", {
    alias: "sm",
    describe: "Log progress to the console while building.",
}).option("target", {
    alias: "t",
    describe: "Defines the build target.",
}).option("vendor-chunk", {
    alias: "vc",
    describe: "Use a separate bundle containing only vendor libraries.",
}).option("common-chunk", {
    alias: "cc",
    describe: "Use a separate bundle containing code used across multiple bundles.",
}).option("verbose", {
    alias: "v",
    describe: "Adds more details to output logging.",
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
