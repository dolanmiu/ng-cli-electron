#!/usr/bin/env node
import * as _ from "lodash";
import * as shell from "shelljs";
import * as Yargs from "yargs";

import { buildCommand } from "./commands/build";
import { serveCommand } from "./commands/serve";

const cli: Yargs.CommandBuilder = Yargs
.command(serveCommand)
.command(buildCommand)
.option("main", {
    alias: "m",
    default: false,
    describe: "Build the 'main' part of Electron only",
}).option("renderer", {
    alias: "r",
    default: false,
    describe: "Build the 'renderer' aka Angular part of Electron only",
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
